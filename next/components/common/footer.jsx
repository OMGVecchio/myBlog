import { Fragment } from 'react'
import { Icon } from 'antd'

const Footer = () => {
  console.log('footer is not finished')
  return (
    <Fragment>
      <div className="main-footer text-center">
        <Icon type="copyright" />
        2018 Vecchio. All rights reserved.
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
}

export default Footer
