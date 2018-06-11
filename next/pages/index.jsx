import { Fragment } from 'react'
import Layout from 'components/layout'
import { connect } from 'react-redux'

import types from 'store/action/common'

const Index = ({
  dispatch,
  counter
}) => {
  const increase = () => {
    dispatch({
      type: types.INCREASE
    })
  }
  const styleTest = () => {
    const arr = []
    for (let i = 0; i < 100; i += 1) {
      arr.push((
        <div key={i}>
          number: {counter}
        </div>
      ))
    }
    return arr
  }
  return (
    <Fragment>
      <Layout>
        <div role="button" tabIndex={0} onClick={increase}>
          increase
        </div>
        {styleTest()}
      </Layout>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  const common = state.get('common')
  const counter = common.get('counter')
  return {
    counter
  }
}

export default connect(mapStateToProps)(Index)
