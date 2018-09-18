import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Radio, Switch, Input, Button, message } from 'antd'
import classNames from 'classnames'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import Layout from '~/layout'
import Markdown from '~/article/markdown'
import TagGroup from '~/compose/tag-group'
import Upload from '~/compose/uploader'

import xhr from '_/fetch'
import fullScreen from '_/full-screen'

import { fetchDetail } from '#/action/article'
import { fetchList } from '#/action/tag'

import style from '@/styles/pages/compose.less'

const AceEditor = dynamic(import('~/editor/ace'), { ssr: false })
const CodeMirrorEditor = dynamic(import('~/editor/codemirror'), { ssr: false })
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
    showPreview: false,
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
  componentDidMount() {
    this.autoSaveTimer = setInterval(async () => {
      // 后面需要严格区分新增和修改模式，有差异，暂且只对修改做响应
      // 后面可以单独存一个草稿库
      if (this.state.mode === MODE_MODIFY) {
        await this.save()
        message.success('自动保存成功')
      }
    }, 1000 * 60)
  }
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
  componentWillUnmount() {
    clearInterval(this.autoSaveTimer)
  }
  // 设置文章标题
  setTitle = e => this.setState({ title: e.target.value })
  // 设置文章描述
  setDesc = e => this.setState({ desc: e.target.value })
  // 设置文章标签
  setTag = tags => this.setState({ tags })
  // 设置文章封面
  setCover = (res) => {
    const { file = {} } = res
    const { response = {} } = file
    const { data = '' } = response
    this.setState({ cover: data })
  }
  // 设置文章主题内容
  setContent = article => this.setState({ article })
  // 设置编辑器种类
  setEditorType = e => this.setState({ editorType: e.target.value })
  // 设置全屏模式
  setFullScreen = (isFullScreen) => {
    if (isFullScreen) {
      fullScreen.openFull()
    } else {
      fullScreen.closeFull()
    }
    this.setState({
      isFullScreen
    })
  }
  // 设置是否显示预览
  setPreview = showPreview => this.setState({ showPreview })
  // 存储编辑器的 ref
  refHOC = { ref: null }
  autoSaveTimer = null
  // 保存文章
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
      ? '/api/auth/article'
      : `/api/auth/article/${articleId}`
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
  // 在编辑器中插入图片
  insertImage = (res) => {
    const { file = {} } = res
    const { response = {} } = file
    const { data = '' } = response
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
      const insertDoc = `${cursorColumn !== 0 ? '\n' : ''}![](${data})\n`
      insertValue.call(ref, insertDoc)
      focusLine.call(ref, cursorRow + 1, 0)
    }
  }
  render() {
    const {
      editorType,
      article,
      isFullScreen,
      showPreview
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
            <Radio.Group value={editorType} onChange={this.setEditorType}>
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
              action="/api/auth/upload/illustrati"
              onChange={this.insertImage}
            >
              <Button>插入图片</Button>
            </Upload>
            <Upload
              name="cover"
              showUploadList={false}
              action="/api/auth/upload/cover"
              onChange={this.setCover}
            >
              <Button>插入封面</Button>
            </Upload>
            <Switch className="switch-btn" defaultChecked={isFullScreen} onChange={this.setFullScreen} />
            <Switch className="switch-btn" defaultChecked={showPreview} onChange={this.setPreview} />
            <Button className="fr" onClick={() => this.save()}>
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
              defaultValue={this.state.tags}
              tagSource={this.props.tagList}
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
          <div className={classNames('compose-write-group clearfix', { 'show-preview': showPreview })}>
            <div className="compose-panel fl compose-write-panel">
              {
                editorType === 1 ? (
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
                    onChange={this.setContent}
                  />
                ) : (
                  <AceEditor
                    key={articleId && articleDetail[articleId]}
                    refHOC={this.refHOC}
                    value={article}
                    defaultValue={article}
                    onChange={this.setContent}
                    lan="markdown"
                  />
                )
              }
            </div>
            {
              showPreview && (
                <div className="compose-panel fl compose-result-panel">
                  <Markdown source={article} />
                </div>
              )
            }
          </div>
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
