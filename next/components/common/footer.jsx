import { Fragment } from 'react'
import { Icon } from 'antd'

const Footer = () => (
  <Fragment>
    <div className="main-footer text-center">
      <Icon type="copyright" />
      &nbsp;
      2018 Vecchio All rights reserved.
      &nbsp;
      渝ICP备18012936号
    </div>
    <style jsx>{`
      .main-footer {
        min-height: 70px;
        line-height: 70px;
        background-color: #4054B2;
        color: #fff;
      }
    `}
    </style>
  </Fragment>
)

export default Footer
