import { Fragment } from 'react'
import Link from 'next/link'

import { Card } from 'antd'

const { Meta } = Card

const TagCard = () => (
  <Fragment>
    <Link href="/article">
      <Card hoverable>
        <Meta
          title="我是标题"
          description="我是描述"
        />
      </Card>
    </Link>
  </Fragment>
)

export default TagCard
