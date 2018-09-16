import { Fragment, PureComponent } from 'react'
import classnames from 'classnames'

import Head from 'next/head'

import style from '@/styles/components/base/linearprogress.less'

class LinearProgress extends PureComponent {
  static defaultProps = {
    visible: false,
    className: '',
    progress: null
  }
  getClassName = (progress) => {
    if (progress === null) {
      return 'indeterminate'
    }
    return 'determinate'
  }
  getWidthStyle = (progress) => {
    if (progress === null) {
      return {}
    }
    let showProgress = progress > 100 ? 100 : process
    showProgress = progress < 0 ? 0 : process
    return { transform: `scaleX(${showProgress / 100})` }
  }
  render() {
    const { visible, className, progress } = this.props
    return (
      <Fragment>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} key="style-linearprogress" />
        </Head>
        {
          visible && (
            <div className={classnames('_b-linearprogress', { [className]: !!className })}>
              <div className={classnames('_b-linearprogress_fill', this.getClassName(progress))} style={this.getWidthStyle(progress)} />
            </div>
          )
        }
      </Fragment>
    )
  }
}

export default LinearProgress
