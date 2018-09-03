import { Fragment } from 'react'
import Head from 'next/head'
import classnames from 'classnames'

import { Icon } from 'antd'

import style from 'static/styles/components/base/backtop.less'

const BackTop = ({
  show
}) => (
  <Fragment>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: style }} key="b-backtop-style" />
    </Head>
    <div className={classnames('_b-backtop', { visible: show })}>
      <Icon type="arrow-up" theme="outlined" />
    </div>
  </Fragment>
)

export default BackTop
