import { Fragment, PureComponent } from 'react'
import { Icon } from 'antd'

import Head from 'next/head'

import xhr from '_/fetch'

import style from '@/styles/components/base/validator/canvas.less'

const CANVAS_WIDTH = 326
const CANVAS_HEIGHT = 160

class ValidatorCanvas extends PureComponent {
  static defaultProps = {
    close: () => {},
    dataUrl: '/api/validator/getData'
  }
  state = {
    offsetX: 0
  }
  componentDidMount() {
    this.controlBar.addEventListener('mousedown', this.barEventDown)
    document.addEventListener('mouseup', this.barEventUp)
    document.addEventListener('mousemove', this.barEventMove)
    this.updateCanvas()
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
  // 获取验证器数据
  fetchValidatorData = () => {
    xhr.get(this.props.dataUrl)
  }
  // 更新滑动数据
  updateCanvas = () => {
    this.setState({ offsetX: 0 })
    this.initBgCanvas()
    this.initSliderCanvas()
  }
  // 初始化 background canvas
  initBgCanvas = () => {
    const { bgCanvas } = this
    const { width, height } = bgCanvas
    const ctx = bgCanvas.getContext('2d')
    const bgImg = new Image()
    bgImg.src = '/images/cover/wallhaven-851_1538201484272.jpg'
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, width, height)
    }
  }
  // 初始化 slider canvas
  initSliderCanvas = () => {
    const sliderImg = new Image()
    sliderImg.src = '/static/imgs/xm/xm-1.png'
    sliderImg.onload = () => {
      this.sliderImg = sliderImg
      this.drawSliderCanvas()
    }
  }
  // 绘制滑动调
  drawSliderCanvas = () => {
    const { sliderCanvas, sliderCtx, sliderImg } = this
    const { width, height } = sliderCanvas
    const { naturalWidth, naturalHeight } = sliderImg
    const { offsetX } = this.state
    sliderCtx.clearRect(0, 0, width, height)
    sliderCtx.drawImage(sliderImg, 0, 0, naturalWidth, naturalHeight, offsetX, 25, 80, 100)
  }
  // 滑动器点击事件
  barEventDown = (e) => {
    this.barIsActive = true
    this.startMoveOffsetX = e.x
  }
  // 滑动器点击完成事件
  barEventUp = () => {
    this.barIsActive = false
  }
  // 滑动器移动事件
  barEventMove = (e) => {
    if (this.barIsActive) {
      const { x } = e
      let offsetX = x - this.startMoveOffsetX
      if (offsetX < 0) {
        offsetX = 0
      }
      if (offsetX > 276) {
        offsetX = 276
      }
      this.setState({ offsetX })
      this.drawSliderCanvas()
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
              <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="_b-validator-canvas" ref={this.getBgCanvas} />
              <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="_b-validator-canvas _b-validator-canvas-slider" ref={this.getCanvas} />
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
