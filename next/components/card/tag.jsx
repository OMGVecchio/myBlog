import { Fragment } from 'react'
import { Card } from 'antd'

import { format } from '_/moment'

import '@/styles/components/card/tag.less'

import CardLayout from './layout'

const { Meta } = Card

const TagCard = ({
  id,
  title,
  createTime,
  cover,
  desc
}) => (
  <Fragment key={`tagcard-${id}`}>
    <Card
      className="tag-card card-wrap"
      hoverable
      title={title}
      cover={<img className="card-cover" src={cover} alt={title} />}
      extra={<span>{format(createTime)}</span>}
    >
      <Meta
        description={desc}
      />
    </Card>
  </Fragment>
)

export default CardLayout(TagCard)
