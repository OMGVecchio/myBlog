import classnames from 'classnames'

import style from '@/styles/components/article/comment-list'

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
    <div className={classnames(style['component-comment'], className)}>
      <p className={style['comment-count']}>
        <span className={style['comment-count-digital']}>
          {commentList.length}
        </span>
        评论
      </p>
      {getCommentHtml(commentList)}
    </div>
  )
}

export default CommentList
