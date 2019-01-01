import classnames from 'classnames'

import { Card } from 'antd'

import { format } from '_/moment'

import style from '@/styles/components/card/tag'

import CardLayout from './layout'

const { Meta } = Card

const TagCard = ({
  title,
  createTime,
  cover,
  desc
}) => (
  <Card
    className={classnames(style['tag-card'], style['card-wrap'])}
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

export default CardLayout(TagCard)
