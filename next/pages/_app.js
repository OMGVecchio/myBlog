import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Router from 'next/router'

import createStore from 'store'

import { getToken } from 'utils/token'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }
  componentDidMount() {
    // TOOD 路由拦截有问题
    // Router.onBeforeHistoryChange = (to) => {
    //   const protectedPathes = ['/compose']
    //   if (protectedPathes.indexOf(to) !== -1) {
    //     Router.push('/login')
    //   }
    // }
    Router.onRouteChangeStart = (to) => {
      const protectedPathes = ['/compose']
      if (protectedPathes.indexOf(to) !== -1) {
        if (!getToken()) {
          Router.push('/login')
        }
      }
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
