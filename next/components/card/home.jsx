import classnames from 'classnames'

import { format } from '_/moment'

import style from '@/styles/components/card/home'

import CardLayout from './layout'

const HomeCard = ({
  title,
  createTime,
  cover,
  desc
}) => (
  <div className={classnames(style['home-card'], style['card-wrap'])}>
    <h3 className={style['card-title']}>
      {title}
      <span className={classnames(style['card-time'], 'fr')}>{format(createTime)}</span>
    </h3>
    <div className={style['card-cover']} style={{ backgroundImage: `url(${cover})` }} />
    <p className={style['card-content']}>{desc}</p>
  </div>
)

export default CardLayout(HomeCard)
