import { Fragment } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import classNames from 'classnames'

import { Row, Col } from 'antd'

import types from 'store/action/common'

import Header from 'components/common/header'
import Footer from 'components/common/footer'
import Menu from 'components/common/aside'

import styles from 'static/styles/global.less'

const Layout = ({
  dispatch,
  children,
  pageTitle = 'Vecchio\'s Blog',
  title = '',
  className,
  asideIsOpen,
  showHeaderShadow
}) => {
  const scroll = (e) => {
    const { scrollTop = 0 } = e.target || {}
    if (scrollTop > 220) {
      if (!showHeaderShadow) {
        dispatch({ type: types.SHOW_HEADER_SHADOW })
      }
    } else if (showHeaderShadow) {
      dispatch({ type: types.HIDE_HEADER_SHADOW })
    }
  }
  return (
    <Fragment>
      <div className="global-wrap" onScroll={scroll}>
        <Head>
          <title>{pageTitle}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <style dangerouslySetInnerHTML={{ __html: styles }} />
        </Head>
        <Menu />
        <div className={classNames('main', { 'menu-has-close': !asideIsOpen })}>
          <Header showShadow={showHeaderShadow} />
          <div className="main-content">
            <div className="content-header">
              <h4 className="title">
                { title }
              </h4>
            </div>
            <Row type="flex" justify="center" style={{ minHeight: 'calc(100vh - 300px)' }}>
              <Col span={24} style={{ width: '70%', marginTop: '20px', marginBottom: '20px' }}>
                <div className={className}>
                  {children}
                </div>
              </Col>
            </Row>
            <Footer />
          </div>
        </div>
      </div>
      <style jsx>{`
        @menuWitdh: 240px;
        @menuDuration: 0.5s;
        .global-wrap {
          overflow-y: scroll;
          height: 100vh;
        }
        .main {
          padding-left: @menuWitdh;
          transition: padding-left @menuDuration;
          &.menu-has-close {
            padding-left: 0;
          }
        }
        .content-header {
          padding: 80px 100px 20px 100px;
          height: 230px;
          background-color: #4054B2;
          .title {
            color: #fff;
            font-size: 40px;
            font-weight: bold;
          }
        }
        .main-content {
          height: 100%;
          background-color: #d7dbf0;
        }
      `}
      </style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
      `}
      </style>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const common = state.get('common')
  const asideIsOpen = common.get('asideIsOpen')
  const showHeaderShadow = common.get('showHeaderShadow')
  return {
    asideIsOpen,
    showHeaderShadow
  }
}

export default connect(mapStateToProps)(Layout)
