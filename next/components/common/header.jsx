import { Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Router from 'next/router'

import { Row, Col, Icon, Input } from 'antd'

import types from 'store/action/common'

import isServer from 'utils'

import style from 'static/styles/components/common/header.less'

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
    <Fragment>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <header className={classNames('main-header', { 'show-shadow': isLongScroll })}>
        <Row type="flex" justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Icon className="header-close-icon" type="menu-unfold" onClick={openMenu} />
          </Col>
          <Col>
            { isLongScroll && <h4 className="header-title">{title}</h4> }
          </Col>
          <Col>
            <Input.Search
              defaultValue={isServer ? '' : Router.query.kw}
              className="header-search-wrap"
              onSearch={search}
            />
          </Col>
        </Row>
      </header>
    </Fragment>
  )
}

export default connect()(Header)
