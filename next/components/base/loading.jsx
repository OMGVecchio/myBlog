import '@/styles/components/base/loading.less'

const Loading = ({
  outterColor = 'lime',
  innerColor = 'gold'
}) => {
  const outterStyle = {
    color: outterColor
  }
  const innerStyle = {
    color: innerColor
  }
  return (
    <div className="_b-loading">
      <div className="_b-loading-wrap">
        <div className="_b-loading-border" style={outterStyle}>
          <div className="_b-loading-circle" />
        </div>
        <div className="_b-loading-border _b-loading-border-reverse" style={innerStyle}>
          <div className="_b-loading-circle _b-loading-circle-reverse" />
        </div>
      </div>
    </div>
  )
}

export default Loading
