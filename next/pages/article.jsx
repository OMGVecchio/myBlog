import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

import { Modal, Button, message } from 'antd'

import Layout from 'components/layout'
import Markdown from 'components/article/markdown'
import CommentBox from 'components/article/comment'
import CommentList from 'components/article/comment-list'

import { fetchDetail, fetchComment } from 'store/action/article'

import xhr from 'utils/fetch'
import { format } from 'utils/moment'

import style from 'static/styles/pages/article.less'

class Article extends PureComponent {
  static defaultProps = {
    articleDetail: {},
    articleComment: {}
  }
  static async getInitialProps({ ctx }) {
    const { query, store } = ctx
    const { articleId = '' } = query
    await store.dispatch(fetchDetail(articleId))
    await store.dispatch(fetchComment(articleId))
    return { articleId }
  }
  state = {
    modalVisible: false
  }
  commentChange = (comment) => {
    this.comment = comment
  }
  review = async () => {
    const res = await xhr.post(`/api/comment/${this.props.articleId}`, {
      reviewId: this.reviewId,
      comment: this.comment
    })
    const data = await res.json()
    if (data.success === true) {
      const { dispatch, articleId } = this.props
      dispatch(fetchComment(articleId))
    } else {
      message.error(data.data)
    }
  }
  openModal = (reviewId) => {
    this.reviewId = reviewId
    this.setState({ modalVisible: true })
  }
  closeModal = () => {
    this.reviewId = ''
    this.setState({ modalVisible: false })
  }
  render() {
    const { articleId, articleDetail, articleComment } = this.props
    const { article, title, createTime } = articleDetail[articleId] || {}
    const commentList = articleComment[articleId] || []
    return (
      <Layout
        className="article-page"
        showTitle={false}
        title={title}
        pageTitle={title}
      >
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </Head>
        <div className="article-content">
          <h1 className="article-title">{title}</h1>
          <p className="article-desc">{format(createTime)}</p>
          <Markdown source={article} />
        </div>
        <div className="article-comment">
          <div className="comment-box">
            <CommentBox onChange={this.commentChange} />
            <div className="comment-footer clearfix">
              <Button
                type="primary"
                size="small"
                onClick={this.review}
                className="fr"
              >
                回复
              </Button>
            </div>
          </div>
          <CommentList
            className="comment-list"
            commentList={commentList}
            onReview={this.openModal}
          />
          <Modal
            centered
            destroyOnClose="true"
            visible={this.state.modalVisible}
            okType="primary"
            okText="回复"
            onOk={this.review}
            cancelText="取消"
            onCancel={this.closeModal}
          >
            <CommentBox onChange={this.commentChange} />
          </Modal>
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
