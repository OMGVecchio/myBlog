import { PureComponent } from 'react'
import { Input, Button } from 'antd'
import classnames from 'classnames'

import EmojiWrap from '~/article/emoji'

import style from '@/styles/components/article/comment'

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
  getCommentDom = (commentDom) => { this.commentDom = commentDom }
  valueChange = (e) => {
    const { value } = e.target
    this.setState({ value })
    this.props.onChange(value)
  }
  selectEmoji = (code) => {
    // 不做 IE 这些的兼容了
    const { value } = this.state
    const { commentDom } = this
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
      <div className={style['component-comment']}>
        {/* 评论暂时就走简洁风，不用 ACE 这些了吧 */}
        <TextArea
          value={this.state.value}
          rows={this.props.rows}
          onChange={this.valueChange}
          placeholder={this.props.placeholder}
          className={style['J-comment-textarea']}
          ref={this.getCommentDom}
        />
        <div className={classnames(style['comment-opt'], 'clearfix')}>
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
    )
  }
}

export default CommentBox
