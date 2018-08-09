import React, { Fragment, PureComponent } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

import { Radio, Select, Switch, AutoComplete, Input, Button, Row, Col } from 'antd'

import Layout from 'components/layout'
import Markdown from 'components/article/markdown'
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
    isFullScreen: false,
    title: '',
    article: '',
    category: '',
    tags: []
  }
  setTitle = (e) => {
    this.setState({ title: e.target.value })
  }
  setCategory = (category) => {
    this.setState({ category })
  }
  save = () => {
    const {
      title,
      article,
      category,
      tags
    } = this.state
    xhr.post('/api/article', {
      article,
      title,
      category,
      tags
    })
  }
  tagManage = (tags) => {
    this.setState({ tags })
  }
  changeValue = (article) => {
    this.setState({ article })
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
      article,
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
              <Input placeholder="文章名" onChange={this.setTitle} style={{ width: '170px' }} />
              <AutoComplete placeholder="分类" onChange={this.setCategory} />
              <TagGroup onChange={this.tagManage} />
            </div>
            <Row className="compose-write-group" gutter={4}>
              <Col className="compose-write-panel" span={12}>
                {
                  editorType === 1
                    ? (
                      <CodeMirrorEditor
                        value={article}
                        lan={language}
                        onChange={this.changeValue}
                      />
                    )
                    : (
                      <AceEditor
                        value={article}
                        lan={language}
                        onChange={this.changeValue}
                      />
                    )
                }
              </Col>
              <Col className="compose-result-panel" span={12}>
                <Markdown source={article} />
              </Col>
            </Row>
          </div>
        </Fragment>
      </Layout>
    )
  }
}

export default Compose
