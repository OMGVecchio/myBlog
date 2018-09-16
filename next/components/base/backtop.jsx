import { Fragment } from 'react'
import { Icon } from 'antd'
import classnames from 'classnames'

import Head from 'next/head'

import style from '@/styles/components/base/backtop.less'

const goTop = () => {
  window.scrollTo(0, 0)
}

// 需要绑定一个独立的滚动事件么
const BackTop = ({
  show
}) => (
  <Fragment>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: style }} key="style-backtop" />
    </Head>
    <div
      className={classnames('_b-backtop', { visible: show })}
      onClick={goTop}
      role="button"
      tabIndex={-1}
    >
      <Icon type="arrow-up" theme="outlined" />
    </div>
  </Fragment>
)

export default BackTop
