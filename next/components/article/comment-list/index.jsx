import { Fragment } from 'react'
import Head from 'next/head'
import classnames from 'classnames'

import style from 'static/styles/components/article/comment-list.less'

import CommentListItem from './list-item'

const CommentList = ({
  className,
  commentList = [],
  onReview = () => {}
}) => {
  const getCommentHtml = (list = [], firstLevelId) => list.map((firstLevel) => {
    const { id } = firstLevel
    if (firstLevel.sub && firstLevel.sub !== 0) {
      const subList = getCommentHtml(firstLevel.sub, id)
      return (
        <CommentListItem
          data={firstLevel}
          key={id}
          onReview={onReview}
          reviewId={firstLevelId || id}
        >
          {subList}
        </CommentListItem>
      )
    }
    return (
      <CommentListItem
        data={firstLevel}
        key={id}
        onReview={onReview}
        reviewId={firstLevelId || id}
      />
    )
  })
  return (
    <Fragment>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: style }} key="style-comment-list" />
      </Head>
      <div className={classnames('component-comment', className)}>
        <p className="comment-count">
          <span className="comment-count-digital">
            {commentList.length}
          </span>
          评论
        </p>
        {getCommentHtml(commentList)}
      </div>
    </Fragment>
  )
}

export default CommentList
