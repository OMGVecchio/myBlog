# 整体架构

+ Node 框架 koa2
+ Restful api
+ React 框架 next
+ Redux 中加入 sega + immutable （没用过，坑比较多。redux 还是太重了，在考虑轻量化的 mobx，我也想早点下班）
+ UI 框架 Antd（可考虑 Material-ui。想脱离现有的UI框架，用的组件其实很少，想都自己简单实现）
+ 鉴权机制 JWT(可考虑传统 Session)
+ 文件数据库 Lowdb(看时间可做兼容适配器，好替换)

## 考虑了下 material-ui，但 ssr 遇到点问题，正式工作前看转不转吧

## styled-jsx 在一般的编译器上都没代码提示，其实可以完全手写代码巩固基础的🙄。而且 css-in-js 本来就不需要做 css 的缓存吧，缓存的 js 就是呀。否则就是完全不走 css-in-js 咯

+ 当然就是不用 styled-jsx 咯，直接 style 文件后 dangerouslySetInnerHTML
+ import styles from './styles'; <style jsx>{styles}</style>

## styled-jsx 设置 scoped 后会在编译的元素的 className 里多带上一个 styled-id，但是当 className 加在一个引进的第三方的组件上时，编译出来的第三方组件的 className 上并不会带上 styled-id，但是 css 里的样式却对应着 styled-id

+ 不通过 styled-jsx，直接引入一个 css 文件然后 dangerouslySetInnerHTML 添加进去
+ styled-jsx 设置为 <style jsx global> 后不会带上 scoped id，但是该 style 下全部样式均为全局
+ [styled-jsx 设置为 <style jsx>，具体不需要加上 scoped id 的元素加上 :global 标识](https://github.com/zeit/styled-jsx#one-off-global-selectors)
+ 在不同文件用的 dbs 生成数据库文件，数据没同步，不知道是不是缓存策略的问题，先集中管理 db 看看(貌似是这个问题)
+ 图片上传，采用 koa-formidable，后面可以直接存储七牛云。现在编辑文章时上传的图片直接存 static 资源文件夹去了，感觉还是存缓存或者在前端保存，当整个文章提交时才最终保存比较好。否则会有太多无效文件，不便于管理，这种问题即使存七牛云也是会存在的
+ `component` 里 dangerouslySetInnerHTML 注入需要修改，否则列表循环引用同一个组件时，瞬间爆炸(可以把注入的 style 提取到 next/head 中，然后相同 style 取相同的唯一 key)
+ 项目存在 JavaScript heap out of memory，带排查
+ `calc(100vh - 300px)` 写在 less 里会编译成 -200vh，写在 style 中正常
+ 用 `react` 提供的 `onScroll`，通过回调参数 `event` 获取的 `event.target` 有 `scrollTop`属性。直接原生绑定的 'scroll' 没有直接该属性，但是可以通过 `event.scrollingElement.scrollTop` 获取到。`window.scrollY`(IE不支持)) 或者 `document.documentElement.scrollTop`(声明了DTD,未声明就`d.body.s`) 等属性获取(还有个 `pageYOffset`，兼容IE)
+ Router 的路由拦截有问题，详情见 /pages/_app.js 里的 Router 操作
+ `Uncaught TypeError: Cannot read property 'getIn' of undefined` `Mention SSR` 报的错？
+ `Emoji 下的 source 文件` 在 nodejs 中 require，`.js` 会报错，`.json` 可行。可能是解析式的错误格式导致的
+ `Antd TextArea` 组件能通过 ref 获取到原生的 dom 元素么？
+ 想提出一个 service 层做一些通用业务逻辑的封装
+ 代码太乱、复用性太差、样式文件写起来跟蛋疼，抽空整理下
+ [优化编译速度](https://zhuanlan.zhihu.com/p/42465502)
+ 可以尝试提出一个公共 hoc，做一些同步渲染时的操作，比如菜单路由在 node 端时就通过 pathname 确定好？Search kw 等同理 [这个是不是在 app.js 里就可以解决了？]
+ 系统中很多 immutable 问题，可能是在转换过程中出了问题，例如：在 store 的 index 中，我们在全局 initState 赋值时使用的 immutable 提供的 fromJS；所以第一次获取该值时可以用 immutable 提供的 toJS 转换成 JS 对象，但是我们转换后再修改，之后再添加到 immutable 类型的 state 中的时候，并没对新增的数据做 immutable 处理，所以下一次取出时直接就是 JS 对象，不在拥有 toJS 方法(这可能就是下列 Immutable 问题的所在)
+ 'true' == true // false
+ 父组件传给子组件的 props ，这个 props 影响子组件的 state，放在 componentWillComponent 和 componentWillReceiveProps(更合理？) 中处理，在这两个钩子中 setState 不会引起多余的 render【详情可建 /compose 里修改时的操作处理】
+ 为了做前端数据缓存，在各个类型的文章列表及文章管理页中通用，暂时是一次性加载完所有文章列表的，其实照理说本系统的所有文章总数并不会太大，及时一次性加载完所有文章列表数据影响也不会过甚
+ `/pages/compose.jsx` 修改模式下，第一次访问页面时的 editor，value 正常，但是显示出来 UI 有问题，看流程是渲染了两次，第一次时接收的值为空，所以 UI 呈现的为空，第二次接收父组件在 componentWillReceiveProps 时设置的正常值，但是 UI 还是第一次渲染时的样纸。可能是 diff 过程中一些因素造成的没有重新渲染？所以暂时对每个 editor 加一个简单 key 做重新渲染
+ 有些涉及到 cookie 等操作的过程，在服务端渲染的结果和客户端应当渲染出来的结构有差异，这个时候暂时可以先停止那个组件的 ssr[可以吧 loading 替换成更美观的过渡]。ex.编辑页的 editor、文章详情页用户信息的 BaseInput

### server 端配合 next 做路由整合, eg. ?articleId=123 => /articleId

## 项目中的问题

### Immutable

```javascript
const mapStateToProps = (state) => {
  const article = state.get('article')
  let articleList = article.get('articleList')
  if (articleList.toJS) {
    articleList = articleList.toJS()
  }
  return { articleList }
}
```

服务端渲染时，articleList 被转化成 js 对象，浏览器端时没转化，导致服务端渲染和浏览器端渲染结果不同报错？两端解析不同的原因，估计是自己写转换中间件的问题，但直接转 JS 对象虽然解决报错，但是 immutable 不就没结合起来了么 TODO

### Webpack

+ 在 JSX 中直接引入 CSS 会报错

```shell
  Module build failed: Error: No PostCSS Config found in:
```

但是在 JSX 直接加载 LESS，并在 LESS 中引入 CSS 是可行的

+ codemirror 的样式加载组件对应样式文件中无效，加在 global.less 中才行???
