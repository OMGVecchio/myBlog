import { Fragment } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import classNames from 'classnames'

import Header from 'components/common/header'
import Menu from 'components/common/aside'

import styles from 'static/styles/global.less'

const Layout = ({
  children,
  title = 'Vecchio\'s Blog',
  asideIsOpen
}) => (
  <Fragment>
    <div className="global-wrap">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </Head>
      <Menu />
      <div className={classNames('main', { 'menu-has-close': !asideIsOpen })}>
        <Header />
        <div className="content-header">
          哈哈
        </div>
        <div className="main-content">
          <div className="content-wrap">
            {children}
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      @menuWitdh: 240px;
      @menuDuration: 0.5s;
      .main {
        padding-left: @menuWitdh;
        transition: padding-left @menuDuration;
        &.menu-has-close {
          padding-left: 0;
        }
      }
      .content-header {
        height: 230px;
        padding-top: 65px;
        background-color: #4054B2;
      }
      .content-wrap {
        width: 970px;
        background-color: purple;
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

const mapStateToProps = (state) => {
  const common = state.get('common')
  const asideIsOpen = common.get('asideIsOpen')
  return {
    asideIsOpen
  }
}

export default connect(mapStateToProps)(Layout)
