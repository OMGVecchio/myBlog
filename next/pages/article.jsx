import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'

import Markdown from 'components/article/markdown'
import Layout from 'components/layout'

import { fetchDetail } from 'store/action/article'

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
  const articleDetail = article.get('articleDetail')
  return { articleDetail }
}

export default connect(mapStateToProps)(Article)
