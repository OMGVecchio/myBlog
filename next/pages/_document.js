import React from 'react'

import Document, { Head, Main, NextScript } from 'next/document'

import globalStyle from '@/styles/global.less'

export default class MyDocument extends Document {
  render() {
    const { __NEXT_DATA__ } = this.props
    const { buildId } = __NEXT_DATA__
    const resourceTag = `?buildId=${buildId}`
    return (
      <html lang="en-US">
        <Head>
          <script src="/lib/adview_pic_cpc_cpm_cpa_guanggao_gg_ads_300x250.js" />
          <title>页面加载中~~~</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
          <link rel="stylesheet" href={`static/styles/css/antd.min.css${resourceTag}`} />
          <link rel="stylesheet" href={`static/styles/css/normalize.css${resourceTag}`} />
          <link rel="stylesheet" href={`static/styles/css/codemirror.css${resourceTag}`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
