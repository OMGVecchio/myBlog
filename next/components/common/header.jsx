import { connect } from 'react-redux'
import { Icon, Input } from 'antd'
import classnames from 'classnames'

import Link from 'next/link'
import Router from 'next/router'

import types from '#/action/common'

import isServer from '_'

import style from '@/styles/components/common/header'

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
    <header className={classnames(style['main-header'], { [style['show-shadow']]: isLongScroll })}>
      <div className={style['header-close']}>
        <Icon className={classnames(style['header-icon'], style['header-close-icon'])} type="menu-unfold" onClick={openMenu} />
      </div>
      <div>
        { isLongScroll && <h4 className={style['header-title']}>{title}</h4> }
      </div>
      <div className={style['header-opt']}>
        <Input.Search
          defaultValue={isServer ? '' : Router.query.kw}
          className={style['header-search-wrap']}
          onSearch={search}
          style={{ width: '210px' }}
        />
        <Link href="/login">
          <Icon className={classnames(style['header-icon'], style['header-login-icon'])} type="login" />
        </Link>
      </div>
    </header>
  )
}

export default connect()(Header)
