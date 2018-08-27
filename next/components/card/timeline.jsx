import { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Card } from 'antd'

import { format } from 'utils/moment'

import style from 'static/styles/components/card/timeline.less'

const { Meta } = Card

const timelineCard = ({
  id,
  title = '暂无标题',
  createTime,
  cover = '//files.vladstudio.com/joy/cats/wall/vladstudio_cats_800x600_signed.jpg',
  desc = '暂无描述'
}) => (
  <Fragment>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: style }} key="style-timeline" />
    </Head>
    <Link href={`/article?articleId=${id}`}>
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
    </Link>
  </Fragment>
)

export default timelineCard
