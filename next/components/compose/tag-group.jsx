import { Fragment, PureComponent } from 'react'

import { Tag, AutoComplete, Tooltip } from 'antd'

class TagGroup extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    tagList: []
  }

  state = {
    tags: [],
    inputValue: ''
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    this.setState({ tags })
    this.props.onChange(tags)
  }

  handleInputChange = (inputValue) => {
    this.setState({ inputValue })
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
      inputValue: ''
    })
    this.props.onChange(tags)
  }

  render() {
    const { tags, inputValue } = this.state
    const tagFilters = this.props.tagList.map(item => ({
      value: item,
      text: item
    }))
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
          {tags.length < 4 && (
            <AutoComplete
              placeholder="标签"
              dataSource={tagFilters}
              type="text"
              size="small"
              style={{ width: 100 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
            />)}
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
