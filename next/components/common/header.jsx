import React, { PureComponent } from 'react'
import Link from 'next/link'

export default class Banner extends PureComponent {
  static menuData = [{
    id: 0,
    label: 'haha',
    icon: 'hehe',
    href: 'xixi'
  }]
  static getMenuHtml = () => {
    const { menuData } = Banner
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
  componentDidMount() {

  }
  render() {
    return (
      <header className="main-header">
        <div className="header-wrap">
          { Banner.getMenuHtml() }
        </div>
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
      </header>
    )
  }
}
