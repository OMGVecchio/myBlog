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
          width: 200,
          height: 200
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

  play = () => {
    this.localVideoRef.current.play()
  }

  stop = () => {
    this.localVideoRef.current.pause()
  }

  login = () => {
    window.socket = this.socket
    this.socket.emit('userLogin', this.state.loginName)
  }

  changeLoginName = (e) => {
    this.setState({
      loginName: e.target.value
    })
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
    this.localPeer = new RTCPeerConnection()
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
    stream.getTracks().forEach((track) => this.localPeer.addTransceiver(track, { streams: [stream] }))
  }

  state = {
    loginName: '',
    loginId: '',
    userList: []
  }

  render() {
    return (
      <Layout pageTitle='视频' title='视频'>
        <div style={{ display: 'flex' }}>
          <Input
            placeholder='用户名'
            value={this.state.loginName}
            disabled={!!this.state.loginId}
            onChange={this.changeLoginName}
          />
          <Button onClick={this.login} disabled={!!this.state.loginId}>
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
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <video
                ref={(ref) => {
                  this.localVideoRef.current = ref
                }}
                width='200'
                height='200'
                style={{ border: '1px solid skyblue' }}
                autoPlay
                muted
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Button onClick={this.play}>播放</Button>
                <Button onClick={this.stop}>暂停</Button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <video
                ref={(ref) => {
                  this.remoteVideoRef.current = ref
                }}
                width='200'
                height='200'
                style={{ border: '1px solid skyblue' }}
                autoPlay
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Button>发起</Button>
                <Button>中断</Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default MediaPage
