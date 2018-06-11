import React, { PureComponent } from 'react'
import dynamic from 'next/dynamic'

import { Row, Col } from 'antd'

import Layout from 'components/layout'
import Markdown from 'react-markdown'

const AceEditor = dynamic(import('components/common/aceEditor'), {
  ssr: false
})
const CodeMirrorEditor = dynamic(import('components/common/codeMirrorEditor'), {
  ssr: false
})

class Compose extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editorState1: '',
      editorState2: ''
    }
  }
  onChange1 = (editorState) => {
    this.setState({
      editorState1: editorState
    })
  }
  onChange2 = (editorState) => {
    this.setState({
      editorState2: editorState
    })
  }
  render() {
    return (
      <Layout>
        <Row gutter={8}>
          <Col span={10}>
            <AceEditor lan="markdown" theme="twilight" onChange={this.onChange1} />
          </Col>
          <Col span={10} style={{ backgroundColor: '#fff', height: '400px' }}>
            <Markdown source={this.state.editorState1} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={10}>
            <CodeMirrorEditor lan="markdown" onChange={this.onChange2} />
          </Col>
          <Col span={10} style={{ backgroundColor: '#fff', height: '400px' }}>
            <Markdown source={this.state.editorState2} />
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Compose
