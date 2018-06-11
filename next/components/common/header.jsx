import { Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { Row, Col, Icon, Input } from 'antd'

import types from 'store/action/common'

const Header = ({
  dispatch,
  showShadow
}) => {
  const openMenu = () => {
    dispatch({
      type: types.OPEN_ASIDE
    })
  }
  return (
    <Fragment>
      <header className={classNames('main-header', { 'show-shadow': showShadow })}>
        <Row type="flex" justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Icon type="menu-unfold" onClick={openMenu} />
          </Col>
          <Col>
            <Input.Search />
          </Col>
        </Row>
      </header>
      <style jsx>{`
        .main-header {
          position: fixed;
          left: 0;
          z-index: 99;
          height: 65px;
          width: 100%;
          background-color: #4054B2;
          color: #fff;
          &.show-shadow {
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
          }
        }
      `}
      </style>
    </Fragment>
  )
}

export default connect()(Header)
