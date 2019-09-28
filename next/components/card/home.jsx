import { Fragment } from 'react'

import { format } from '_/moment'

import '@/styles/components/card/home.less'

import CardLayout from './layout'

const HomeCard = ({
  id,
  title,
  createTime,
  cover,
  desc
}) => (
  <Fragment key={`homecard-${id}`}>
    <div className="home-card card-wrap">
      <h3 className="card-title">
        {title}
        <span className="card-time fr">{format(createTime)}</span>
      </h3>
      <div className="card-cover" style={{ backgroundImage: `url(${cover})` }} />
      <p className="card-content">{desc}</p>
    </div>
  </Fragment>
)

export default CardLayout(HomeCard)
