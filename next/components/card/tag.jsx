import { Fragment } from 'react'
import Link from 'next/link'

import { Card } from 'antd'

import { format } from 'utils/moment'

import style from 'static/styles/components/card/tag.less'

const { Meta } = Card

const TagCard = ({
  id,
  title = '',
  createTime,
  cover = '//files.vladstudio.com/joy/cats/wall/vladstudio_cats_800x600_signed.jpg',
  desc = ''
}) => (
  <Fragment>
    <style dangerouslySetInnerHTML={{ __html: style }} />
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

export default TagCard
