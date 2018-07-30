import { Fragment } from 'react'
import Layout from 'components/layout'
import { connect } from 'react-redux'
import Link from 'next/link'

import { List } from 'antd'

import style from 'static/styles/pages/index.less'

const renderItem = ({ title, time, desc }) => (
  <div className="card-wrap">
    <Link href="/article">
      <h3 className="card-title">
        {title}
        <span className="card-time">
          {time}
        </span>
      </h3>
    </Link>
    <Link href="/article">
      <p className="card-content">
        {desc}
      </p>
    </Link>
  </div>)

const Index = () => {
  const dataSource = [{
    title: '第一篇',
    time: '2016-2-10',
    desc: '就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介就是一个简单简介'
  }, {
    title: '第二篇',
    time: '2016-2-10',
    desc: '就是一个简单简介'
  }, {
    title: '第三篇',
    time: '2016-2-10',
    desc: '就是一个简单简介'
  }, {
    title: '第四篇',
    time: '2016-2-10',
    desc: '就是一个简单简介'
  }, {
    title: '第五篇',
    time: '2016-2-10',
    desc: '就是一个简单简介'
  }, {
    title: '第六篇',
    time: '2016-2-10',
    desc: '就是一个简单简介'
  }, {
    title: '第七篇',
    time: '2016-2-10',
    desc: '就是一个简单简介'
  }, {
    title: '第八篇',
    time: '2016-2-10',
    desc: '就是一个简单简介'
  }, {
    title: '第八篇',
    time: '2016-2-10',
    desc: '就是一个简单简介'
  }]
  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <Layout title="老司机带你熟练翻车的主页">
        <List dataSource={dataSource} renderItem={renderItem} />
      </Layout>
    </Fragment>
  )
}

export default connect()(Index)
