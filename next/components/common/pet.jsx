// 暂时没用

import { Fragment, PureComponent } from 'react'

const itachiUrl = '/static/imgs/itachi/single.png'
const crowUrl = '/static/imgs/itachi/crow.png'

class Pet extends PureComponent {
  componentDidMount = async () => {
    // canvas.addEventListener('click', (e) => {
    //   console.log(e)
    // })
    // canvas.addEventListener('mousemove', (e) => {
    //   console.log(e)
    // })

    this.init(this.canvas)
    await this.fetchResource()
    this.renderCanvas()
  }
  componentWillUnmount() {
    this.canvas = null
  }
  fetchResource = async () => {
    const crow = new Promise((resolve) => {
      const crowImg = new Image()
      crowImg.src = crowUrl
      crowImg.onload = () => {
        resolve(crowImg)
      }
    })
    const itachi = new Promise((resolve) => {
      const itachiImg = new Image()
      itachiImg.src = itachiUrl
      itachiImg.onload = () => {
        resolve(itachiImg)
      }
    })
    const imgs = await Promise.all([crow, itachi])
    this.$R = {
      crow: imgs[0],
      itachi: imgs[1]
    }
  }
  init = (canvas) => {
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    this.ctx = ctx
    this.rect = { width, height }
    this.center = { x: width / 2, y: height / 2 }
  }
  clear = (ctx, canvas) => {
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
  }
  buildItachi = (ctx) => {
    const imgWidth = 258
    const imgHeight = 398
    const { x, y } = this.center
    const xx = x - (imgWidth / 2)
    const yy = y - (imgHeight / 2)
    ctx.drawImage(this.$R.itachi, 0, 0, 258, 398, xx, yy, imgWidth, imgHeight)
  }
  buildCrow = (ctx, duration) => {
    const imgWidth = 97
    const imgHeight = 51
    const { x, y } = this.center
    const startX = x - (imgWidth / 2)
    const startY = y - (imgHeight / 2)

    const newX = startX - (duration * 50)
    const newY = startY - (duration * 50)
    ctx.drawImage(this.$R.crow, 0, 0, imgWidth, imgHeight, newX, newY, imgWidth, imgHeight)

    ctx.drawImage(this.$R.crow, 0, 0, imgWidth, imgHeight, newX, y, imgWidth, imgHeight)
  }
  // crowFactory = (ctx) => {
  //   const imgWidth = 97
  //   const imgHeight = 51
  //   ctx.drawImage(this.$R.crow, 0, 0, imgWidth, imgHeight, newX, newY, imgWidth, imgHeight)
  // }
  canvas = null
  rect = null
  $R = null
  center = { x: 0, y: 0 }
  renderCanvas() {
    let startTime
    const render = (curTime) => {
      if (!startTime) {
        startTime = curTime
      }
      const duration = curTime - startTime
      if (duration < 2000) {
        this.clear(this.ctx, this.canvas)
        this.buildCrow(this.ctx, duration / 1000)
        this.buildItachi(this.ctx)
        requestAnimationFrame(render)
      }
    }
    requestAnimationFrame(render)
  }
  render() {
    return (
      <Fragment>
        {/* <canvas width="600" height="600" id="pet" ref={(d) => { this.canvas = d }} /> */}
        <canvas width="0" height="0" id="pet" ref={(d) => { this.canvas = d }} />
        <style jsx>{`
          #pet {
            position: fixed;
            z-index: 10000;
            // width: 300px;
            // height: 300px;
            width: 0;
            height: 0;
          }
        `}
        </style>
      </Fragment>
    )
  }
}

export default Pet
