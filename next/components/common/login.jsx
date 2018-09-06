import { PureComponent } from 'react'

import { Modal, Form, Icon, Input, message } from 'antd'

import xhr from 'utils/fetch'
import { setToken } from 'utils/token'

const FormItem = Form.Item

// 本来不想单独提出一个登录页的，暂时没用了
class LoginModal extends PureComponent {
  state = {
    username: '',
    password: '',
    showLogin: false
  }
  componentDidMount() {
    if (!window.showLogin) {
      window.showLogin = () => {
        this.setState({ showLogin: true })
      }
    }
  }
  getUsername = (e) => {
    const { value = '' } = e.target
    this.setState({ username: value })
  }
  getPassword = (e) => {
    const { value = '' } = e.target
    this.setState({ password: value })
  }
  loginSubmit = () => {
    const { username, password } = this.state
    xhr.post('/api/login', {
      username,
      password
    }).then((data) => {
      if (data.code === 201) {
        setToken(data.data)
        this.setState({ showLogin: false })
      } else {
        message.error(data.data)
      }
    })
  }
  loginCancel = () => {
    this.setState({
      username: '',
      password: '',
      showLogin: false
    })
  }
  render() {
    return (
      <Modal
        title="登录"
        visible={this.state.showLogin}
        onOk={this.loginSubmit}
        onCancel={this.loginCancel}
      >
        <Form>
          <FormItem>
            <Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Username"
              onChange={this.getUsername}
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={
                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="password"
              placeholder="Password"
              onChange={this.getPassword}
            />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default LoginModal
