'use strict'

// 暂时不做任何混淆，直接输出原图

const { promisify } = require('util')
const { resolve } = require('path')
const { readFile } = require('fs')
const sharp = require('sharp')

const { out } = require('../out')
const {
  canvasWidth,
  canvasHeight,
  sliceWidth,
  sliceHeight
} = require('../../../config/validator')

const readFileAsync = promisify(readFile)

module.exports = {
  async fullBackground() {
    try {
      const imgBuffer = await readFileAsync(resolve(__dirname, './pictures/clock.jpg'))
      // 获取切割后的背景
      const roundedCorners = Buffer.from(`
        <svg>
          <rect x="0" y="0" width="${sliceWidth}" height="${sliceHeight}" style="fill:rbg(0, 0, 0);opacity:0.6;"/>
        </svg>
      `)
      const imgFormat = await sharp(imgBuffer).resize(canvasWidth, canvasHeight).overlayWith(roundedCorners, { cutout: false }).jpeg()
      return imgFormat
    } catch(e) {
      out.error('验证码背景处理失败', e)
      return null
    }
  },
  async slicePicture() {
    try {
      const imgBuffer = await readFileAsync(resolve(__dirname, './pictures/clock.jpg'))
      // 获取被切割的模块
      const top = (canvasHeight - sliceHeight) / 2
      const left = (canvasWidth - sliceWidth) / 2
      const imgFormat = await sharp(imgBuffer).resize(canvasWidth, canvasHeight).extract({ top, left, width: sliceWidth, height: sliceHeight}).jpeg()
      return imgFormat
    } catch(e) {
      out.error('验证码滑动器处理失败', e)
      return null
    }
  }
}
