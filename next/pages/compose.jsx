import React, { Fragment, PureComponent } from 'react'
import Markdown from 'react-markdown'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

import { Radio, Select, Switch, AutoComplete, Button, Row, Col } from 'antd'

import Layout from 'components/layout'
import TagGroup from 'components/compose/tag-group'
import xhr from 'utils/fetch'
import fullScreen from 'utils/full-screen'

import style from 'static/styles/pages/compose.less'

const AceEditor = dynamic(import('components/editor/ace'), {
  ssr: false
})
const CodeMirrorEditor = dynamic(import('components/editor/codemirror'), {
  ssr: false
})

const { Option } = Select

class Compose extends PureComponent {
  state = {
    editorType: 1,
    language: 'markdown',
    editorState: '',
    isFullScreen: false,
    category: '',
    tags: []
  }
  setCategory = (category) => {
    this.setState({
      category
    })
  }
  save = () => {
    const {
      editorState,
      category,
      tags
    } = this.state
    xhr.post('//127.0.0.1:3000/api/compose/save', {
      article: editorState,
      category,
      tags
    })
  }
  tagManage = (tags) => {
    this.setState({ tags })
  }
  changeValue = (editorState) => {
    this.setState({ editorState })
  }
  changeEditorType = (e) => {
    this.setState({ editorType: e.target.value })
  }
  changeLanguage = (language) => {
    this.setState({ language })
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
      <Layout className="compose-page" title="老司机带你熟练翻车的编辑页">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Fragment>
          <div className={classNames('compose-panel-wrap', { 'full-screen': isFullScreen })}>
            <div className="compose-opt-group">
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
              <Switch className="switch-fullscreen" defaultChecked={isFullScreen} onChange={this.changeFullScreen} />
              <Button className="pull-right" onClick={this.save}>
                保存
              </Button>
            </div>
            <div className="compose-extra-group">
              <AutoComplete placeholder="分类" onChange={this.setCategory} />
              <TagGroup onChange={this.tagManage} />
            </div>
            <Row className="compose-write-group" gutter={4}>
              <Col className="compose-write-panel" span={12}>
                {
                  editorType === 1
                    ? (
                      <CodeMirrorEditor
                        value={editorState}
                        lan={language}
                        onChange={this.changeValue}
                      />
                    )
                    : (
                      <AceEditor
                        value={editorState}
                        lan={language}
                        onChange={this.changeValue}
                      />
                    )
                }
              </Col>
              <Col className="compose-result-panel" span={12}>
                <Markdown source={editorState} />
              </Col>
            </Row>
          </div>
        </Fragment>
      </Layout>
    )
  }
}

export default Compose
