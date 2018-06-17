import React, { Fragment, PureComponent } from 'react'
import Markdown from 'react-markdown'

class MarkdownWrap extends PureComponent {
  render() {
    const { source = '' } = this.props
    return (
      <Fragment>
        <Markdown source={source} className="markdown-wrap" />
        <div className="markdown-wrap">
          <h1>asdsad</h1>
        </div>
        <style jsx>{`
          :global(.markdown-wrap) {
            :global(h1) {
              color: red;
            }
          }
          .code {
            color: #ff4081;
            line-height: 1;
            margin: 0 4px;
            font-size: 80%;
            padding: 3px 5px;
            border: 1px solid #eee;
            border-radius: 2px;
            word-wrap: break-word
          }
        `}
        </style>
      </Fragment>
    )
  }
}

export default MarkdownWrap
