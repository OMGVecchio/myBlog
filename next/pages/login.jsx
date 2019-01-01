import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'

import Head from 'next/head'
import Router from 'next/router'

import BInput from '~/base/input'
import BValidator from '~/base/validator'

import { isServer } from '_'
import xhr from '_/fetch'
import { setToken } from '_/token'

import style from '@/styles/pages/login'

const LoginModal = () => {
  const getUsername = (username) => {
    this.username = username
  }
  const getPassword = (password) => {
    this.password = password
  }
  const loginSubmit = async (e) => {
    e.preventDefault()
    const {
      username,
      password,
      challenge,
      token
    } = this
    if (!username) {
      message.warn('请填写用户名')
      return
    }
    if (!password) {
      message.warn('请填写密码')
      return
    }
    if (!challenge || !token) {
      message.warn('请进行图片验证')
      return
    }
    const param = {
      username,
      password,
      challenge,
      token
    }
    const data = await xhr.post('/api/login', { ...param })
    if (data.code === 201) {
      setToken(data.data)
      message.success('管理员登录成功')
      Router.push('/')
    } else {
      message.error(data.data)
    }
  }
  // 浏览器端渲染时，如果 query 中带 token，先检测 token 是否合法
  // 合法时说明是第三方登录而来，直接进入首页；否则给予提示
  const checkToken = async () => {
    const { query } = Router
    const { token = '' } = query
    if (token) {
      const data = await xhr.post('/api/token/check', { token })
      if (data.success) {
        setToken(token)
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
      <div className={style['login-page']}>
        <div className={style['layout-wrap']}>
          <img
            className={`${style['welcome-img']} ${style['xm-img']}`}
            src="/static/imgs/xm/xm-1.png"
            title="主页"
            alt="小埋"
            role="button"
            tabIndex={-1}
            onClick={() => Router.push('/index')}
          />
          <img
            className={`${style['welcome-img']} ${style['kn-img']}`}
            src="/static/imgs/kn/kn-1.png"
            title="返回"
            alt="康娜"
            role="button"
            tabIndex={-2}
            onClick={() => Router.back()}
          />
          <div className={style['login-wrap']}>
            <BInput
              type="text"
              className={style['input-body']}
              placeholder="用户名"
              onChange={getUsername}
              block
            />
            <BInput
              type="password"
              className={style['input-body']}
              placeholder="密码"
              onChange={getPassword}
              block
            />
            <BValidator
              className={style['input-body']}
              success={({ challenge, token }) => {
                this.challenge = challenge
                this.token = token
              }}
            />
            <Button
              onClick={loginSubmit}
              type="primary"
              size="large"
              className={style['submit-btn']}
            >
              登录
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default connect(null)(LoginModal)
