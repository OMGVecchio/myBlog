import '@/styles/components/base/loading.less'

const style = `
._b-loading {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f5;
  top: 0;
  left: 0;
  z-index: 99999999999999999;
}
._b-loading ._b-loading-wrap {
  position: relative;
  width: 150px;
  height: 150px;
}
._b-loading-border {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -75px;
  margin-top: -75px;
  border-style: solid;
  border-width: 0.2em 0.2em 0 0;
  border-color: currentColor transparent transparent currentColor;
  border-radius: 50%;
  -webkit-animation: animate 3s linear infinite;
          animation: animate 3s linear infinite;
  -webkit-animation-direction: normal;
          animation-direction: normal;
}
._b-loading-border-reverse {
  animation-direction: reverse;
  border-color: currentColor currentColor transparent transparent;
  border-width: 0.2em 0 0 0.2em;
  width: 70%;
  height: 70%;
  margin-left: -52.5px;
  margin-top: -52.5px;
}
._b-loading-circle {
  position: absolute;
  width: 50%;
  height: 0.1rem;
  top: 50%;
  left: 50%;
  display: block;
  border-radius: 50%;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
  -webkit-transform-origin: left;
          transform-origin: left;
}
._b-loading-circle::after {
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  content: '';
  width: 1em;
  height: 1em;
  background-color: currentColor;
  border-radius: 50%;
  box-shadow: 0 0 2em, 0 0 4em, 0 0 6em, 0 0 8em, 0 0 10em, 0 0 0 0.5em rgba(255, 255, 0, 0.1);
}
._b-loading-circle-reverse {
  -webkit-transform: rotate(-135deg);
          transform: rotate(-135deg);
}
@-webkit-keyframes animate {
  100% {
    -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
  }
}
@keyframes animate {
  100% {
    -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
  }
}
`

const Loading = () => {
  const style1 = {
    color: 'gold'
  }
  const style2 = {
    color: 'lime'
  }
  return (
    <div className="_b-loading">
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div className="_b-loading-wrap">
        <div className="_b-loading-border" style={style1}>
          <div className="_b-loading-circle" />
        </div>
        <div className="_b-loading-border _b-loading-border-reverse" style={style2}>
          <div className="_b-loading-circle _b-loading-circle-reverse" />
        </div>
      </div>
    </div>
  )
}

export default Loading
