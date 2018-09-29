import { Fragment } from 'react'
import { Icon } from 'antd'

import Head from 'next/head'

import styles from '@/styles/components/common/footer.less'

const Footer = () => (
  <Fragment>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </Head>
    <div className="main-footer text-center">
      <Icon type="copyright" />
      &nbsp;
      2018 Vecchio All rights reserved.
      &nbsp;
      渝ICP备18012936号
    </div>
  </Fragment>
)

export default Footer
