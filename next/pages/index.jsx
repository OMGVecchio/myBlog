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
    const { store } = ctx
    await store.dispatch(fetchList())
  }
  static renderItem = ({
    id,
    title,
    desc,
    createTime,
    cover
  }) => (<HomeCard id={id} title={title} desc={desc} createTime={createTime} cover={cover} />)
  render() {
    return (
      <Fragment>
        <Layout title="老司机带你熟练翻车的主页">
          <List dataSource={this.props.articleList} renderItem={Index.renderItem} />
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
