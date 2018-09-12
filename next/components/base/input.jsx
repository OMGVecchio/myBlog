import { Fragment, PureComponent } from 'react'
import Head from 'next/head'

import classnames from 'classnames'

import style from 'static/styles/components/base/input.less'

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
      <Fragment>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} key="style-input" />
        </Head>
        <div
          className={classnames('_b-input', className, { block, 'is-filled': !this.checkEmpty(this.state.value) })}
          style={width ? { width: `${width}px` } : {}}
        >
          <div className="_b-input-box-wrap">
            <input
              value={this.state.value}
              type={type}
              onChange={this.valueChange}
              className="_b-input-box"
            />
          </div>
          <span className="_b-input-placeholder">
            {placeholder}
          </span>
        </div>
      </Fragment>
    )
  }
}

export default Input
