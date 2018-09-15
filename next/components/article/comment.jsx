import { Fragment, PureComponent } from 'react'
import { Input, Button } from 'antd'

import Head from 'next/head'

import EmojiWrap from '~/article/emoji'

import style from '@/styles/components/article/comment.less'

const { TextArea } = Input

// mention ssr 有点问题，后面看看
// PureComponent 与 Functional 之间的抉择，此组件内部需要在某些操作时自更新，所以不能用依赖 props 更新的 Functional 吧
class CommentBox extends PureComponent {
  static defaultProps = {
    rows: 6,
    placeholder: '我有话说(暂时不支持 markdown 吧)',
    onChange: () => {}
  }
  state = {
    value: '',
    showEmoji: false
  }
  valueChange = (e) => {
    const { value } = e.target
    this.setState({ value })
    this.props.onChange(value)
  }
  selectEmoji = (code) => {
    // 不做 IE 这些的兼容了
    const { value } = this.state
    const commentDom = document.querySelector('.J-comment-textarea')
    const { selectionStart, selectionEnd } = commentDom
    const preLength = value.length
    const preStr = value.slice(0, selectionStart)
    const nextStr = value.slice(selectionEnd, preLength)
    const newValue = `${preStr}${code}${nextStr}`
    this.setState({
      value: newValue
    })
    this.props.onChange(newValue)
  }
  toggleEmoji = () => {
    this.setState({
      showEmoji: !this.state.showEmoji
    })
  }
  render() {
    return (
      <Fragment>
        <div className="component-comment">
          <Head>
            <style dangerouslySetInnerHTML={{ __html: style }} key="style-comment" />
          </Head>
          {/* 评论暂时就走简洁风，不用 ACE 这些了吧 */}
          <TextArea
            value={this.state.value}
            rows={this.props.rows}
            onChange={this.valueChange}
            placeholder={this.props.placeholder}
            className="J-comment-textarea"
          />
          <div className="comment-opt clearfix">
            <Button
              type="primary"
              className="fr"
              size="small"
              title="也还没时间做呢"
            >
              预览
            </Button>
            <Button
              onClick={this.toggleEmoji}
              className="fr"
              size="small"
            >
              Emoji
            </Button>
            <Button
              className="fr"
              size="small"
              title="还没时间做呢"
            >
              插入图片
            </Button>
          </div>
          { this.state.showEmoji && (
            <EmojiWrap onSelect={this.selectEmoji} />
          )}
        </div>
      </Fragment>
    )
  }
}

export default CommentBox
