import { Fragment } from 'react'
import Layout from 'components/layout'
import { connect } from 'react-redux'

import types from 'store/action/common'

import Button from '@material-ui/core/Button'

const Index = ({
  dispatch,
  counter
}) => {
  const increase = () => {
    dispatch({
      type: types.INCREASE
    })
  }
  return (
    <Fragment>
      <Layout>
        <div role="button" tabIndex={0} onClick={increase}>
          increase
        </div>
        <div>
          number: {counter}
        </div>
        <Button>
          asdas
        </Button>
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
