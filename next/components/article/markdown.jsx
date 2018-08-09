import React, { Fragment, PureComponent } from 'react'
import Markdown from 'react-markdown'

import style from 'static/styles/components/article/markdown.less'

class MarkdownWrap extends PureComponent {
  render() {
    const { source = '' } = this.props
    return (
      <Fragment>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Markdown source={source} className="markdown-wrap" />
      </Fragment>
    )
  }
}

export default MarkdownWrap
