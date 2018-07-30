import { Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Link from 'next/link'

import { Avatar, Icon, List, Row, Col } from 'antd'

import types from 'store/action/common'

import style from 'static/styles/components/common/aside.less'

const Aside = ({
  dispatch,
  asideIsOpen
}) => {
  const close = () => {
    dispatch({ type: types.CLOSE_ASIDE })
  }
  const menuData = [{
    label: '主页',
    url: '/index',
    icon: 'home'
  }, {
    label: '分类',
    url: '/category',
    icon: 'folder-open'
  }, {
    label: '标签',
    url: '/tag',
    icon: 'tag-o'
  }, {
    label: '撰文',
    url: '/compose',
    icon: 'edit'
  }]
  const renderMenu = (item) => {
    const { label, url, icon } = item
    return (
      <List.Item>
        <Link href={url}>
          <Row className="menu-item" style={{ width: '100%' }}>
            <Col span={3} offset={2}>
              <Icon className="menu-item-icon" type={icon} />
            </Col>
            <Col span={19}>
              {label}
            </Col>
          </Row>
        </Link>
      </List.Item>
    )
  }
  const renderLink = () => {
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
      <Row>
        { linkItems }
      </Row>
    )
  }
  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div className={classNames('aside-menu', { close: !asideIsOpen })}>
        <div className="menu-header">
          <Avatar className="avatar-cover" size="large" src="http://rms.zhubajie.com/resource/redirect?key=mobile%2Fdefault%2F%E5%A4%B4%E5%83%8F17.jpg%2Forigine%2F1990662d-d67a-4f85-92bf-73be1dd6d334&s.w=240&s.h=240" />
          <div className="description text-overflow">
            呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的
            一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人呵呵哒的一个男人
          </div>
          <span className="close-btn">
            <Icon className="aside-close-btn" type="close" onClick={() => close(dispatch)} />
          </span>
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
      <style jsx>{`
        @headerHeight: 230px;
        @width: 240px;
        @duration: 0.5s;
        .aside-menu {
          position: fixed;
          z-index: 100;
          box-sizing: border-box;
          width: @width;
          top: 0;
          left: 0;
          bottom: 0;
          background-color: #fff;
          transition: left @duration;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0,0.12);
          .close-btn {
            padding: 2px 5px;
            position: absolute;
            font-weight: bold;
            color: #fff;
            top: 20px;
            right: 20px;
            cursor: pointer;
          }
          &.close {
            left: -@width;
            .close-btn {
              display: none;
            }
          }
          .menu-header {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: @headerHeight;
            padding: 40px;
            background-color: rgba(63, 81, 181, 0.8);
            .description {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              color: #fff;
            }
          }
          .menu-items {
            .menu-item {
              width: 100%;
              padding: 5px 10px;
            }
          }
          .link-items {
            margin-top: 20px;
          }
        }
      `}
      </style>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const common = state.get('common')
  const asideIsOpen = common.get('asideIsOpen')
  return {
    asideIsOpen
  }
}

export default connect(mapStateToProps)(Aside)
