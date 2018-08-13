import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

import { Radio, Switch, Input, Button, Row, Col } from 'antd'

import Layout from 'components/layout'
import Markdown from 'components/article/markdown'
import TagGroup from 'components/compose/tag-group'
import xhr from 'utils/fetch'
import fullScreen from 'utils/full-screen'

import { fetchList } from 'store/action/tag'

import style from 'static/styles/pages/compose.less'

const AceEditor = dynamic(import('components/editor/ace'), {
  ssr: false
})
const CodeMirrorEditor = dynamic(import('components/editor/codemirror'), {
  ssr: false
})

class Compose extends PureComponent {
  static async getInitialProps({ ctx }) {
    const { store } = ctx
    const { dispatch } = store
    dispatch(fetchList())
  }
  static defaultProps = {
    tagList: []
  }
  state = {
    editorType: 1,
    isFullScreen: false,
    title: '',
    article: '',
    desc: '',
    tags: []
  }
  setTitle = (e) => {
    this.setState({ title: e.target.value })
  }
  setDesc = (e) => {
    this.setState({ desc: e.target.value })
  }
  setTag = (tags) => {
    this.setState({ tags })
  }
  save = () => {
    const {
      title,
      article,
      desc,
      tags
    } = this.state
    const { dispatch } = this.props
    xhr.post('/api/article', {
      article,
      title,
      tags,
      desc
    })
    dispatch(fetchList(true))
  }
  changeValue = (article) => {
    this.setState({ article })
  }
  changeEditorType = (e) => {
    this.setState({ editorType: e.target.value })
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
      isFullScreen
    } = this.state
    return (
      <Layout className="compose-page">
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
              <Switch className="switch-fullscreen" defaultChecked={isFullScreen} onChange={this.changeFullScreen} />
              <Button className="pull-right" onClick={this.save}>
                保存
              </Button>
            </div>
            <div className="compose-extra-group">
              <Input
                style={{ width: '170px' }}
                placeholder="文章名"
                onChange={this.setTitle}
              />
              <TagGroup tagList={this.props.tagList} onChange={this.setTag} />
              <Input.TextArea
                className="article-desc"
                placeholder="文章简介"
                onChange={this.setDesc}
                autosize={{ minRows: 1, maxRows: 2 }}
              />
            </div>
            <Row className="compose-write-group">
              <Col className="compose-write-panel" span={12}>
                {
                  editorType === 1
                    ? (
                      <CodeMirrorEditor
                        value={article}
                        opts={{
                          options: {
                            mode: 'markdown',
                            lineNumbers: true
                          }
                        }}
                        onChange={this.changeValue}
                      />
                    )
                    : (
                      <AceEditor
                        value={article}
                        onChange={this.changeValue}
                        lan="markdown"
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

const mapStateToProps = (state) => {
  const tag = state.get('tag')
  if (tag) {
    let tagList = tag.get('tagList')
    if (tagList.toJS) {
      tagList = tagList.toJS()
    }
    return { tagList }
  }
  return { tagList: [] }
}

export default connect(mapStateToProps)(Compose)
