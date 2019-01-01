import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Tag } from 'antd'

import Link from 'next/link'

import Layout from '~/layout'

import { fetchList, removeArticle, onlineArticle } from '#/action/article'

import { format } from '_/moment'

import style from '@/styles/pages/manage'

const colors = [
  'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
]

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
  randomColor = () => colors[Math.ceil(Math.random() * 10)]
  removeArticle = id => this.props.dispatch(removeArticle(id))
  switchOnline = (id, online) => this.props.dispatch(onlineArticle(id, online))
  columns = [{
    title: '文章名',
    dataIndex: 'title',
    align: 'center',
    width: '200px',
    render: (title, record) => (
      <Link href={`/article?articleId=${record.id}`}>
        <span className={style['article-title']}>{title}</span>
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
        <div className={style['operation-wrap']}>
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
      <Layout className={style['manage-page']} pageTitle="文章管理" title="文章管理">
        <div>
          <Table
            className={style['article-table']}
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
