import { Fragment } from 'react'
// import { Fragment, PureComponent } from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { Button, message } from 'antd'
// import { Form, Icon, Input, Button, message } from 'antd'

import xhr from 'utils/fetch'
import { setToken } from 'utils/token'

import BInput from 'components/base/input'

import style from 'static/styles/pages/login.less'

// const FormItem = Form.Item

// class LoginForm extends PureComponent {
//   loginSubmit = (e) => {
//     e.preventDefault()
//     this.props.form.validateFields((err, values) => {
//       xhr.post('/api/login', { ...values }).then((res) => {
//         res.json().then((data) => {
//           if (data.code === 201) {
//             setToken(data.data)
//           } else {
//             message.error(data.data)
//           }
//         })
//       })
//     })
//   }
//   render() {
//     const { getFieldDecorator } = this.props.form
//     const UserInput = (
//       <Input
//         prefix={
//           <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
//           }
//         placeholder="Username"
//       />
//     )
//     const pwInput = (
//       <Input
//         prefix={
//           <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
//         }
//         type="password"
//         placeholder="Password"
//       />
//     )
//     return (
//       <Form onSubmit={this.loginSubmit}>
//         <FormItem>
//           {getFieldDecorator('username')(UserInput)}
//         </FormItem>
//         <FormItem>
//           {getFieldDecorator('password')(pwInput)}
//         </FormItem>
//         <Button
//           type="primary"
//           htmlType="submit"
//           size="large"
//           className="submit-btn"
//         >
//           登录
//         </Button>
//       </Form>
//     )
//   }
// }

// const WrappedLoginForm = Form.create()(LoginForm)

const LoginModal = () => {
  const getUsername = (username) => {
    this.username = username
  }
  const getPassword = (password) => {
    this.password = password
  }
  const loginSubmit = (e) => {
    e.preventDefault()
    const param = {
      username: this.username,
      password: this.password
    }
    xhr.post('/api/login', { ...param }).then((res) => {
      res.json().then((data) => {
        if (data.code === 201) {
          setToken(data.data)
          Router.push('/')
        } else {
          message.error(data.data)
        }
      })
    })
  }
  return (
    <Fragment>
      <Head>
        <title>
          登录
        </title>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </Head>
      <div className="login-page">
        <div className="login-wrap">
          <BInput
            type="text"
            className="input-body"
            placeholder="用户名"
            onChange={getUsername}
            block
          />
          <BInput
            type="password"
            className="input-body"
            placeholder="密码"
            onChange={getPassword}
            block
          />
          <Button
            onClick={loginSubmit}
            type="primary"
            size="large"
            className="submit-btn"
          >
            登录
          </Button>
          {/* <WrappedLoginForm /> */}
        </div>
      </div>
    </Fragment>
  )
}

export default LoginModal
