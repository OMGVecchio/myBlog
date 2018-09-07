import { Fragment } from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { Button, message } from 'antd'

import xhr from 'utils/fetch'
import { setToken } from 'utils/token'

import BInput from 'components/base/input'

import style from 'static/styles/pages/login.less'

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
    xhr.post('/api/login', { ...param }).then((data) => {
      if (data.code === 201) {
        setToken(data.data)
        message.success('管理员登录成功')
        Router.push('/')
      } else {
        message.error(data.data)
      }
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
        <div className="layout-wrap">
          <img className="welcome-img xm-img" src="/static/imgs/xm/xm-1.png" alt="小埋-welcome" />
          <img className="welcome-img kn-img" src="/static/imgs/kn/kn-1.png" alt="康娜-welcome" />
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
            <BInput
              type="text"
              className="input-body"
              placeholder="后面加个验证码试试"
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
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LoginModal
