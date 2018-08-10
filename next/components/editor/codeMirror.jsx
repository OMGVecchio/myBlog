import React, { PureComponent } from 'react'
import CodeMirrorEditor from 'react-codemirror'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'

class CodeMirror extends PureComponent {
  render() {
    const {
      value,
      onChange,
      className,
      height = '100%',
      opts
    } = this.props
    return (
      <CodeMirrorEditor
        value={value}
        onChange={onChange}
        className={className}
        height={height}
        {...opts}
      />
    )
  }
}

export default CodeMirror
