import { PureComponent } from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

import Head from 'next/head'
import Router from 'next/router'

import Header from '~/common/header'
import Footer from '~/common/footer'
import Menu from '~/common/aside'
// import Pet from '~/common/pet'
import BackTop from '~/base/backtop'
import LinearProgress from '~/base/linearprogress'

import { isServer } from '_'
import { getToken } from '_/token'

import layoutStyle from '@/styles/components/layout/index.less'

const SCROLL_TAG = 165;

/**
 * 本来是 stateless 组件的
 * 但是我想在 body 上绑 scroll 事件，需要在销毁时解除绑定的事件
 * 所以用到了组件的生命周期，就改成 PureComponent
 */
@inject('commonStore')
@observer
class Layout extends PureComponent {
  static defaultProps = {
    pageTitle: 'Vecchio\'s Blog',
    title: '',
    className: '',
    showTitle: true,
    extraHead: null
  }
  constructor(props) {
    super(props)
    // 在跳转一个新页面前，检测该页面权限
    // 本来想在 _app.js 的 getInitialProps 中执行的，但那时候获取的 Router.pathname 好像是跳转前未重新实例化的路由
    if (typeof window !== 'undefined') {
      const protectedPathes = ['/compose', '/manage']
      if (protectedPathes.indexOf(Router.pathname) !== -1) {
        if (!getToken()) {
          Router.replace('/login')
        }
      }
    }
  }
  componentDidMount() {
    // 记录滚动的初始状态
    const { commonStore } = this.props
    const {
      showHeaderShadow,
      hideHeaderShadow,
      switchMenuItem
    } = commonStore
    if (this.isLongScroll()) {
      showHeaderShadow()
    } else {
      hideHeaderShadow()
    }
    // 修改 menu 选中的 pathname
    // 要改成同步时就渲染好的话，感觉提出一个 hoc 在 node 端获取 pathname 比较好
    switchMenuItem(this.fetchPathname())
    // 绑定滚动事件
    window.addEventListener('scroll', this.scrollHandler)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
  }
  scrollHandler = (e) => {
    // TODO 滑动需要做优化
    const { commonStore } = this.props
    const {
      isLongScroll,
      showHeaderShadow,
      hideHeaderShadow
    } = commonStore
    const { scrollTop } = e.target.scrollingElement
    if (scrollTop > SCROLL_TAG) {
      if (!isLongScroll) {
        showHeaderShadow()
      }
    } else if (isLongScroll) {
      hideHeaderShadow()
    }
  }
  fetchPathname = () => {
    if (!isServer) {
      const { pathname = '' } = Router
      return pathname
    }
    return ''
  }
  fetchScrollTop = () => {
    if (!isServer) {
      const { scrollTop } = document.documentElement
      return scrollTop
    }
    return 0
  }
  isLongScroll = () => {
    const scrollTop = this.fetchScrollTop()
    if (scrollTop > SCROLL_TAG) {
      return true
    }
    return false
  }
  render() {
    const {
      children,
      pageTitle,
      title,
      className,
      showTitle,
      extraHead,
      commonStore
    } = this.props
    const {
      asideIsOpen,
      isLongScroll,
      globalProgress
    } = commonStore
    return (
      <div className="global-wrap">
        <Head>
          <title>{pageTitle}</title>
          <style dangerouslySetInnerHTML={{ __html: layoutStyle }} />
        </Head>
        <LinearProgress visible={globalProgress} className="global-router-progress" />
        <Menu />
        {
          // <Pet />
        }
        <div className={classNames('main-wrap', { 'menu-has-close': !asideIsOpen })}>
          <Header title={title} isLongScroll={isLongScroll} />
          <BackTop show={isLongScroll} />
          <div className="main-content">
            <div className="content-header">
              <h4 className="title">
                { showTitle && title }
              </h4>
              { extraHead }
            </div>
            <div className="content-body-wrap">
              <div className="content-body-main">
                <div className={classNames({ [className]: !!className })}>
                  {children}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
