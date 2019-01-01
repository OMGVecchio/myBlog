import { PureComponent } from 'react'
import { Tag, AutoComplete, Tooltip } from 'antd'

import style from '@/styles/components/compose/tag-group'

// Tag 颜色集
const colors = [
  'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
]

class TagGroup extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    tagSource: [],
    defaultValue: []
  }
  handleClose = (removedTag) => {
    const tags = this.props.defaultValue.filter(tag => tag !== removedTag)
    this.props.onChange(tags)
  }
  handleInputConfirm = (value) => {
    let tags = this.props.defaultValue
    if (value && tags.indexOf(value) === -1) {
      tags = [...tags, value]
    }
    this.props.onChange(tags)
  }
  randomColor = () => colors[Math.ceil(Math.random() * 10)]
  render() {
    const tags = this.props.defaultValue
    const tagFilters = this.props.tagSource.map(item => ({
      value: item,
      text: item
    }))
    return (
      <div className={style['tag-group']}>
        {tags.map((tag) => {
          const isLongTag = tag.length > 10
          const tagElem = (
            <Tag
              color={this.randomColor()}
              key={tag}
              closable="true"
              afterClose={() => this.handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 10)}...` : tag}
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
            filterOption={(input, option) => {
              const { key } = option
              return new RegExp(`${input}`).test(key)
            }}
            onSelect={value => this.handleInputConfirm(value)}
            onBlur={value => this.handleInputConfirm(value)}
          />)}
      </div>
    )
  }
}

export default TagGroup
