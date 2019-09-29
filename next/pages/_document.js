import React from 'react'

import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const { __NEXT_DATA__ } = this.props
    const { buildId = 'beta' } = __NEXT_DATA__
    const resourceTag = `?buildId=${buildId}`
    return (
      <html lang="en-US">
        <Head>
          <meta name="google-site-verification" content="GeLgoMUYk_oeb97r0KXI3Z-7BiTI4rwmCjf8oFZxy28" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148650768-1" />
          <script async src="https://hm.baidu.com/hm.js?d11f59bfb32e363b98275ff6244a836e" />
          <script async src="https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js" />
          <script src="/lib/adview_pic_cpc_cpm_cpa_guanggao_gg_ads_300x250.js" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="stylesheet" href={`/static/styles/css/normalize.css${resourceTag}`} />
          <link rel="stylesheet" href={`/static/styles/css/codemirror.css${resourceTag}`} />
          <link rel="stylesheet" href={`/static/styles/css/highlight.js.css${resourceTag}`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
