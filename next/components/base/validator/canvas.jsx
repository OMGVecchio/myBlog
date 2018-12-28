import { Fragment, PureComponent } from 'react'
import { Icon } from 'antd'

import Head from 'next/head'

import { noop } from '_'
import xhr from '_/fetch'

import style from '@/styles/components/base/validator/canvas.less'

import {
  canvasWidth,
  canvasHeight,
  sliceWidth
} from '../../../../config/validator'

class ValidatorCanvas extends PureComponent {
  static defaultProps = {
    close: noop,
    success: noop,
    dataUrl: '/api/validator/info'
  }
  state = {
    offsetX: 0
  }
  async componentDidMount() {
    await this.updateCanvas()
    this.controlBar.addEventListener('mousedown', this.barEventDown)
    document.addEventListener('mouseup', this.barEventUp)
    document.addEventListener('mousemove', this.barEventMove)
  }
  componentWillUnmount() {
    this.controlBar.removeEventListener('mousedown', this.barEventDown)
    document.removeEventListener('mouseup', this.barEventUp)
    document.removeEventListener('mousemove', this.barEventMove)
  }
  // 获取 dom 对象
  getBgCanvas = (canvas) => { this.bgCanvas = canvas }
  getCanvas = (canvas) => {
    this.sliderCanvas = canvas
    if (canvas) {
      this.sliderCtx = canvas.getContext('2d')
    }
  }
  getControlBar = (bar) => { this.controlBar = bar }
  // 对象集合
  bgCanvas = null
  sliderCanvas = null
  sliderCtx = null
  sliderImg = null
  controlBar = null
  barIsActive = false
  startMoveOffsetX = 0
  fullBackground = null
  slicePicture = null
  canMoveSlider = true
  challenge = null
  offsetY = 0
  // 获取验证器数据
  fetchValidatorInfo = async () => {
    const info = await xhr.get(this.props.dataUrl)
    if (info.success) {
      const { data } = info
      this.fullBackground = data.fullBackground
      this.slicePicture = data.slice
      this.challenge = data.challenge
      this.offsetY = data.offsetY
    }
  }
  // 更新滑动数据
  updateCanvas = async () => {
    await this.fetchValidatorInfo()
    this.setState({ offsetX: 0 })
    this.barIsActive = false
    this.canMoveSlider = true
    this.initBgCanvas()
    this.initSliceCanvas()
  }
  // 初始化 background canvas
  initBgCanvas = () => {
    const { bgCanvas } = this
    const { width, height } = bgCanvas
    const ctx = bgCanvas.getContext('2d')
    const bgImg = new Image()
    bgImg.src = this.fullBackground
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, width, height)
    }
  }
  // 初始化 slider canvas
  initSliceCanvas = () => {
    const sliderImg = new Image()
    sliderImg.src = this.slicePicture
    sliderImg.onload = () => {
      this.sliderImg = sliderImg
      this.drawSliceCanvas()
    }
  }
  // 绘制滑动调
  drawSliceCanvas = () => {
    const { sliderCanvas, sliderCtx, sliderImg } = this
    const { width, height } = sliderCanvas
    const { naturalWidth, naturalHeight } = sliderImg
    const { offsetX } = this.state
    sliderCtx.clearRect(0, 0, width, height)
    sliderCtx.drawImage(
      sliderImg, 0, 0, naturalWidth, naturalHeight,
      offsetX, this.offsetY, sliceWidth, naturalHeight
    )
  }
  // 滑动器点击事件
  barEventDown = (e) => {
    if (!this.canMoveSlider) {
      return
    }
    this.barIsActive = true
    this.startMoveOffsetX = e.x
  }
  // 滑动器点击完成事件
  barEventUp = async () => {
    if (this.barIsActive) {
      this.barIsActive = false
      this.canMoveSlider = false
      const resData = await xhr.post('/api/validator/token', {
        offset: this.state.offsetX,
        challenge: this.challenge
      })
      if (resData.success) {
        this.props.success({
          challenge: this.challenge,
          token: resData.data
        })
        this.props.close()
      } else {
        this.updateCanvas()
      }
    }
  }
  // 滑动器移动事件
  barEventMove = (e) => {
    if (this.barIsActive) {
      let offsetX = e.x - this.startMoveOffsetX
      if (offsetX < 0) {
        offsetX = 0
      }
      const criticalVal = canvasWidth - sliceWidth
      if (offsetX > criticalVal) {
        offsetX = criticalVal
      }
      this.setState({ offsetX })
      this.drawSliceCanvas()
    }
  }
  render() {
    return (
      <Fragment>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </Head>
        <div className="_b-validator-box-mask" role="button" tabIndex={0} onClick={this.props.close} />
        <div className="_b-validator-box">
          <div className="_b-validator-control">
            <div className="_b-validator-canvas-wrap">
              <canvas width={canvasWidth} height={canvasHeight} className="_b-validator-canvas" ref={this.getBgCanvas} />
              <canvas width={canvasWidth} height={canvasHeight} className="_b-validator-canvas _b-validator-canvas-slider" ref={this.getCanvas} />
            </div>
            <div className="_b-validator-control-bar">
              <div className="_b-validator-control-btn" ref={this.getControlBar} style={{ transform: `translateX(${this.state.offsetX}px)` }}>
                <Icon type={this.state.offsetX === 0 ? 'lock' : 'unlock'} />
              </div>
              {
                this.state.offsetX === 0 && (
                  <p className="_b-validator-control-tip">拖动左边滑块完成上方拼图</p>
                )
              }
            </div>
          </div>
          <div className="_b-validator-option">
            <Icon type="close-circle" onClick={this.props.close} />
            <Icon type="reload" onClick={this.updateCanvas} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ValidatorCanvas
