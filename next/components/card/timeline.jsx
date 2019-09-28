import { Fragment } from 'react'
import { Card } from 'antd'

import { format } from '_/moment'

import '@/styles/components/card/timeline.less'

import CardLayout from './layout'

const { Meta } = Card

const timelineCard = ({
  id,
  title,
  createTime,
  cover,
  desc
}) => (
  <Fragment key={`timelinecard-${id}`}>
    <Card
      className="timeline-card card-wrap"
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

export default CardLayout(timelineCard)
