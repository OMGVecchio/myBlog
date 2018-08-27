import { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { format } from 'utils/moment'

import style from 'static/styles/components/card/home.less'

const HomeCard = ({
  id,
  title = '暂无标题',
  createTime,
  cover = '//files.vladstudio.com/joy/cats/wall/vladstudio_cats_800x600_signed.jpg',
  desc = '暂无描述'
}) => (
  <Fragment>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: style }} key="style-home" />
    </Head>
    <Link href={`/article?articleId=${id}`}>
      <div className="home-card card-wrap">
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
