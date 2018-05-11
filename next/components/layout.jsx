import Link from 'next/link'
import Head from 'next/head'
import Banner from './banner'

export default({
    children,
    title = 'This is the default title'
}) => (
    <div className="main">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="/static/style/common/global.css" />
            <link rel="stylesheet" href="/static/style/common/antd.min.css" />
        </Head>
        <Banner />
        <div className="main-content">
            <div className="content-wrap">
                {children}
            </div>
        </div>
        <style>{`
            .main-content {
                background-color: gray;
                .content-wrap {
                    width: 970px;
                    background-color: purple;
                }
            }
        `}</style>
        <style jsx global>{`

        `}</style>
    </div>
)
