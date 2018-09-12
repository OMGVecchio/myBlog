import { Fragment } from 'react'
import Head from 'next/head'

import CodeMirrorEditor from 'react-codemirror'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'

import style from 'static/styles/components/editor/codemirror.less';

const CodeMirror = ({
  value,
  onChange,
  className,
  height = '100%',
  opts,
  refHOC
}) => (
  <Fragment>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: style }} key="style-codemirror" />
    </Head>
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
  </Fragment>
)

export default CodeMirror
