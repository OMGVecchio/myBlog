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
        const chunks = menuData.map(item => (
            <li>
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
        // const { canvas } = this.refs
        // const ctx = canvas.getContext('2d')
        // for(let i in canvas) {
        //     console.log(i)
        // }
        // console.log(canvas.clientWidth, canvas.clientHeight)
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
