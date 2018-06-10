import { Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'

import types from 'store/action/common'

const Header = ({
  dispatch
}) => {
  const menuData = [{
    id: 0,
    label: 'haha',
    icon: 'hehe',
    href: 'xixi'
  }]
  const getMenuHtml = () => {
    const chunks = menuData.map(item => (
      <li key={item.id}>
        <Link href={item.href}>
          <span>
            <i className={item.icon} />
            { item.label }
          </span>
        </Link>
      </li>
    ))
    return (<ul>{ chunks }</ul>)
  }
  const openMenu = () => {
    dispatch({
      type: types.OPEN_ASIDE
    })
  }
  return (
    <Fragment>
      <header className="main-header">
        <button onClick={openMenu}>
          打开菜单吧
        </button>
        <div className="header-wrap">
          { getMenuHtml() }
        </div>
      </header>
      <style jsx>{`
        .main-header {
          position: fixed;
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
