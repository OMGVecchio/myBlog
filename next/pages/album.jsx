import { connect } from 'react-redux'

import Layout from 'components/layout'

const Album = () => (
  <Layout title="相册">
    额滴歌神啊，来几个相框吧
  </Layout>
)

export default connect()(Album)
