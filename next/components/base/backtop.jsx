import { Icon } from 'antd'
import classnames from 'classnames'

import style from '@/styles/components/base/backtop'

const goTop = () => {
  window.scrollTo(0, 0)
}

// 需要绑定一个独立的滚动事件么
const BackTop = ({
  show
}) => (
  <div
    className={classnames(style['_b-backtop'], { [style.visible]: show })}
    onClick={goTop}
    role="button"
    tabIndex={-1}
  >
    <Icon type="arrow-up" theme="outlined" />
  </div>
)

export default BackTop
