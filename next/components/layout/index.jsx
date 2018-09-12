import { PureComponent } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Head from 'next/head'
import Router from 'next/router'

import types from '#/action/common'

import Header from '~/common/header'
import Footer from '~/common/footer'
import Menu from '~/common/aside'
import BackTop from '~/base/backtop'
import LinearProgress from '~/base/linearprogress'

import { isServer } from '_'

import layoutStyle from '@/styles/components/layout/index.less'

/**
 * 本来是 stateless 组件的
 * 但是我想在 body 上绑 scroll 事件，需要在销毁时解除绑定的事件
 * 所以用到了组件的生命周期，就改成 PureComponent
 */
class Layout extends PureComponent {
  static defaultProps = {
    pageTitle: 'Vecchio\'s Blog',
    title: '',
    className: '',
    showTitle: true
  }
  componentDidMount() {
    // 记录滚动的初始状态
    const { dispatch } = this.props
    if (this.isLongScroll()) {
      dispatch({ type: types.SHOW_HEADER_SHADOW })
    } else {
      dispatch({ type: types.HIDE_HEADER_SHADOW })
    }
    // 修改 menu 选中的 pathname
    // 要改成同步时就渲染好的话，感觉提出一个 hoc 在 node 端获取 pathname 比较好
    dispatch({ type: types.SWITCH_MENU_ITEM, pathname: this.fetchPathname() })
    // 绑定滚动事件
    window.addEventListener('scroll', this.scrollHandler)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
  }
  scrollHandler = (e) => {
    // TODO 滑动需要做优化
    const { isLongScroll, dispatch } = this.props
    const { scrollTop } = e.target.scrollingElement
    if (scrollTop > 220) {
      if (!isLongScroll) {
        dispatch({ type: types.SHOW_HEADER_SHADOW })
      }
    } else if (isLongScroll) {
      dispatch({ type: types.HIDE_HEADER_SHADOW })
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
    if (scrollTop > 220) {
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
      asideIsOpen,
      isLongScroll,
      showTitle
    } = this.props
    return (
      <div className="global-wrap">
        <Head>
          <title>{pageTitle}</title>
          <style dangerouslySetInnerHTML={{ __html: layoutStyle }} />
        </Head>
        <LinearProgress visible={this.props.globalProgress} className="global-router-progress" />
        <Menu />
        <div className={classNames('main-wrap', { 'menu-has-close': !asideIsOpen })}>
          <Header title={title} isLongScroll={isLongScroll} />
          <BackTop show={isLongScroll} />
          <div className="main-content">
            <div className="content-header">
              <h4 className="title">
                { showTitle && title }
              </h4>
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

const mapStateToProps = (state) => {
  const common = state.get('common')
  const asideIsOpen = common.get('asideIsOpen')
  const isLongScroll = common.get('isLongScroll')
  const globalProgress = common.get('globalProgress')
  return { asideIsOpen, isLongScroll, globalProgress }
}

export default connect(mapStateToProps)(Layout)
