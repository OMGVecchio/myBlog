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
    // 后续可在转场时添加特效
    Router.onRouteChangeStart = () => {
      dispatch(showProgress())
    }
    Router.onRouteChangeComplete = () => {
      dispatch(hideProgress())
    }
  }
  componentDidMount() {
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
