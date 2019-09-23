import { Fragment, PureComponent } from 'react'
import classNames from 'classnames'

import Head from 'next/head'
import ValidatorCanvas from '~/base/validator/canvas'

import { noop } from '_'

import style from '@/styles/components/base/validator/index.less'

class Validator extends PureComponent {
  static defaultProps = {
    success: noop
  }
  state = {
    pointerRotateDegree: 0,
    canShowCanvas: false,
    hasCheckSuccess: false
  }
  componentDidMount() {
    // TODO 增加行为统计日志
    this.initDetectorLocation()
    this.addPointerMonitor()
  }
  componentWillUnmount() {
    this.removePointerMonitor()
  }
  // 获取监测器对象
  getDetector = (ref) => { this.detector = ref }
  // 根据弧度获取正度数
  getDegree = (radian) => {
    let realRadian = radian
    if (realRadian < 0) {
      realRadian += 2 * Math.PI
    }
    return realRadian / (Math.PI / 180)
  }
  // 绑定旋转指针侦测事件
  addPointerMonitor = () => document.addEventListener('mousemove', this.pointerMonitor)
  // 解绑旋转指针侦测事件
  removePointerMonitor = () => document.removeEventListener('mousemove', this.pointerMonitor)
  // 旋转指针侦测事件
  pointerMonitor = (e) => {
    const { x, y } = e
    const { x: circleX, y: circleY } = this.detectorLocation
    const degree = this.getDegree(Math.atan2(y - circleY, x - circleX))
    this.setState({ pointerRotateDegree: degree })
  }
  // 计算圆心坐标
  calculateCircleCenter = (x, y, width, height) => ({
    x: x + (width / 2),
    y: y + (height / 2)
  })
  // 初始化监测器圆心坐标
  initDetectorLocation = () => {
    const {
      x,
      y,
      width,
      height
    } = this.detector.getBoundingClientRect()
    const circleCenter = this.calculateCircleCenter(x, y, width, height)
    this.detectorLocation = {
      x: circleCenter.x,
      y: circleCenter.y
    }
  }
  showCanvas = () => {
    if (this.state.hasCheckSuccess) {
      return
    }
    this.setState({ canShowCanvas: true })
  }
  hideCanvas = () => this.setState({ canShowCanvas: false })
  // 行为验证成功后的处理
  checkSuccess = (...params) => {
    this.removePointerMonitor()
    this.setState({ hasCheckSuccess: true })
    this.props.success(...params)
  }
  detector = null
  detectorLocation = null
  render() {
    const {
      pointerRotateDegree,
      hasCheckSuccess,
      canShowCanvas
    } = this.state
    return (
      <Fragment>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} key="style-validator" />
        </Head>
        <div className={classNames('_b-validator', this.props.className || false)}>
          <div className={classNames('_b-validator-btn', { success: hasCheckSuccess || canShowCanvas })}>
            <div className="_b-validator-detector" ref={this.getDetector}>
              <div className="_b-validator-ring">
                {
                  hasCheckSuccess || canShowCanvas || (
                    <div className="_b-validator-pointer" style={{ transform: `rotate(${pointerRotateDegree}deg)` }} />
                  )
                }
              </div>
              <div className="_b-validator-dot" />
            </div>
            <div
              className="_b-validator-text text-overflow text-center"
              role="button"
              tabIndex="0"
              onClick={this.showCanvas}
            >
              { hasCheckSuccess ? '验证成功' : '点击按钮进行认证' }
            </div>
          </div>
          {
            canShowCanvas && (
              <ValidatorCanvas
                close={this.hideCanvas}
                success={this.checkSuccess}
              />
            )
          }
        </div>
      </Fragment>
    )
  }
}

export default Validator
