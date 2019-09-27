import { Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Avatar, Icon, List, Row, Col } from 'antd'
import classNames from 'classnames'

import Link from 'next/link'

import style from '@/styles/components/common/aside.less'

const name = 'Vecchio阿加西'
const briefTip = '前端鶸'
const menuData = [{
  label: '主页',
  url: '/index',
  icon: 'home',
  color: 'purple'
}, {
  label: '时间轴',
  url: '/timeline',
  icon: 'filter',
  color: 'purple'
}, {
  label: '标签',
  url: '/tag',
  icon: 'tag-o',
  color: 'purple'
}, {
  label: '撰文',
  url: '/compose',
  icon: 'edit',
  color: 'purple'
}, {
  label: '文章管理',
  url: '/manage',
  icon: 'setting',
  color: 'purple'
}, {
  label: '试炼场',
  url: '/trials',
  icon: 'tool',
  color: 'purple'
}, {
  label: '相册',
  url: '/album',
  icon: 'picture',
  color: 'purple'
}]
const linkData = [{
  id: 0,
  label: 'gayhub',
  url: 'https://github.com/OMGVecchio',
  icon: 'github'
}, {
  id: 1,
  label: 'weibo',
  url: 'https://weibo.com/u/3300075617',
  icon: 'weibo'
}, {
  id: 2,
  label: 'facebook',
  url: 'https://www.facebook.com/lulu.vecchio',
  icon: 'facebook'
}, {
  id: 3,
  label: 'twitter',
  url: 'https://twitter.com/vecchio1993',
  icon: 'twitter'
}]
// 给当前路由对应的导航加上选中样式
const fetchMenuStatus = (pathname, url) => {
  const pn = pathname === '/' ? '/index' : pathname
  if (pn === url) {
    return 'is-active'
  }
  return ''
}

const Aside = ({ commonStore }) => {
  const {
    asideIsOpen,
    pathname,
    closeAside
  } = commonStore
  const renderMenu = (item) => {
    const {
      label,
      url,
      icon,
      color
    } = item
    return (
      <List.Item className={fetchMenuStatus(pathname, url)}>
        <Link href={url}>
          <a className={classNames('menu-item-wrap', color)}>
            <Row className="menu-item">
              <Col span={3} offset={2}>
                <Icon className="menu-item-icon" type={icon} />
              </Col>
              <Col span={19}>
                {label}
              </Col>
            </Row>
          </a>
        </Link>
      </List.Item>
    )
  }
  const renderLink = () => {
    const linkItems = linkData.map((item) => {
      const {
        id,
        label,
        url,
        icon
      } = item
      return (
        <Col span={4} push={4} key={id}>
          <a className={classNames('menu-link', label)} href={url} target="blank">
            <Icon className="menu-link-icon" title={label} type={icon} />
          </a>
        </Col>
      )
    })
    return (
      <Row>{ linkItems }</Row>
    )
  }
  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div className={classNames('aside-menu', { close: !asideIsOpen })}>
        <div className="menu-header">
          <Avatar
            className="avatar-cover"
            size="large"
            src="//rms.zhubajie.com/resource/redirect?key=mobile%2Fdefault%2F%E5%A4%B4%E5%83%8F17.jpg%2Forigine%2F1990662d-d67a-4f85-92bf-73be1dd6d334&s.w=240&s.h=240"
          />
          <div className="name text-center text-overflow">{name}</div>
          <div className="description text-center text-overflow">{briefTip}</div>
          <Icon className="aside-close-btn" type="menu-fold" onClick={() => closeAside()} />
        </div>
        <div>
          <div className="menu-items">
            <List dataSource={menuData} renderItem={renderMenu} split={false} />
          </div>
          <div className="link-items">
            { renderLink() }
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default inject('commonStore')(observer(Aside))
