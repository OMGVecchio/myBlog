import { Row, Button, Col, Avatar } from 'antd'

import { format } from 'utils/moment'

const CommentListItem = ({
  children,
  data,
  onReview = () => {},
  reviewId
}) => {
  const {
    id,
    comment,
    createTime
  } = data
  return (
    <div className="component-comment-item" id={id}>
      <Row>
        <Col span={1}>
          <Avatar size="small" icon="user" />
        </Col>
        <Col span={22}>
          <p className="comment-title">{id}</p>
          <p className="comment-time">{format(createTime)}</p>
          <p className="comment-body">{comment}</p>
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
