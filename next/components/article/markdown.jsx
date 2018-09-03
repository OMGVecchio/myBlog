import React, { Fragment, PureComponent } from 'react'
import Markdown from 'react-markdown'
import Head from 'next/head'

import style from 'static/styles/components/article/markdown.less'

class MarkdownWrap extends PureComponent {
  render() {
    const { source = '' } = this.props
    return (
      <Fragment>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} key="style-markdown" />
        </Head>
        <Markdown source={source} className="markdown-wrap" />
      </Fragment>
    )
  }
}

export default MarkdownWrap
