import { PureComponent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'

import { Table, Button, Tag } from 'antd'

import { fetchList, removeArticle, onlineArticle } from 'store/action/article'

import Layout from 'components/layout'

import { format } from 'utils/moment'

import style from 'static/styles/pages/manage.less'

class Manage extends PureComponent {
  static defaultProps = {
    articleList: []
  }
  static getInitialProps({ ctx }) {
    const { store, query } = ctx
    const { dispatch } = store
    const { kw = '' } = query
    dispatch(fetchList())
    return { kw }
  }
  randomColor = () => this.colors[Math.ceil(Math.random() * 10)]
  colors = [
    'magenta', 'red', 'volcano', 'orange', 'gold',
    'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
  ]
  removeArticle = id => this.props.dispatch(removeArticle(id))
  switchOnline = (id, online) => this.props.dispatch(onlineArticle(id, online))
  columns = [{
    title: '文章名',
    dataIndex: 'title',
    align: 'center',
    width: '200px'
  }, {
    title: '标签',
    dataIndex: 'tags',
    align: 'center',
    render: tags => tags.map(tag => <Tag color="cyan" key={tag}>{tag}</Tag>)
  }, {
    title: '状态',
    dataIndex: 'online',
    align: 'center',
    width: '100px',
    render: (online) => {
      const isOnline = !!online
      const text = isOnline ? '已上线' : '已下线'
      return <Tag color={isOnline ? 'green' : 'purple'}>{text}</Tag>
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    width: '210px',
    render: createTime => format(createTime, { showWeek: false })
  }, {
    title: '最新修改',
    dataIndex: 'lastModify',
    align: 'center',
    width: '210px',
    render: lastModify => format(lastModify, { showWeek: false })
  }, {
    title: '操作',
    key: 'operation',
    width: '180px',
    align: 'center',
    render: (record) => {
      const { id, online } = record
      return (
        <div className="operation-wrap">
          <Link href={`/compose?articleId=${id}`}>
            <Button
              type="primary"
              size="small"
            >
              修改
            </Button>
          </Link>
          <Button
            size="small"
            onClick={() => this.switchOnline(id, !online)}
          >
            {online ? '下线' : '上线'}
          </Button>
          <Button
            type="danger"
            size="small"
            onClick={() => this.removeArticle(id)}
          >
            删除
          </Button>
        </div>
      )
    }
  }]
  render() {
    const { kw } = this.props
    let { articleList = [] } = this.props
    if (kw) {
      articleList = articleList.filter((article) => {
        const { title } = article
        if (title.indexOf(kw) !== -1) {
          return true
        }
        return false
      })
    }
    return (
      <Layout
        className="manage-page"
        pageTitle="文章管理"
        title="文章管理"
      >
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </Head>
        <div>
          <Table
            className="article-table"
            bordered
            rowKey="id"
            dataSource={articleList}
            columns={this.columns}
          />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const article = state.get('article')
  let articleList = article.get('articleList')
  if (articleList.toJS) {
    articleList = articleList.toJS()
  }
  return { articleList }
}

export default connect(mapStateToProps)(Manage)
