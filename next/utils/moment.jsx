export const digitalToChinese = (digital, isWeek = false) => {
  const d = parseInt(digital, 10) || 0
  const dcMap = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: isWeek ? '天' : '七',
    8: '八',
    9: '九'
  }
  return dcMap[d]
}

export const format = (timestamp, {
  sep = '-',
  showTime = true,
  showWeek = true
} = {}) => {
  const d = new Date(timestamp)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const dateText = `${year}${sep}${month}${sep}${date}`
  const day = d.getDay() === 0 ? 7 : d.getDay()
  const dayText = ` 星期${digitalToChinese(day, true)}`
  const hour = d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()
  const timeText = ` ${hour}:${minute}:${second}`
  return `${dateText}${showTime ? timeText : ''}${showWeek ? dayText : ''}`
}

class Moment {
  constructor(timestamp) {
    this.date = new Date(timestamp)
  }
  getYear() {
    return this.date.getFullYear()
  }
  getMonth() {
    return this.date.getMonth() + 1
  }
  getDay() {
    return this.date.getDay()
  }
  getDate() {
    return this.date.getDate()
  }
}

export default Moment
