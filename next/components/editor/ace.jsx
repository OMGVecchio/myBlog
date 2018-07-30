import React, { PureComponent } from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/mode/markdown'
import 'brace/theme/twilight'
import 'brace/theme/xcode'

class Ace extends PureComponent {
  render() {
    const {
      lan = 'markdown',
      theme = 'twilight',
      height = '100%',
      width = '100%',
      onChange,
      className,
      value
    } = this.props
    return (
      <AceEditor
        value={value}
        mode={lan}
        theme={theme}
        onChange={onChange}
        className={className}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true
        }}
        fontSize={14}
        height={height}
        width={width}
      />
    )
  }
}

export default Ace
