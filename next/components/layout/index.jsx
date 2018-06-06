import Head from 'next/head'
import Header from 'components/common/header'
import Menu from 'components/common/aside'

import styles from 'static/styles/global.less'

export default ({
  children,
  title = 'Vecchio\'s Blog'
}) => (
  <div className="global-wrap">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </Head>
    <Header />
    <Menu />
    <div className="content-header">
      哈哈
    </div>
    <div className="main-content">
      <div className="content-wrap">
        {children}
      </div>
    </div>
    <style jsx>{`
      .content-header {
        height: 230px;
        padding-top: 65px;
        background-color: #4054B2;
      }
      .content-wrap {
        width: 970px;
        background-color: purple;
      }
    `}
    </style>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
    `}
    </style>
  </div>
)
