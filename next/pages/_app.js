import { Provider } from 'react-redux'
import { message } from 'antd'

import App, { Container } from 'next/app'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '#'
import { showProgress, hideProgress } from '#/action/common'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }
    return { pageProps }
  }
  constructor(props) {
    super(props)
    const { store } = props
    const { dispatch } = store
    this.gtag = null
    // 后续可在转场时添加特效
    Router.onRouteChangeStart = () => {
      dispatch(showProgress())
    }
    Router.onRouteChangeComplete = (path) => {
      dispatch(hideProgress())
      this.setGoogleAnalytics(path)
    }
  }
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
    const dataLayer = window.dataLayer || []
    this.gtag = (...rest) => dataLayer.push(...rest)
    this.gtag('js', new Date())
  }
  setGoogleAnalytics = (path) => {
    const param = [
      'config',
      'UA-148650768-1'
    ]
    if (path) {
      param.page_path = path
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
