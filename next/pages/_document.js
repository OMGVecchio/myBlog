import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <title>页面加载中~~~</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
