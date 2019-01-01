import React, { PureComponent } from 'react'
// import Markdown from 'react-markdown'
import marked from 'marked'
import hljs from 'highlight.js'

import style from '@/styles/components/article/markdown'

hljs.configure({
  tabReplace: '  ',
  classPrefix: 'hljs-',
  languages: ['CSS', 'HTML, XML', 'JavaScript', 'PHP', 'Python', 'Stylus', 'TypeScript', 'Markdown']
})
marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})

class MarkdownWrap extends PureComponent {
  render() {
    const { source = '' } = this.props
    const codeDom = marked(source)
    return (
      <div dangerouslySetInnerHTML={{ __html: codeDom }} className={style['markdown-wrap']} />
    )
  }
}

export default MarkdownWrap
