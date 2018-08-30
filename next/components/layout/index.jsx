import { PureComponent } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import classNames from 'classnames'

import { Row, Col } from 'antd'

import types from 'store/action/common'

import Header from 'components/common/header'
import Footer from 'components/common/footer'
import Menu from 'components/common/aside'

import isServer from 'utils'

import layoutStyle from 'static/styles/components/layout/index.less'

/**
 * 本来是 stateless 组件的
 * 但是我想在 body 上绑 scroll 事件，需要在销毁时解除绑定的事件
 * 所以用到了组件的生命周期，就改成 PureComponent
 */
class Layout extends PureComponent {
  componentDidMount() {
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
  render() {
    const {
      children,
      pageTitle = 'Vecchio\'s Blog',
      title = '',
      className,
      asideIsOpen,
      isLongScroll
    } = this.props
    // 初始化头部阴影状态
    let isLongScrollResult = isLongScroll
    if (!isServer) {
      const { scrollTop } = document.documentElement
      if (scrollTop > 220) {
        isLongScrollResult = true
      } else {
        isLongScrollResult = false
      }
    }
    // scroll 现在应该绑在 body 上
    return (
      <div className="global-wrap">
        <Head>
          <title>{pageTitle}</title>
          <style dangerouslySetInnerHTML={{ __html: layoutStyle }} />
        </Head>
        <Menu />
        <div className={classNames('main-wrap', { 'menu-has-close': !asideIsOpen })}>
          <Header title={title} isLongScroll={isLongScrollResult} />
          <div className="main-content">
            <div className="content-header">
              <h4 className="title">
                { title }
              </h4>
            </div>
            { /**
               * calc(100vh - 300px) 写在 less 里会编译成 -200vh
               * 需要写成 calc(~"100vh - 300px")
               * */ }
            <Row type="flex" justify="center" className="content-body-wrap" style={{ minHeight: 'calc(100vh - 300px)' }}>
              <Col span={24} className="content-body-main">
                <div className={className}>
                  {children}
                </div>
              </Col>
            </Row>
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
  return {
    asideIsOpen,
    isLongScroll
  }
}

export default connect(mapStateToProps)(Layout)
