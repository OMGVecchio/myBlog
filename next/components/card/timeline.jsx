import classnames from 'classnames'

import { Card } from 'antd'

import { format } from '_/moment'

import style from '@/styles/components/card/timeline'

import CardLayout from './layout'

const { Meta } = Card

const timelineCard = ({
  title,
  createTime,
  cover,
  desc
}) => (
  <Card
    className={classnames(style['timeline-card'], style['card-wrap'])}
    hoverable
    title={title}
    cover={<img className={style['card-cover']} src={cover} alt={title} />}
    extra={<span>{format(createTime)}</span>}
  >
    <Meta
      description={desc}
    />
  </Card>
)

export default CardLayout(timelineCard)
