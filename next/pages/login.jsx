import { Fragment, useState } from 'react'
import { Button, Icon, message } from 'antd'

import Head from 'next/head'
import Router from 'next/router'

import BInput from '~/base/input'
import BValidator from '~/base/validator'

import { isServer } from '_'
import xhr from '_/fetch'
import { setToken as setGlobalToken } from '_/token'

import '@/styles/pages/login.less'

const LoginModal = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [challenge, setChallenge] = useState('')
  const [token, setToken] = useState('')
  const loginSubmit = async (e) => {
    e.preventDefault()
    message.destroy()
    if (!username) {
      message.warn('请填写用户名')
      return
    }
    if (!password) {
      message.warn('请填写密码')
      return
    }
    // if (!challenge || !token) {
    //   message.warn('请进行图片验证')
    //   return
    // }
    const param = {
      username,
      password,
      challenge,
      token
    }
    const data = await xhr.post('/api/login', { ...param })
    if (data.success) {
      setGlobalToken(data.data)
      message.success('管理员登录成功')
      Router.push('/')
    } else {
      message.destroy()
      message.error(data.data)
    }
  }
  const validatorSuccess = ({ challenge: challengeVal, token: tokenVal }) => {
    setChallenge(challengeVal)
    setToken(tokenVal)
  }
  // 浏览器端渲染时，如果 query 中带 token，先检测 token 是否合法
  // 合法时说明是第三方登录而来，直接进入首页；否则给予提示
  const checkToken = async () => {
    const { query } = Router
    const { token: tokenOther } = query
    if (tokenOther) {
      const data = await xhr.post('/api/token/check', { token: tokenOther })
      if (data.success) {
        setGlobalToken(tokenOther)
        message.success('登录成功')
        Router.push('/')
      } else {
        message.warn(data.data)
      }
    }
  }
  if (!isServer) {
    checkToken()
  }
  return (
    <Fragment>
      <Head>
        <title>
          登录
        </title>
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
              value={username}
              onChange={setUsername}
              block
            />
            <BInput
              type="password"
              className="input-body"
              placeholder="密码"
              value={password}
              onChange={setPassword}
              block
            />
            <BValidator
              className="input-body"
              success={validatorSuccess}
            />
            <Button
              onClick={loginSubmit}
              type="primary"
              size="large"
              className="submit-btn"
            >
              登录
            </Button>
            <p className="login-ways">
              <a href="/api/login/github">
                <Icon title="gayhub" type="github" className="gayhub" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LoginModal
