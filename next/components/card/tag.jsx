import { Fragment } from 'react'

import { Card } from 'antd'

const { Meta } = Card

const TagCard = () => (
  <Fragment>
    <Card hoverable>
      <Meta
        title="我是标题"
        description="我是描述"
      />
    </Card>
  </Fragment>
)

export default TagCard
