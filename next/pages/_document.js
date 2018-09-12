import React from 'react'

import Document, { Head, Main, NextScript } from 'next/document'

import globalStyle from '@/styles/global.less'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
          <title>页面加载中~~~</title>
          <script src="/lib/adview_pic_cpc_cpm_cpa_guanggao_gg_ads_300x250.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
