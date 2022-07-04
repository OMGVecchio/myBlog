import { PureComponent, createRef } from 'react'
import { Input, Button, message } from 'antd'
import SocketIO from 'socket.io-client'

import Layout from '~/layout'

class MediaPage extends PureComponent {
  socket = null
  localVideoRef = createRef()
  remoteVideoRef = createRef()
  localPeer = null

  componentDidMount() {
    this.initSocket()
    // this.initUser()
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close()
    }
  }

  initSocket = () => {
    this.socket = new SocketIO(`${window.location.protocol === 'http:' ? 'ws' : 'wss'}://${window.location.host}`)
    this.socket.on('sysTip', (res) => {
      message[res.type](res.msg)
    })
    this.socket.on('refreshFriendList', (userList) => {
      this.setState({
        userList
      })
    })
    this.socket.on('userLogin', (loginId) => {
      if (loginId) {
        this.setState({
          loginId
        })
      }
    })
    this.socket.on('getOffser', async (data) => {
      if (!this.localPeer) {
        this.createPeerConnection(data.from)
      }

      const desc = new RTCSessionDescription(data.sdp)
      if (this.localPeer.signalingState !== 'stable') {
        console.debug('signalingState is not stable')
        await Promise.all([
          this.localPeer.setLocalDescription({ type: 'rollback' }),
          this.localPeer.setRemoteDescription(desc)
        ])
        return
      }
      await this.localPeer.setRemoteDescription(desc)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          aspectRatio: 1
          // width: 500,
          // height: 500
        }
      })
      this.localVideoRef.current.srcObject = stream
      stream.getTracks().forEach((track) => {
        this.localPeer.addTransceiver(track, { streams: [stream] })
      })
      await this.localPeer.setLocalDescription(await this.localPeer.createAnswer())
      this.socket.emit('sendAnswer', {
        from: this.state.loginId,
        to: data.from,
        sdp: this.localPeer.localDescription
      })

      this.initDataChannel()
    })
    this.socket.on('getAnswer', async (data) => {
      const desc = new RTCSessionDescription(data.sdp)
      await this.localPeer.setRemoteDescription(desc)
    })
    this.socket.on('addICECandidate', async (data) => {
      const candidate = new RTCIceCandidate(data.candidate)
      await this.localPeer.addIceCandidate(candidate)
    })
  }

  login = (loginName) => {
    this.socket.emit('userLogin', loginName)
  }

  initUser = () => {
    const loginName = localStorage.getItem('loginName')
    if (!loginName) {
      return
    }
    this.login(loginName)
  }

  changeLoginName = (e) => {
    this.setState({
      loginName: e.target.value
    })
    // localStorage.setItem('loginName', e.target.value)
  }

  close = () => {
    console.debug('关闭通话')

    if (!this.localPeer) {
      return
    }

    this.localPeer.ontrack = null
    this.localPeer.onnicecandidate = null
    this.localPeer.oniceconnectionstatechange = null
    this.localPeer.onsignalingstatechange = null
    this.localPeer.onicegatheringstatechange = null
    this.localPeer.onnotificationneeded = null

    this.localPeer.getTransceivers().forEach((transceiver) => {
      transceiver.stop()
    })

    if (this.localVideoRef.current.srcObject) {
      this.localVideoRef.current.pause()
      this.localVideoRef.current.srcObject.getTracks().forEach((track) => {
        track.stop()
      })
    }

    this.localVideoRef.current.close()
    this.localVideoRef.current = null
  }

  createPeerConnection = async (calleeId) => {
    if (this.localPeer) {
      return
    }
    this.localPeer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'turn:47.108.149.103:3478',
          username: 'admin',
          credential: 'cdsf@119'
        }
      ]
    })
    this.localPeer.onicecandidate = (event) => {
      console.debug('onicecandidate')
      this.handleICECandidateEvent(calleeId, event)
    }
    this.localPeer.oniceconnectionstatechange = () => {
      console.debug('oniceconnectionstatechange')
      switch (this.localPeer.iceConnectionState) {
        case 'closed':
        case 'failed':
        case 'disconnected':
          this.closeVideoCall()
          break
        default:
          console.log('oniceconnectionstatechange', this.localPeer.iceConnectionState)
      }
    }
    this.localPeer.onicegatheringstatechange = () => console.debug('onicegatheringstatechange')
    this.localPeer.onsignalingstatechange = () => {
      console.debug('onsignalingstatechange')
      switch (this.localPeer.signalingState) {
        case 'closed':
          this.close()
          break
        default:
          console.log('onsignalingstatechange', this.localPeer.signalingState)
      }
    }
    this.localPeer.onnegotiationneeded = () => {
      console.debug('onnegotiationneeded')
      this.handleNegotiationNeededEvent(calleeId)
    }
    this.localPeer.ontrack = (event) => {
      console.debug('ontrack')
      ;[this.remoteVideoRef.current.srcObject] = event.streams
    }
  }

  handleICECandidateEvent = async (calleeId, event) => {
    if (!event.candidate) {
      return
    }
    this.socket.emit('addICECandidate', {
      to: calleeId,
      candidate: event.candidate
    })
  }

  handleNegotiationNeededEvent = async (calleeId) => {
    if (!this.offser) {
      this.offser = await this.localPeer.createOffer()
    }
    if (this.localPeer.signalingState !== 'stable') {
      return
    }
    await this.localPeer.setLocalDescription(this.offser)
    this.socket.emit('sendOffser', {
      from: this.state.loginId,
      to: calleeId,
      sdp: this.localPeer.localDescription
    })
  }

  call = async (calleeId) => {
    if (this.localPeer) {
      message.warning('已经在通话中')
      return
    }
    await this.createPeerConnection(calleeId)
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 200,
        height: 200
      }
    })
    this.localVideoRef.current.srcObject = stream
    stream.getTracks().forEach((track) => {
      this.localPeer.addTransceiver(track, { streams: [stream] })
    })

    this.initDataChannel()
  }

  sendChat = () => {
    if (!this.remoteChannel) {
      message.warning('通信还未连接')
      return
    }
    const chatData = {
      from: this.state.loginName,
      text: this.state.chatText,
      time: Date.now()
    }
    this.localChannel.send(JSON.stringify(chatData))
    this.setState({
      chatList: this.state.chatList.concat(chatData),
      chatText: ''
    })
  }

  initDataChannel = () => {
    this.localChannel = this.localPeer.createDataChannel('localChannel')
    this.localChannel.onopen = () => {
      console.debug('dataChannel open')
    }
    this.localChannel.onclose = () => {
      console.debug('dataChannel open')
    }
    this.localChannel.onmessage = (event) => {
      console.debug('onmessage')
      console.log(event.data)
    }
    this.localPeer.ondatachannel = (event) => {
      this.remoteChannel = event.channel
      this.remoteChannel.onmessage = (e) => {
        console.debug('remote onmessage')
        console.log(e.data)
        this.setState({
          chatList: this.state.chatList.concat(JSON.parse(e.data))
        })
      }
    }
  }

  state = {
    loginName: '',
    loginId: '',
    userList: [],
    chatText: '',
    chatList: []
  }

  render() {
    return (
      <Layout pageTitle='视频' title='视频'>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <Input
            placeholder='用户名'
            value={this.state.loginName}
            disabled={!!this.state.loginId}
            onChange={this.changeLoginName}
          />
          <Button onClick={() => this.login(this.state.loginName)} disabled={!!this.state.loginId}>
            登录
          </Button>
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: 200,
              height: 500,
              overflowY: 'auto',
              border: '1px solid skyblue',
              flexShrink: 0
            }}
          >
            {this.state.userList.flatMap((user) =>
              user ? (
                <div
                  key={user.loginId}
                  onClick={() => this.state.loginId !== user.loginId && this.call(user.loginId)}
                  style={{
                    padding: 5,
                    ...(this.state.loginId === user.loginId ? { cursor: 'not-allowed' } : null)
                  }}
                >
                  {user.loginName}
                </div>
              ) : null
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', height: 500, width: 400 }}>
            <div style={{ overflowY: 'auto', height: '100%', border: '1px solid skyblue' }}>
              {this.state.chatList.map((chat) => (
                <p key={chat.time}>
                  {chat.from}({new Date(chat.time).toLocaleString()})：{chat.text}
                </p>
              ))}
            </div>
            <Input.TextArea
              placeholder='请输入发送的文字'
              value={this.state.chatText}
              onChange={(e) => this.setState({ chatText: e.target.value })}
            />
            <Button onClick={this.sendChat}>发送</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <video
              ref={(ref) => {
                this.remoteVideoRef.current = ref
              }}
              width='500'
              height='500'
              style={{ border: '1px solid skyblue' }}
              autoPlay
            />
            <video
              ref={(ref) => {
                this.localVideoRef.current = ref
              }}
              width='100'
              height='100'
              style={{ position: 'absolute', inset: '10px 0 0 10px', border: '1px solid skyblue' }}
              autoPlay
              muted
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default MediaPage
