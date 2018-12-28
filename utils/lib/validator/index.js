'use strict'

// 暂时不做任何混淆，直接输出原图

const { promisify } = require('util')
const { resolve, basename } = require('path')
const { readFile } = require('fs')
const sharp = require('sharp')

const out = require('../out')
const traverse = require('../traverse')
const {
  canvasWidth,
  canvasHeight,
  sliceWidth,
  sliceHeight
} = require('../../../config/validator')

const readFileAsync = promisify(readFile)

const allValidatorPictures = []
traverse(resolve(__dirname, './pictures'), filePath => allValidatorPictures.push(filePath))

module.exports = {
  // 根据 x、y 偏移量以及划片大小生成验证码背景图
  async fullBackground(offsetX = 0, offsetY = 0) {
    try {
      const imgBuffer = await readFileAsync(resolve(__dirname, './pictures/clock.jpg'))
      // 获取切割后的背景
      const roundedCorners = Buffer.from(`
        <svg>
          <rect x="0" y="0" width="${sliceWidth}" height="${sliceHeight}" style="fill:rbg(0, 0, 0);opacity:0.6;"/>
        </svg>
      `)
      const imgFormat = await sharp(imgBuffer).resize(canvasWidth, canvasHeight).overlayWith(roundedCorners, {
        left: parseInt(offsetX, 10) || 0,
        top: parseInt(offsetY, 10) || 0,
        cutout: false
      }).jpeg()
      return imgFormat
    } catch(e) {
      out.error('验证码背景处理失败', e)
      return null
    }
  },
  // 根据 x、y 偏移量以及滑片大小生成验证码滑片图片
  async slicePicture(offsetX = 0, offsetY = 0) {
    try {
      const imgBuffer = await readFileAsync(resolve(__dirname, './pictures/clock.jpg'))
      // 获取被切割的模块
      const imgFormat = await sharp(imgBuffer).resize(canvasWidth, canvasHeight).extract({
        left: parseInt(offsetX, 10) || 0,
        top: parseInt(offsetY, 10) || 0,
        width: sliceWidth,
        height: sliceHeight
      }).jpeg()
      return imgFormat
    } catch(e) {
      out.error('验证码滑动器处理失败', e)
      return null
    }
  },
  // 在规定范围内获取随机偏移的 x
  randomOffsetX() {
    return (sliceWidth + Math.random() * (canvasWidth - 2 * sliceWidth)).toFixed(5)
  },
  // 在规定范围内获取随机偏移的 y
  randomOffsetY() {
    return (sliceHeight + Math.random() * (canvasHeight - 2 * sliceHeight)).toFixed(5)
  }
}
