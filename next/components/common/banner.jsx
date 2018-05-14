import React, { PureComponent } from 'react'
import Link from 'next/link'

export default class Banner extends PureComponent {
    static menuData = [{
        label: 'haha',
        icon: 'hehe',
        href: 'xixi'
    }]
    static getMenuHtml = () => {
        const { menuData } = Banner
        const chunks = menuData.map((item, index) => (
            <li key={ index }>
                <Link href={ item.href }>
                    <span>
                        <i className={ item.icon } />
                        { item.label }
                    </span>
                </Link>
            </li>
        ))
        return (<ul>{ chunks }</ul>)
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="main-banner">
                <div className="banner-wrap" ref="canvas">
                    { Banner.getMenuHtml() }
                </div>
                <style jsx>{`
                    .main-banner {
                        height: 50px;
                    }
                    .banner-wrap {
                        background-color: skyblue;
                        width: 100%;
                        height: 100%;
                    }
                `}</style>
            </div>
        )
    }
}
