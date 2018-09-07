import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/mode/markdown'
import 'brace/theme/twilight'
import 'brace/theme/xcode'

const Ace = ({
  value,
  lan = 'markdown',
  theme = 'twilight',
  height = '100%',
  width = '100%',
  onChange,
  className,
  opts,
  refHOC
}) => (
  <AceEditor
    ref={(c) => {
      if (c) {
        /* eslint-disable no-param-reassign */
        refHOC.ref = c.editor
      }
    }}
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
    {...opts}
  />
)

export default Ace
