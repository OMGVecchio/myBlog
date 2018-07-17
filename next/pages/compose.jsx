import React, { Fragment, PureComponent } from 'react'
import Markdown from 'react-markdown'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

import { Radio, Select, Switch, Row, Col } from 'antd'

import Layout from 'components/layout'
import fullScreen from 'utils/full-screen'

const AceEditor = dynamic(import('components/editor/ace'), {
  ssr: false
})
// const CodeMirrorEditor = dynamic(import('components/editor/codemirror'), {
//   ssr: false
// })

const { Option } = Select

class Compose extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editorType: 1,
      language: 'markdown',
      editorState: '',
      isFullScreen: false
    }
  }
  changeValue = (editorState) => {
    this.setState({
      editorState
    })
  }
  changeEditorType = (e) => {
    this.setState({
      editorType: e.target.value
    })
  }
  changeLanguage = (language) => {
    this.setState({
      language
    })
  }
  changeFullScreen = (isFullScreen) => {
    if (isFullScreen) {
      fullScreen.openFull()
    } else {
      fullScreen.closeFull()
    }
    this.setState({
      isFullScreen
    })
  }
  render() {
    const {
      editorType,
      editorState,
      language,
      isFullScreen
    } = this.state;
    return (
      <Layout title="老司机带你熟练翻车的编辑页">
        <Fragment>
          <div className={classNames({ 'full-screen': isFullScreen })}>
            <Radio.Group value={editorType} onChange={this.changeEditorType}>
              <Radio.Button value={1}>
                CodeMirror
              </Radio.Button>
              <Radio.Button value={2}>
                Ace
              </Radio.Button>
            </Radio.Group>
            <Select defaultValue={language} onChange={this.changeLanguage}>
              <Option value="markdown">Markdown</Option>
              <Option value="javascript">JavaScript</Option>
            </Select>
            <Switch defaultChecked={isFullScreen} onChange={this.changeFullScreen} />
            {
              editorType === 1
                ? (
                  <Row gutter={8}>
                    <Col span={10}>
                      {/* <CodeMirrorEditor
                        value={editorState}
                        lan={language}
                        onChange={this.changeValue}
                      /> */}
                    </Col>
                    <Col span={10} style={{ backgroundColor: '#fff', height: '400px' }}>
                      <Markdown source={editorState} />
                    </Col>
                  </Row>
                )
                : ''
            }
            {
              editorType === 2
                ? (
                  <Row gutter={8}>
                    <Col span={10}>
                      <AceEditor value={editorState} lan={language} theme="twilight" onChange={this.changeValue} />
                    </Col>
                    <Col span={10} style={{ backgroundColor: '#fff', height: '400px' }}>
                      <Markdown source={editorState} />
                    </Col>
                  </Row>
                )
                : ''
            }
          </div>
          <style jsx>{`
            .full-screen {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: gray;
              z-index: 1000;
            }
          `}
          </style>
        </Fragment>
      </Layout>
    )
  }
}

export default Compose
