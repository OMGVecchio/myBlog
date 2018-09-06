import { PureComponent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'

import { Table, Button, Tag } from 'antd'

import { fetchList, removeArticle } from 'store/action/article'

import Layout from 'components/layout'

import { format } from 'utils/moment'
import xhr from 'utils/fetch'

import style from 'static/styles/pages/manage.less'

class Manage extends PureComponent {
  static defaultProps = {
    articleList: []
  }
  static getInitialProps({ ctx }) {
    const { store } = ctx
    const { dispatch } = store
    dispatch(fetchList())
  }
  randomColor = () => this.colors[Math.ceil(Math.random() * 10)]
  colors = [
    'magenta', 'red', 'volcano', 'orange', 'gold',
    'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
  ]
  removeArticle = id => this.props.dispatch(removeArticle(id))
  columns = [{
    title: '文章名',
    dataIndex: 'title',
    align: 'center'
  }, {
    title: '标签',
    dataIndex: 'tags',
    align: 'center',
    render: tags => tags.map(tag => <Tag color="cyan" key={tag}>{tag}</Tag>)
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    width: '210px',
    render: createTime => format(createTime)
  }, {
    title: '最新修改',
    dataIndex: 'lastModify',
    align: 'center',
    width: '210px',
    render: lastModify => format(lastModify)
  }, {
    title: '操作',
    key: 'operation',
    width: '140px',
    align: 'center',
    render: (record) => {
      const { id } = record
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
    const { articleList } = this.props
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
