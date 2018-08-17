export const digitalToChinese = (digital, isWeek) => {
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

export const format = (timestamp) => {
  const d = new Date(timestamp)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const day = d.getDay()
  return `${year}-${month}-${date} 星期${digitalToChinese(day, true)}`
}

class Moment {}

export default Moment
