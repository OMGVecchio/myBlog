import { observer, inject } from 'mobx-react'
import { Icon, Input } from 'antd'
import classNames from 'classnames'

import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import isServer from '_'

import style from '@/styles/components/common/header.less'

const search = (kw) => {
  const { pathname, query } = Router
  query.kw = kw
  const queryArr = Object.keys(query).map(key => `${key}=${query[key]}`)
  Router.push(`${pathname}?${queryArr.join('&')}`)
}

const Header = ({
  title = '',
  isLongScroll,
  commonStore
}) => {
  const openMenu = () => commonStore.openAside()
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
          <span>
            <Icon className="header-icon header-login-icon" type="login" />
          </span>
        </Link>
      </div>
    </header>
  )
}

export default inject('commonStore')(observer(Header))
