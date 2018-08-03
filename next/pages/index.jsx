import { PureComponent, Fragment } from 'react'
import Layout from 'components/layout'
import { connect } from 'react-redux'
import Link from 'next/link'

import { List } from 'antd'

import { fetchList } from 'store/action/article'

import style from 'static/styles/pages/index.less'

class Index extends PureComponent {
  static defaultProps = {
    articleList: []
  }
  static async getInitialProps({ ctx }) {
    const { store } = ctx
    await store.dispatch(fetchList())
  }
  static renderItem = ({
    id,
    title,
    desc,
    createTime
  }) => (
    <div className="card-wrap">
      <Link href={`/article?articleId=${id}`}>
        <h3 className="card-title">
          {title}
          <span className="card-time">
            {createTime}
          </span>
        </h3>
      </Link>
      <Link href={`/article?articleId=${id}`}>
        <p className="card-content">
          {desc}
        </p>
      </Link>
    </div>
  )
  render() {
    return (
      <Fragment>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Layout title="老司机带你熟练翻车的主页">
          <List dataSource={this.props.articleList} renderItem={Index.renderItem} />
        </Layout>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const article = state.get('article')
  const articleList = article.get('articleList')
  return { articleList }
}

export default connect(mapStateToProps)(Index)
