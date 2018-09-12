import React from 'react'
import { Provider } from 'react-redux'
import { message } from 'antd'

import App, { Container } from 'next/app'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '#'
import { showProgress, hideProgress } from '#/action/common'

import { getToken } from '_/token'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    const { store } = ctx
    const { dispatch } = store

    Router.onRouteChangeStart = (to) => {
      dispatch(showProgress())
      const protectedPathes = ['/compose', '/manage']
      if (protectedPathes.indexOf(to) !== -1) {
        if (!getToken()) {
          Router.replace('/login')
        }
      }
    }

    Router.onRouteChangeComplete = () => {
      dispatch(hideProgress())
    }

    return { pageProps }
  }
  componentDidMount() {
    // 在这里可以获取到 onRouteChangeStart 获取不到的服务端渲染的第一个路由？

    // 检测是否安装了 adblock 之类的广告屏蔽插件
    if (typeof adblockWorkWell === 'undefined') {
      message.warn('大哥大姐，麻烦关个 adBlock ?')
    }
  }
  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp))
