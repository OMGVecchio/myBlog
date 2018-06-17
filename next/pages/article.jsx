import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'

import Markdown from 'components/article/markdown'

import Layout from 'components/layout'

class Article extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const test = '# asasd'
    return (
      <Layout>
        <Fragment>
          <div className="article-content">
            <Markdown source={test} />
          </div>
          <style jsx>{`
            .article-content {
              background-color: #fff;
            }
          `}
          </style>
        </Fragment>
      </Layout>
    )
  }
}

export default connect()(Article)
