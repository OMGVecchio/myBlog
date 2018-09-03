import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

import { Button, message } from 'antd'

import Layout from 'components/layout'
import Markdown from 'components/article/markdown'
import CommentBox from 'components/article/comment'

import { fetchDetail, fetchComment } from 'store/action/article'

import xhr from 'utils/fetch'

import style from 'static/styles/pages/article.less'

class Article extends PureComponent {
  static defaultProps = {
    articleDetail: {},
    articleComment: []
  }
  static async getInitialProps({ ctx }) {
    const { query, store } = ctx
    const { articleId = '' } = query
    await store.dispatch(fetchDetail(articleId))
    await store.dispatch(fetchComment(articleId))
    return { articleId }
  }
  commentChange = (comment) => {
    this.comment = comment
  }
  review = () => {
    xhr.post(`/api/comment/:${this.props.articleId}`, {
      reviewId: this.reviewId,
      comment: this.comment
    }).then((res) => {
      if (res.success === true) {
        const { dispatch, articleId } = this.props
        dispatch(fetchComment(articleId))
      } else {
        message.error(res.data)
      }
    })
  }
  render() {
    const { articleId, articleDetail, articleComment } = this.props
    const { article, title } = articleDetail[articleId]
    const commentList = articleComment[articleId]
    console.log(commentList)
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
  let articleComment = article.get('commentMap')
  if (articleDetail.toJS) {
    articleDetail = articleDetail.toJS()
  }
  if (articleComment.toJS) {
    articleComment = articleComment.toJS()
  }
  return { articleDetail, articleComment }
}

export default connect(mapStateToProps)(Article)
