import { Fragment } from 'react'
import { Button, message } from 'antd'

import Head from 'next/head'
import Router from 'next/router'

import BInput from '~/base/input'
import BValidator from '~/base/validator'

import xhr from '_/fetch'
import { setToken } from '_/token'

import style from '@/styles/pages/login.less'

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
          <img
            className="welcome-img xm-img"
            src="/static/imgs/xm/xm-1.png"
            title="主页"
            alt="小埋"
            role="button"
            tabIndex={-1}
            onClick={() => Router.push('/index')}
          />
          <img
            className="welcome-img kn-img"
            src="/static/imgs/kn/kn-1.png"
            title="返回"
            alt="康娜"
            role="button"
            tabIndex={-2}
            onClick={() => Router.back()}
          />
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
            <BValidator
              className="input-body"
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
