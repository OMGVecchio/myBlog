import { Fragment } from 'react'
import { Icon } from 'antd'

import '@/styles/components/common/footer.less'

const Footer = () => (
  <Fragment>
    <div className="main-footer text-center">
      <Icon type="copyright" />
      &nbsp;
      2018-2020 Vecchio All rights reserved.
      &nbsp;
      <a
        href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        渝ICP备18012936号
      </a>
    </div>
  </Fragment>
)

export default Footer
