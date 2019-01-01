import { PureComponent } from 'react'
import classnames from 'classnames'

import style from '@/styles/components/base/input'

class Input extends PureComponent {
  static defaultProps = {
    block: false,
    type: 'text',
    className: '',
    placeholder: '',
    defaultValue: '',
    width: '',
    onChange: () => {}
  }
  state = {
    value: ''
  }
  componentWillMount() {
    const { defaultValue } = this.props
    if (this.checkEmpty(this.state.value) && !this.checkEmpty(defaultValue)) {
      this.setState({ value: defaultValue })
    }
  }
  checkEmpty = v => typeof v === 'undefined' || v === ''
  valueChange = (e) => {
    const { value } = e.target
    this.props.onChange(value)
    this.setState({ value })
  }
  render() {
    const {
      block,
      type,
      className,
      placeholder,
      width = ''
    } = this.props
    return (
      <div
        className={classnames(style['_b-input'], className, { block, [style['is-filled']]: !this.checkEmpty(this.state.value) })}
        style={width ? { width: `${width}px` } : {}}
      >
        <div className={style['_b-input-box-wrap']}>
          <input
            value={this.state.value}
            type={type}
            onChange={this.valueChange}
            className={style['_b-input-box']}
          />
        </div>
        <span className={style['_b-input-placeholder']}>
          {placeholder}
        </span>
      </div>
    )
  }
}

export default Input
