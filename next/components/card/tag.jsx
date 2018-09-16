import { Fragment } from 'react'
import { Card } from 'antd'

import Head from 'next/head'
import Link from 'next/link'

import { format } from '_/moment'

import style from '@/styles/components/card/tag.less'

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
    <Head>
      <style dangerouslySetInnerHTML={{ __html: style }} key="style-tag" />
    </Head>
    <Link href={`/article?articleId=${id}`}>
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
    </Link>
  </Fragment>
)

export default CardLayout(TagCard)
