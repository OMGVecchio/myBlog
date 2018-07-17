import { Fragment } from 'react'

import { Row, Col } from 'antd'

import Layout from 'components/layout'
import TagCard from 'components/card/tag'

const Tag = () => (
  <Layout title="老司机带你熟练翻车的标签页">
    <Fragment>
      <Row gutter={16}>
        <Col span={12}>
          <TagCard />
        </Col>
        <Col span={12}>
          <TagCard />
        </Col>
      </Row>
    </Fragment>
  </Layout>
)

export default Tag
