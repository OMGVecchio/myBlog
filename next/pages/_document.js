import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="en-US">
                <Head>
                    <title>页面加载中...</title>
                    <link rel="stylesheet" href="/static/style/common/antd.min.css"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
