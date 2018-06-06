import { Button } from 'antd'
import Layout from 'components/layout'
import { connect } from 'react-redux'

const Index = () => (
  <Layout>
    <div>
      <Button>sads</Button>
    </div>
  </Layout>
)

export default connect()(Index)
