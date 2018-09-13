import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Avatar, Icon, List, Row, Col } from 'antd'
import classNames from 'classnames'

import Link from 'next/link'

import types from '#/action/common'

import style from '@/styles/components/common/aside.less'

const briefTip = 'UI丑到爆我是知道的，功能简陋我也是知道的，交互贼差我又没关注有啥办法，优化中'
const menuData = [{
  label: '主页',
  url: '/index',
  icon: 'home'
}, {
  label: '时间轴',
  url: '/timeline',
  icon: 'filter'
}, {
  label: '标签',
  url: '/tag',
  icon: 'tag-o'
}, {
  label: '撰文',
  url: '/compose',
  icon: 'edit'
}, {
  label: '文章管理',
  url: '/manage',
  icon: 'setting'
}, {
  label: '试炼场',
  url: '/trials',
  icon: 'tool'
}, {
  label: '相册',
  url: '/album',
  icon: 'picture'
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

const Aside = ({
  dispatch,
  asideIsOpen,
  pathname
}) => {
  const close = () => dispatch({ type: types.CLOSE_ASIDE })
  const renderMenu = (item) => {
    const { label, url, icon } = item
    return (
      <List.Item className={fetchMenuStatus(pathname, url)}>
        <Link href={url}>
          <a className="menu-item-wrap">
            <Row className="menu-item" style={{ width: '100%' }}>
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
          <Avatar className="avatar-cover" size="large" src="http://rms.zhubajie.com/resource/redirect?key=mobile%2Fdefault%2F%E5%A4%B4%E5%83%8F17.jpg%2Forigine%2F1990662d-d67a-4f85-92bf-73be1dd6d334&s.w=240&s.h=240" />
          <div className="description text-overflow">
            {briefTip}
          </div>
          <Icon className="aside-close-btn" type="menu-fold" onClick={() => close(dispatch)} />
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

const mapStateToProps = (state) => {
  const common = state.get('common')
  const asideIsOpen = common.get('asideIsOpen')
  const pathname = common.get('pathname')
  return { asideIsOpen, pathname }
}

export default connect(mapStateToProps)(Aside)
