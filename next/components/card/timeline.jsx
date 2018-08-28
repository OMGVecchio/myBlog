import { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Card } from 'antd'

import { format } from 'utils/moment'

import style from 'static/styles/components/card/timeline.less'

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

export default CardLayout(timelineCard)
