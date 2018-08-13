import { Fragment } from 'react'

import { Row, Col } from 'antd'

import Layout from 'components/layout'
import CategoryCard from 'components/card/category'

const Timeline = () => (
  <Layout title="文章时间轴">
    <Fragment>
      <Row gutter={16}>
        <Col span={12}>
          <CategoryCard />
        </Col>
        <Col span={12}>
          <CategoryCard />
        </Col>
      </Row>
    </Fragment>
  </Layout>
)

export default Timeline
