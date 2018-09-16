import { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { List } from 'antd'

import { fetchList } from '#/action/article'

import { filterArticleList } from '_'

import Layout from '~/layout'
import HomeCard from '~/card/home'

class Index extends PureComponent {
  static defaultProps = {
    articleList: []
  }
  static getInitialProps = async ({ ctx }) => {
    const { query, store } = ctx
    const { kw } = query
    await store.dispatch(fetchList())
    return { kw }
  }
  static renderItem = ({
    id,
    title,
    desc,
    createTime,
    cover
  }) => (<HomeCard id={id} title={title} desc={desc} createTime={createTime} cover={cover} />)
  render() {
    const { kw } = this.props
    let { articleList = [] } = this.props
    articleList = filterArticleList(articleList, kw)
    return (
      <Fragment>
        <Layout title="老司机带你熟练翻车的主页">
          <List dataSource={articleList} renderItem={Index.renderItem} />
        </Layout>
      </Fragment>
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

export default connect(mapStateToProps)(Index)
