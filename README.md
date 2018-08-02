+ Node 框架 koa2
+ Restful api
+ React 框架 next
+ Redux 中加入 sega + immutable (没用过，坑比较多)
+ UI 框架 Antd(可考虑 Material-ui)
+ 鉴权机制 JWT(可考虑传统 Session)
+ 文件数据库 Lowdb(看时间可做兼容适配器，好替换)

### 考虑了下 material-ui，但 ssr 遇到点问题，正式工作前看转不转吧

### styled-jsx 在一般的编译器上都没代码提示，其实可以完全手写代码巩固基础的🙄。而且 css-in-js 本来就不需要做 css 的缓存吧，缓存的 js 就是呀。否则就是完全不走 css-in-js 咯
+ 当然就是不用 styled-jsx 咯，直接 style 文件后 dangerouslySetInnerHTML
+ import styles from './styles'; <style jsx>{styles}</style>

### styled-jsx 设置 scoped 后会在编译的元素的 className 里多带上一个 styled-id，但是当 className 加在一个引进的第三方的组件上时，编译出来的第三方组件的 className 上并不会带上 styled-id，但是 css 里的样式却对应着 styled-id
+ 不通过 styled-jsx，直接引入一个 css 文件然后 dangerouslySetInnerHTML 添加进去
+ styled-jsx 设置为 <style jsx global> 后不会带上 scoped id，但是该 style 下全部样式均为全局
+ [styled-jsx 设置为 <style jsx>，具体不需要加上 scoped id 的元素加上 :global 标识](https://github.com/zeit/styled-jsx#one-off-global-selectors)
