import React, { PureComponent } from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/mode/markdown'
import 'brace/theme/twilight'
import 'brace/theme/xcode'

class Ace extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  render() {
    const {
      lan,
      theme,
      onChange,
      value
    } = this.props
    return (
      <AceEditor
        defaultValue={value}
        value={this.state.value}
        mode={lan}
        theme={theme}
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true
        }}
        fontSize={14}
        height="400px"
        width="100%"
      />
    )
  }
}

export default Ace
