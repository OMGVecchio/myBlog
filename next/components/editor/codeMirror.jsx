import React, { PureComponent } from 'react'
import CodeMirrorEditor from 'react-codemirror'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/markdown/markdown'

class CodeMirror extends PureComponent {
  render() {
    const {
      value,
      onChange,
      className,
      lan = 'markdown'
    } = this.props
    return (
      <CodeMirrorEditor
        value={value}
        onChange={onChange}
        className={className}
        options={{ mode: lan }}
        height="100%"
      />
    )
  }
}

export default CodeMirror
