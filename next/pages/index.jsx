import { Fragment } from 'react'
import Layout from 'components/layout'
import { connect } from 'react-redux'

const Index = () => {
  console.log('--首页--')
  return (
    <Fragment>
      <Layout title="老司机带你熟练翻车的主页">
        首页
      </Layout>
    </Fragment>
  )
}

export default connect()(Index)
