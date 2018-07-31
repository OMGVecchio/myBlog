import { Fragment, PureComponent } from 'react'

import { Tag, Input, Tooltip, Icon } from 'antd'

class TagGroup extends PureComponent {
  static defaultProps = {
    onChange: () => {}
  }

  state = {
    tags: [],
    inputVisible: false,
    inputValue: ''
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    this.setState({ tags })
    this.props.onChange(tags)
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { state } = this
    const { inputValue } = state
    let { tags } = state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    })
    this.props.onChange(tags)
  }

  saveInputRef = (input) => {
    this.input = input
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state
    return (
      <Fragment>
        <div className="tag-group">
          {tags.map((tag) => {
            const isLongTag = tag.length > 20
            const tagElem = (
              <Tag key={tag} closable="true" afterClose={() => this.handleClose(tag)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            )
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
          })}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: '#ffffff', borderStyle: 'dashed' }}
            >
              <Icon type="plus" />新标签
            </Tag>
          )}
        </div>
        <style jsx>{`
          .tag-group {
            margin-left: 5px;
            display: inline-block;
          }
        `}
        </style>
      </Fragment>
    )
  }
}

export default TagGroup
