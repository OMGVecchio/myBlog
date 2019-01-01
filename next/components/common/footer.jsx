import { Icon } from 'antd'
import classnames from 'classnames'

import style from '@/styles/components/common/footer'

const Footer = () => (
  <div className={classnames(style['main-footer'], 'text-center')}>
    <Icon type="copyright" />
    &nbsp;
    2018 Vecchio All rights reserved.
    &nbsp;
    渝ICP备18012936号
  </div>
)

export default Footer
