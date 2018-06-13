import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'

import Layout from 'components/layout'

class Article extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Layout>
        <Fragment>
          <div>
            article
          </div>
        </Fragment>
      </Layout>
    )
  }
}

export default connect()(Article)
