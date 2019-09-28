import { Fragment } from 'react'
import { Icon } from 'antd'

import '@/styles/components/common/footer.less'

const Footer = () => (
  <Fragment>
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
