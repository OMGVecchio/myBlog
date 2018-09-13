import { connect } from 'react-redux'
import { Icon, Input } from 'antd'
import classNames from 'classnames'

import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import types from '#/action/common'

import isServer from '_'

import style from '@/styles/components/common/header.less'

const search = (kw) => {
  const { pathname, query } = Router
  query.kw = kw
  const queryArr = Object.keys(query).map(key => `${key}=${query[key]}`)
  Router.push(`${pathname}?${queryArr.join('&')}`)
}

const Header = ({
  dispatch,
  title = '',
  isLongScroll
}) => {
  const openMenu = () => {
    dispatch({
      type: types.OPEN_ASIDE
    })
  }
  return (
    <header className={classNames('main-header', { 'show-shadow': isLongScroll })}>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </Head>
      <div className="header-close">
        <Icon className="header-icon header-close-icon" type="menu-unfold" onClick={openMenu} />
      </div>
      <div>
        { isLongScroll && <h4 className="header-title">{title}</h4> }
      </div>
      <div className="header-opt">
        <Input.Search
          defaultValue={isServer ? '' : Router.query.kw}
          className="header-search-wrap"
          onSearch={search}
          style={{ width: '210px' }}
        />
        <Link href="/login">
          <Icon className="header-icon header-login-icon" type="login" />
        </Link>
      </div>
    </header>
  )
}

export default connect()(Header)
