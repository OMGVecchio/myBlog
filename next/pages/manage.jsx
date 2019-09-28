import { PureComponent } from 'react'
import { observer, inject } from 'mobx-react'
import { Table, Button, Tag } from 'antd'

import Link from 'next/link'

import Layout from '~/layout'

import { format } from '_/moment'

import '@/styles/pages/manage.less'

const colors = [
  'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
]

@inject('articleStore')
@observer
class ManagePage extends PureComponent {
  static defaultProps = {
    articleStore: {}
  }
  static async getInitialProps({ ctx }) {
    const { store, query } = ctx
    const { kw = '' } = query
    await store.articleStore.fetchArticleList()
    return { kw }
  }
  randomColor = () => colors[Math.ceil(Math.random() * 10)]
  removeArticle = id => this.props.articleStore.removeArticle(id)
  switchOnline = (id, online) => this.props.articleStore.swicthArticleStatus(id, online)
  columns = [{
    title: '文章名',
    dataIndex: 'title',
    align: 'center',
    width: '200px',
    render: (title, record) => (
      <Link href={`/article?articleId=${record.id}`}>
        <span className="article-title">{title}</span>
      </Link>
    )
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
          <Link href={`/compose?articleId=${id}`} as={`/compose/${id}`}>
            <Button type="primary" size="small" >
              修改
            </Button>
          </Link>
          <Button size="small" onClick={() => this.switchOnline(id, !online)}>
            {online ? '下线' : '上线'}
          </Button>
          <Button type="danger" size="small" onClick={() => this.removeArticle(id)}>
            删除
          </Button>
        </div>
      )
    }
  }]
  render() {
    const { kw, articleStore } = this.props
    let { articleList = [] } = articleStore
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
      <Layout className="manage-page" pageTitle="文章管理" title="文章管理">
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

export default ManagePage
