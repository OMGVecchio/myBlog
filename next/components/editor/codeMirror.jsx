import CodeMirrorEditor from 'react-codemirror'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'

const CodeMirror = ({
  value,
  onChange,
  className,
  height = '100%',
  opts,
  refHOC
}) => (
  <CodeMirrorEditor
    ref={(c) => {
      // 比较尴尬的一点是，其实如果只是用 ref 修改下 markdown 的文案
      // 好像只需要获取 codemirror 的 ref，响应后 ace 的自动也变化
      // 但这里总感觉有问题，肯定有问题，至少不能先加载 ace 了...后面再看吧
      if (c) {
        /* eslint-disable no-param-reassign */
        refHOC.ref = c.codeMirror
      }
    }}
    value={value}
    onChange={onChange}
    className={className}
    height={height}
    {...opts}
  />
)

export default CodeMirror
