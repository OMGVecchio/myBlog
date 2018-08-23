import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'

import { Anchor } from 'antd'

import Markdown from 'components/article/markdown'
import Layout from 'components/layout'

import { fetchDetail } from 'store/action/article'

const { Link } = Anchor

class Article extends PureComponent {
  static defaultProps = {
    articleDetail: {}
  }
  static async getInitialProps({ ctx }) {
    const { query, store } = ctx
    const { articleId = '' } = query
    await store.dispatch(fetchDetail(articleId))
  }
  render() {
    const { article } = this.props.articleDetail
    return (
      <Layout>
        <Fragment>
          <div className="article-content">
            <Anchor>
              <Link href="#test1" title="adsd" />
              <Link href="#test2" title="adsd" />
              <Link href="#test3" title="adsd" />
            </Anchor>
            <Markdown source={article} />
          </div>
          <style jsx>{`
            .article-content {
              background-color: #fff;
              border-radius: 4px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              padding: 35px;
              margin-top: -165px;
            }
          `}
          </style>
        </Fragment>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const article = state.get('article')
  let articleDetail = article.get('articleDetail')
  if (articleDetail.toJS) {
    articleDetail = articleDetail.toJS()
  }
  return { articleDetail }
}

export default connect(mapStateToProps)(Article)
