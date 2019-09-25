import { connect } from 'react-redux'
import { Card } from 'antd'

import Layout from '~/layout'

const { Meta } = Card

const Album = () => (
  <Layout title="详情">
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </div>
  </Layout>
)

export default connect()(Album)
