import Link from 'next/link'
import Head from 'next/head'
import Banner from 'components/common/banner'

import styles from 'static/styles/global.less'

export default({
    children,
    title = 'This is the default title'
}) => (
    <div className="main">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <style dangerouslySetInnerHTML={{ __html: styles }} />
        </Head>
        <Banner />
        <div className="main-content">
            <div className="content-wrap">
                {children}
            </div>
        </div>
        <style jsx>{`
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
