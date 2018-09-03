import { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import { List } from 'antd'

import { fetchList } from 'store/action/article'

import Layout from 'components/layout'
import HomeCard from 'components/card/home'

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
    if (kw) {
      articleList = articleList.filter((articel) => {
        const { title } = articel
        if (title.indexOf(kw) !== -1) {
          return true
        }
        return false
      })
    }
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
