import { PureComponent } from 'react'
import classnames from 'classnames'

import ValidatorCanvas from '~/base/validator/canvas'

import { noop } from '_'

import style from '@/styles/components/base/validator/index.less'

class Validator extends PureComponent {
  static defaultProps = {
    success: noop
  }
  state = {
    rotate: 0,
    showCanvas: false,
    checkSuccess: false
  }
  componentDidMount() {
    // TODO 增加行为统计日志
    this.initDetectorLocation()
    document.addEventListener('mousemove', this.pointerMonitor)
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.pointerMonitor)
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
  // 旋转指针侦测事件
  pointerMonitor = (e) => {
    const { x, y } = e
    const { x: circleX, y: circleY } = this.detectorLocation
    const degree = this.getDegree(Math.atan2(y - circleY, x - circleX))
    this.setState({ rotate: degree })
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
    if (this.state.checkSuccess) {
      return
    }
    this.setState({ showCanvas: true })
  }
  // 行为验证成功后的处理
  checkSuccess = (...params) => {
    this.setState({ checkSuccess: true })
    this.props.success(...params)
  }
  detector = null
  detectorLocation = null
  render() {
    return (
      <div className={classnames(style['_b-validator'], this.props.className || false)}>
        <div className={style['_b-validator-btn']}>
          <div className={style['_b-validator-detector']} ref={this.getDetector}>
            <div className={style['_b-validator-ring']}>
              <div className={style['_b-validator-pointer']} style={{ transform: `rotate(${this.state.rotate}deg)` }} />
            </div>
            <div className={style['_b-validator-dot']} />
          </div>
          <div
            className={classnames(style['_b-validator-text'], 'text-overflow', 'text-center')}
            role="button"
            tabIndex="0"
            onClick={this.showCanvas}
          >
            { this.state.checkSuccess ? '验证成功' : '点击按钮进行认证' }
          </div>
        </div>
        {
          this.state.showCanvas && (
            <ValidatorCanvas
              close={() => this.setState({ showCanvas: false })}
              success={this.checkSuccess}
            />
          )
        }
      </div>
    )
  }
}

export default Validator
