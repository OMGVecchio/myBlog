import { PureComponent } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

import { Radio, Upload, Switch, Input, Button, Row, Col } from 'antd'

import Layout from 'components/layout'
import Markdown from 'components/article/markdown'
import TagGroup from 'components/compose/tag-group'

import xhr from 'utils/fetch'
import fullScreen from 'utils/full-screen'

import { fetchDetail } from 'store/action/article'
import { fetchList } from 'store/action/tag'

import style from 'static/styles/pages/compose.less'

const AceEditor = dynamic(import('components/editor/ace'), { ssr: false })
const CodeMirrorEditor = dynamic(import('components/editor/code-mirror'), { ssr: false })
const MODE_CREATE = 1
const MODE_MODIFY = 2

class Compose extends PureComponent {
  static async getInitialProps({ ctx }) {
    const { store, query } = ctx
    const { dispatch } = store
    const { articleId = '' } = query
    if (articleId) {
      await dispatch(fetchDetail(articleId))
    }
    await dispatch(fetchList())
    return { articleId }
  }
  static defaultProps = {
    tagList: [],
    articleDetail: []
  }
  state = {
    editorType: 1,
    isFullScreen: false,
    title: '',
    cover: '',
    article: '',
    desc: '',
    tags: [],
    // 撰写模式，分为 新增 和 修改
    mode: MODE_CREATE
  }
  // redux-sage 并不能在 getInitialProps 时同步完成
  // 在挂载前，子组件的 defaultValue 可以生效，但是 componentWillReceiveProps 不行(改成 value ?)
  // componentWillMount() {
  //   const { articleId, articleDetail } = this.props
  //   const detail = articleDetail[articleId]
  //   if (articleId && detail) {
  //     const {
  //       title,
  //       cover,
  //       article,
  //       desc,
  //       tags
  //     } = detail
  //     this.setState({
  //       title,
  //       cover,
  //       article,
  //       desc,
  //       tags,
  //       mode: MODE_MODIFY
  //     })
  //   }
  // }
  componentWillReceiveProps(props) {
    const { articleId, articleDetail } = props
    const detail = articleDetail[articleId]
    if (articleId && detail) {
      const {
        title,
        cover,
        article,
        desc,
        tags
      } = detail
      this.setState({
        title,
        cover,
        article,
        desc,
        tags,
        mode: MODE_MODIFY
      })
    }
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
  setCover = (res) => {
    const { file = {} } = res
    const { response = {} } = file
    const { data = '' } = response
    const imageUrl = `/images/cover/${data}`
    this.setState({
      cover: imageUrl
    })
  }
  // 存储编辑器的 ref
  refHOC = {
    ref: null
  }
  save = async () => {
    const {
      title,
      cover,
      article,
      desc,
      tags
    } = this.state
    const { dispatch, articleId } = this.props
    const url = this.state.mode === MODE_CREATE
      ? '/api/article'
      : `/api/article/${articleId}`
    await xhr.post(url, {
      title,
      cover,
      article,
      tags,
      desc
    })
    await dispatch(fetchList(true))
    await dispatch(fetchDetail(articleId))
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
  // 在编辑器中插入图片
  insertImage = (res) => {
    const { file = {} } = res
    const { response = {} } = file
    const { data = '' } = response
    const imageUrl = `/images/illustrati/${data}`
    if (data) {
      const { ref } = this.refHOC
      window.qa = ref
      let insertValue
      let focusLine
      let cursor
      let cursorRow
      let cursorColumn
      if (this.state.editorType === 1) {
        insertValue = ref.replaceSelection
        focusLine = ref.setCursor
        cursor = ref.getCursor()
        cursorRow = cursor.line + 1
        cursorColumn = cursor.ch
      } else {
        insertValue = ref.insert
        focusLine = ref.gotoLine
        cursor = ref.getCursorPosition()
        cursorRow = cursor.row
        cursorColumn = cursor.column
      }
      const insertDoc = `${cursorColumn !== 0 ? '\n' : ''}![](${imageUrl})\n`
      insertValue.call(ref, insertDoc)
      focusLine.call(ref, cursorRow + 1, 0)
    }
  }
  render() {
    const {
      editorType,
      article,
      isFullScreen
    } = this.state
    const {
      articleId,
      articleDetail
    } = this.props
    return (
      <Layout className="compose-page">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </Head>
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
            <Upload
              name="file"
              showUploadList={false}
              action="/api/upload/illustrati"
              onChange={this.insertImage}
            >
              <Button>
                插入图片
              </Button>
            </Upload>
            <Upload
              name="cover"
              showUploadList={false}
              action="/api/upload/cover"
              onChange={this.setCover}
            >
              <Button>
                插入封面
              </Button>
            </Upload>
            <Switch className="switch-fullscreen" defaultChecked={isFullScreen} onChange={this.changeFullScreen} />
            <Button className="fr" onClick={this.save}>
              保存
            </Button>
          </div>
          <div className="compose-extra-group">
            <Input
              value={this.state.title}
              style={{ width: '170px' }}
              placeholder="文章名"
              onChange={this.setTitle}
            />
            <TagGroup
              value={this.state.tags}
              tagList={this.props.tagList}
              onChange={this.setTag}
            />
            <Input.TextArea
              value={this.state.desc}
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
                      key={articleId && articleDetail[articleId]}
                      refHOC={this.refHOC}
                      value={article}
                      defaultValue={article}
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
                      key={articleId && articleDetail[articleId]}
                      refHOC={this.refHOC}
                      value={article}
                      defaultValue={article}
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
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const tag = state.get('tag')
  const article = state.get('article')
  let articleDetail = article.get('articleDetail')
  if (articleDetail.toJS) {
    articleDetail = articleDetail.toJS()
  }
  let tagList = tag.get('tagList')
  if (tagList.toJS) {
    tagList = tagList.toJS() || []
  }
  return { tagList, articleDetail }
}

export default connect(mapStateToProps)(Compose)
