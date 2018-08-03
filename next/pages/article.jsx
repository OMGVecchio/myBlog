import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'

import Markdown from 'components/article/markdown'

import Layout from 'components/layout'

class Article extends PureComponent {
  static async getInitialProps() {
    console.log('--article--')
  }
  render() {
    const test = '# asasd\n# asasd\n# asasd\n# asasd\n# asasd\n# asasd\n# asasd\n# asasd\n# asasd\n# asasd\n# asasd\n# asasd\n'
    return (
      <Layout>
        <Fragment>
          <div className="article-content">
            <Markdown source={test} />
          </div>
          <style jsx>{`
            .article-content {
              background-color: #fff;
              border-radius: 4px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              padding: 35px;
              margin-top: -165px;
            }
          `}
          </style>
        </Fragment>
      </Layout>
    )
  }
}

export default connect()(Article)
