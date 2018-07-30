import { Fragment } from 'react'

import { Row, Col } from 'antd'

import Layout from 'components/layout'
import CategoryCard from 'components/card/category'

const Category = () => (
  <Layout title="老司机带你熟练翻车的分类页">
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

export default Category
