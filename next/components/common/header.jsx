import { Fragment } from 'react'
import { connect } from 'react-redux'

import types from 'store/action/common'

const Header = ({
  dispatch
}) => {
  const openMenu = () => {
    dispatch({
      type: types.OPEN_ASIDE
    })
  }
  return (
    <Fragment>
      <header className="main-header">
        <button onClick={openMenu}>
          菜单按钮
        </button>
        <div className="header-wrap">
          我就是菜单啊
        </div>
      </header>
      <style jsx>{`
        .main-header {
          position: fixed;
          left: 0;
          z-index: 99;
          height: 65px;
          width: 100%;
        }
        .header-wrap {
          background-color: #4054B2;
          width: 100%;
          height: 100%;
        }
      `}
      </style>
    </Fragment>
  )
}

export default connect()(Header)
