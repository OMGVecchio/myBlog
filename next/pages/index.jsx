import { PureComponent, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { List } from 'antd'

import { filterArticleList } from '_'

import Layout from '~/layout'
import HomeCard from '~/card/home'

@inject('articleStore')
@observer
class IndexPage extends PureComponent {
  static defaultProps = {
    articleStore: {}
  }
  static getInitialProps = async ({ ctx }) => {
    const { query, store } = ctx
    const { kw } = query
    await store.articleStore.fetchArticleList()
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
    const { kw, articleStore } = this.props
    let { articleList = [] } = articleStore
    articleList = filterArticleList(articleList, kw)
    return (
      <Fragment>
        <Layout title="老司机带你熟练翻车的主页">
          <List dataSource={articleList} renderItem={IndexPage.renderItem} />
        </Layout>
      </Fragment>
    )
  }
}

export default IndexPage
