import React, { PureComponent } from 'react'
import { observer, inject } from 'mobx-react'
import { Modal, Button, message } from 'antd'

import dynamic from 'next/dynamic'

import Layout from '~/layout'
import Markdown from '~/article/markdown'
import CommentBox from '~/article/comment'
import CommentList from '~/article/comment-list'

import xhr from '_/fetch'
import { format } from '_/moment'
import { setCookie, getCookie } from '_/cookie'

import '@/styles/pages/article.less'

// 因为涉及到 cookie 的操作，服务端渲染会有一定问题，暂时停止该组件的服务端渲染，并用更好的提示代替 loading 效果
const BaseInput = dynamic(import('components/base/input'), { ssr: false })

@inject('articleStore')
@observer
class Article extends PureComponent {
  static defaultProps = {
    articleStore: {}
  }
  static async getInitialProps({ ctx }) {
    const { query, store } = ctx
    const { articleId = '' } = query
    const { articleStore } = store
    await articleStore.fetchArticleDetail(articleId)
    await articleStore.fetchArticleComment(articleId)
    return { articleId }
  }
  state = {
    modalVisible: false,
    username: '',
    userblog: ''
  }
  componentWillMount() {
    // 挂载后，从 cookie 中获取用户保存的资料
    const cookie = getCookie() || {}
    const { username = '', userblog = '' } = cookie
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      username,
      userblog
    })
  }
  setUserName = (username) => {
    this.setState({ username })
    setCookie('username', username)
  }
  setUserBlog = (userblog) => {
    this.setState({ userblog })
    setCookie('userblog', userblog)
  }
  commentChange = (comment) => {
    this.comment = comment
  }
  review = async () => {
    const data = await xhr.post(`/api/comment/${this.props.articleId}`, {
      reviewId: this.reviewId,
      comment: this.comment,
      username: this.state.username,
      userblog: this.state.userblog
    })
    if (data.success === true) {
      const { articleStore, articleId } = this.props
      articleStore.fetchArticleComment(articleId)
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
    const { articleId, articleStore } = this.props
    const { articleDetail, commentMap } = articleStore
    const {
      article,
      title,
      createTime,
      lastModify
    } = articleDetail[articleId] || {}
    const commentList = commentMap[articleId] || []
    return (
      <Layout
        className="article-page"
        showTitle={false}
        title={title}
        pageTitle={title}
      >
        <div className="article-content">
          <h1 className="article-title">{title}</h1>
          <p className="article-desc">
            <span>
              发表于：{format(createTime)}
            </span>
            {
              (createTime !== lastModify) && (
                <span className="article-last-upadte">最新修改：{format(lastModify)}</span>
              )
            }
          </p>
          <Markdown source={article} />
        </div>
        {/* 这里会放前后页跳转的链接 */}
        <div className="article-comment">
          <div className="user-info">
            <BaseInput
              placeholder="您的大名"
              onChange={this.setUserName}
              defaultValue={this.state.username}
            />
            <BaseInput
              placeholder="个人博客"
              width="250"
              onChange={this.setUserBlog}
              defaultValue={this.state.userblog}
            />
          </div>
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

export default Article
