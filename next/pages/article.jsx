import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

import { Button } from 'antd'

import Layout from 'components/layout'
import Markdown from 'components/article/markdown'
import CommentBox from 'components/article/comment'

import { fetchDetail } from 'store/action/article'

import style from 'static/styles/pages/article.less'

class Article extends PureComponent {
  static defaultProps = {
    articleDetail: {}
  }
  static async getInitialProps({ ctx }) {
    const { query, store } = ctx
    const { articleId = '' } = query
    await store.dispatch(fetchDetail(articleId))
  }
  commentChange = (comment) => {
    this.comment = comment
  }
  review = () => {
    alert(this.comment)
  }
  render() {
    const { article, title } = this.props.articleDetail
    return (
      <Layout className="article-page" showTitle={false} title={title}>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </Head>
        <div className="article-content">
          <Markdown source={article} />
        </div>
        <div className="article-comment">
          <div className="comment-box">
            <CommentBox onChange={this.commentChange} />
            <div className="comment-footer clearfix">
              <Button
                type="primary"
                onClick={this.review}
                className="fr"
              >
                回复
              </Button>
            </div>
          </div>
        </div>
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
