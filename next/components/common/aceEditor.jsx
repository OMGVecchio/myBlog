import React, { PureComponent } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/mode/markdown'
import 'brace/theme/twilight'
import 'brace/theme/xcode'

class textEditor extends PureComponent {
  render() {
    const { lan, theme, onChange } = this.props
    return (
      <div>
        <AceEditor
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
      </div>
    )
  }
}

export default textEditor
