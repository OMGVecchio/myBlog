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
            <header className="main-header">
                <div className="header-wrap">
                    { Banner.getMenuHtml() }
                </div>
                <style jsx>{`
                    .main-header {
                        height: 65px;
                        width: 100%;
                        position: fixed;
                        z-index: 100;
                    }
                    .header-wrap {
                        background-color: #4054B2;
                        width: 100%;
                        height: 100%;
                    }
                `}</style>
            </header>
        )
    }
}
