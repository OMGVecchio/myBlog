import React, { PureComponent } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/markdown/markdown'

class textEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code: ''
    }
  }
  render() {
    const { lan, onChange } = this.props
    return (
      <div>
        <CodeMirror
          value={this.state.code}
          onChange={onChange}
          options={{ mode: lan }}
        />
      </div>
    )
  }
}

export default textEditor
