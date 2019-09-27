import { Fragment } from 'react'
import { Provider } from 'mobx-react'
import { message } from 'antd'

import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'

import store from '#'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      ctx.store = store
      pageProps = await Component.getInitialProps({ ctx })
      pageProps.initialStoreState = ctx.store
    }
    return { pageProps }
  }
  static getDerivedStateFromProps(props, state) {
    state.store.hydrate(props.pageProps.initialStoreState)
    return state
  }
  constructor(props) {
    super(props)
    this.gtag = null
    // 后续可在转场时添加特效
    const { commonStore } = this.state.store
    Router.onRouteChangeStart = () => {
      commonStore.showProgress()
    }
    Router.onRouteChangeComplete = (path) => {
      commonStore.hideProgress()
      this.setGoogleAnalytics(path)
    }
  }
  state = { store }
  initFirebase = () => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCgG2nGu7svbWAa8mwSzRoHJbDiUWVI-3E',
      authDomain: 'myblog-23707.firebaseapp.com',
      databaseURL: 'https://myblog-23707.firebaseio.com',
      projectId: 'myblog-23707',
      storageBucket: '',
      messagingSenderId: '391903846777',
      appId: '1:391903846777:web:e481f8b448a51f22'
    }
    firebase.initializeApp(firebaseConfig)
  }
  initGoogleAnalytics = () => {
    // analytics.js 迁移至 gtag.js
    const dataLayer = window.dataLayer || []
    // TODO：为啥改 rest 就不行了
    this.gtag = function () {
      dataLayer.push(arguments)
    }
    this.gtag('js', new Date())
  }
  setGoogleAnalytics = (path) => {
    const param = [
      'config',
      'UA-148650768-1'
    ]
    if (path) {
      param[2] = { page_path: path }
    }
    this.gtag(...param)
  }
  componentDidMount() {
    // 检测是否安装了 adblock 之类的广告屏蔽插件
    if (typeof adblockWorkWell === 'undefined') {
      message.warn('大哥大姐，麻烦关个 adBlock ?')
    }
    this.initFirebase()
    this.initGoogleAnalytics()
    this.setGoogleAnalytics()
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Fragment>
        <Head>
          <title>页面加载中~~~</title>
        </Head>
        <Provider {...this.state.store}>
          <Component {...pageProps} />
        </Provider>
      </Fragment>
    )
  }
}

export default MyApp
