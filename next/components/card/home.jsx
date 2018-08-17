import { Fragment } from 'react'
import Link from 'next/link'

import { format } from 'utils/moment'

import style from 'static/styles/components/card/home.less'

const HomeCard = ({
  id,
  title,
  createTime,
  cover = '//files.vladstudio.com/joy/cats/wall/vladstudio_cats_800x600_signed.jpg',
  desc
}) => (
  <Fragment>
    <style dangerouslySetInnerHTML={{ __html: style }} />
    <Link href={`/article?articleId=${id}`}>
      <div className="card-wrap">
        <h3 className="card-title">
          {title}
          <span className="card-time fr">{format(createTime)}</span>
        </h3>
        <div className="card-cover" style={{ backgroundImage: `url(${cover})` }} />
        <p className="card-content">{desc}</p>
      </div>
    </Link>
  </Fragment>
)

export default HomeCard
