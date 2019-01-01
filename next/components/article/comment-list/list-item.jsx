import { Row, Button, Col, Avatar } from 'antd'

import { format } from '_/moment'

import style from '@/styles/components/article/comment-list'

const CommentListItem = ({
  children,
  data,
  onReview = () => {},
  reviewId
}) => {
  const {
    id,
    comment = '',
    username = '',
    userblog = '',
    createTime
  } = data
  let blogFix = userblog
  if (userblog && !/^(https?:)?\/\//.test(userblog)) {
    blogFix = `//${userblog}`
  }
  const getTitle = () => {
    if (username && blogFix) {
      return <a href={blogFix} target="_blank">{username}</a>
    } else if (username) {
      return username
    } else if (blogFix) {
      return <a href={blogFix} target="_blank">{id}</a>
    }
    return id
  }
  return (
    <div className={style['component-comment-item']} id={id}>
      <Row>
        <Col span={1}>
          <Avatar size="small" icon="user" />
        </Col>
        <Col span={22}>
          <p className={style['comment-title']}>{getTitle()}</p>
          <p className={style['comment-time']}>{format(createTime)}</p>
          <p className={style['comment-body']}>{comment}</p>
        </Col>
        <Col span={1}>
          <Button type="primary" size="small" onClick={() => onReview(reviewId)}>
            回复
          </Button>
        </Col>
      </Row>
      {children}
    </div>
  )
}

export default CommentListItem
