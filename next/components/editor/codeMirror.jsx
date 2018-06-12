import React, { PureComponent } from 'react'
import CodeMirrorEditor from 'react-codemirror'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/markdown/markdown'

class CodeMirror extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  render() {
    const { value, lan, onChange } = this.props
    return (
      <CodeMirrorEditor
        defaultValue={value}
        value={this.state.value}
        onChange={onChange}
        options={{ mode: lan }}
      />
    )
  }
}

export default CodeMirror
