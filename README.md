# 个人博客

## [demo](https://vecchio.top)

## 选型

+ NodeJS 服务器框架 koa2 + Next
+ UI 框架 React Antd
+ redux-thnuk => redux-sage => mobx。redux 流程清晰，但即使有 thunk、saga、dva 等的调节，始终感觉用起来太繁琐，增加本小项目的复杂程度，写起来很不舒服，转手 mobx 试试水
+ 鉴权机制 JWT(可考虑传统 Session)
+ 文件数据库 Lowdb(看时间可做兼容适配器，好替换)

## Tips

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
+ server 端配合 next 做路由整合, eg. ?articleId=123 => /articleId
+ 由于 KOA 中用了许多 param 和 restful 的路由模式，在权限检测中，提出那些需要权限认证的接口是一件相当麻烦的事情，为了简化此步操作，暂时对需要权限认证的接口的路由增加一个额外可辨识的路径参数。其实这也是把 api 单独提成一个接口文件的好处，类似修改时相当方便
+ 之前渲染 markdown 用的 react-markdown，但还没找到 code 中高亮的方法；所以先使用 marked 渲染 markdown 文档，其中使用 highlight.js 高亮插件。其中高亮样式都在 node_modules/highlight.js/styles 下，现在用的 github 风格
+ getInitialProps 中采用 async/await 获取数据，避免了异步获取数据时，数据还未请求完便已经进行了页面跳转，导致空数据页面展示在用户面前，而后才填充 store 中的数据重新渲染页面

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

+ 在 `JSX` 中直接引入 `CSS` 会报错

```shell
  Module build failed: Error: No PostCSS Config found in:
```

但是在 `JSX` 直接加载 `LESS`，并在 `LESS` 中引入 `CSS` 是可行的

[应该是 `SSR` 造成的以上问题，可以在 `.babelrc plugins` 中加入 `inline-import` ✅](https://github.com/zeit/next.js/issues/544#issuecomment-325512576)

+ 一个 `LESS` 资源加载的怪问题

在一个动态加载的组件中引用了一个内联的 `style`，但是无法正常显示出来。当在全局的 `global` 样式文件中引入该样式文件，可以正常访问。是因为动态加载的缘故么？

+ 做文章时间戳排序时，直接 Array.sort() 或者依靠 Object 的 key 值，最新修改的文章总是会排在最前面

### ANTD
+ `antd` 的样式文件太大，暂时不知道如何自动化做按需加载。如果把所有的样式文件放在 document 中，按照当前的做法，我会把样式代码全内联到文档中，这样就无法在浏览器端做 `antd.min.css` 文件的缓存。考虑了几种方式：直接在 `link` 中外链 `antd.min.css` 的地址，但这样无法加时间戳，对后续的维护有一定问题，解决的方法其实也有，继承 `_document` 的主类，并获取 `buildId` 等关键指针加在资源地址中，但这样就代码同步性而言确实太不灵活了；第二种方案是可否提取一个公共组件，里面存放需要缓存的资源代码，但为了避免服务端渲染时每次都优先加在完这个组件，需要对这个组件做 `dynamic` 异步加载，此时就需要考虑延迟渲染的一些问题，需要额外操作弥补

### 服务端路由

为了展现更为优美的路由，例如：`/article?articleId=d4cc9350-a43c-11e8-aa26-efc93289f4d5` 变为 `/article/d4cc9350-a43c-11e8-aa26-efc93289f4d5`

+ 我们在 next 中跳转时，`<Link href="/article?articleId=X" as="/article/articleId">` 添加一个 as 属性即可

+ 但是第一次服务端渲染时，如果是 `/article/articleId`，渲染出来的 next 页面为 404，所以我们需要修改 nginx 或 node 端的特定路由，增加额外处理方式。本例是修改 handleRequest 的参数，需要注意的是 handleRequest 是处理所有 next 资源请求的入口方法，支持三个参数 (req, res, parsedUrl)，其中 parserdUrl 是形如 `{ pathname, query }` 的对象，如果不传 parsedUrl，自动注入 req 里的相关 变量；然后在 next 中执行 run(req, res, parsedUrl)，针对不同的请求类型 next 会有不同的处理函数，document 的请求会分配到 renderToHtml(req, res, path, query)【也可调用 next 实例的 render(req, res, path, query)】

### nginx 配置
+ 本系统同时启动 http 及 ws 端口服务，为了支持 wss，nginx 配置完 https 后额外增加属性项
```nginx.conf
# 如果请求头中有 Upgrade，就直接设置到响应头中，并把 Connection 设置为 upgrade，否则把 Connection 设置为 close
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}
server {
  xxxxx
  location / {
    xxxxx
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
  }
}
```

## 统计工具

### Google Analytics
+ gtag 替代 ga，新版与旧版类似，添加代码加载 JS，然后配置 dataLayer.push 触发各种统计事件
+ 单页应用需要 dataLayer.push('config', id, { page_path: path}) 更新配置
+ 有实时数据统计，各种来源、平台等数据分析
+ 接入 Search Console，通过 DNS 验证或 meta 等权限验证完成后，可以快捷的接入搜索，配合统计使用起来很棒

### 百度统计
+ 简单便捷，只需添加一段代码加载 JS，然后在管理后台配置相应转化规则即可，_hmt.push 可触发各统计事件
+ 支持统计代检查、SPA 统计等
+ 支持实时数据分析，网站数据分析量全，时间跨度比较长

## [状态管理](https://zhuanlan.zhihu.com/p/53599723)

### 常见思路
+ 常见思想 Flux、Redux 及 Mobx。Flux 与 Redux 类似，单项数据流，函数式编程，Redux 集中管理单个 Store，Mobx 偏向面向对象，与 Vuex 概念类似，观察监听自动更新
+ Redux-thunk 自由度高，代码量大；Redux-promise 与 Redux-thunk 类似，封装了一些逻辑简化操作，自由度稍差；他们在 action creator 中解决异步获取数据的逻辑，原理相对简单
+ Redux-saga 还原了 Redux 纯粹的 dispatch 和 reducer，它通过 generator 进行异步的副作用操作获取数据，流程简单，理解起来相对复杂，而且 saga、action 和 reducer 切换写起来很麻烦；dva 基于 Redux-saga，进行了封装，把 state、action、reducer、saga 等写在一个 JS 文件中统一出 model 概念，类似于 Vuex 的 module
+ MobX 哲学：任何源自应用状态的东西都应该自动地获得。偏向面向对象编程原理，封装而来的代码，感觉写起来会比较简单快捷

### redux-saga 转 mobx
+ 优缺点
+ mobx 知识点：observe、inject ，hoc ，可用于 function component
+ next.js：props.pageProps + hydrate ，服务器渲染改动；
+ 错误：Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()
+ 总结：转换过程中意识到 typescript 的重要性，若是最开始就采用 TS，虽然起步代码周期会比较长，但是后期维护改版会更顺畅；并且项目缺少单元测试，后期考虑重要功能加上。TODO：新增 TS 和 UT

## 样式加载
+ 最开始服务端在加载样式文件时有问题，所以都是手动 import style，然后内联添加进页面，antd 的样式也不是按需加载，同其他的一些样式直接加载的巨大的 css 文件， 现在直接用 withLess，配置按需加载，生成一个 style.chunk.css 文件，但是在开发环境样式没有热更新，这需要配置 extract-text-webpack-plugin，开环环境时 inline，线上时提取成一个独立 css 文件
+ ant 需要开启 “javascriptEnabled: true” 解决 ”Inline JavaScript is not enabled. Is it set in your options“
+ extract-text-webpack-plugin(支持拆分多个 css 文件) 和  mini-css-extract-plugin(支持拆分多个文件吗？，貌似支持依 JS 拆分，按需加载，需要运行在 webpack4 以上。官网写着，TODO：HMR support，暂时不支持热更新，只能 dev 时设置成 style-loader？)
+ cacheGroups 的作用
+ mini-css-extract-plugin 错误 “Conflicting order between”：[在不同 JS 中引入相同样式文件的先后顺序不同的警告](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/382)。是因为我不同文件引入的 antd 的插件顺序不同，导致自动引入的样式文件先后顺序不同？。[而且服务端渲染时需要换成其他 loader(null-loader or css-loader/locals)](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90)
+ 暂时在 next.config.js 中手动修改 dev 环境下的样式 loader，“style-loader” 代替 “mini-css-extract-plugin“。但是首次渲染在 dev 时样式白屏严重[因为样式是 JS 异步加载，且生成的内联样式展示出来的]，及时是生产环境，直接加载外链样式，仍旧会有样式改动的短暂闪动[因为样式文件也是通过 JS 异步加载，然后请求的 CSS 外链渲染出来的，样式并非同步渲染。而且样式中带 transition 属性，异步加载完成后属性变化导致动效明显。这样我去加一个首屏全局 loading？]附录：[CSS 机制:待考究](https://juejin.im/post/5b88ddca6fb9a019c7717096)
+ next.js 在加载样式时考虑了服务端的打包[不是很懂]和客户端的打包，改项目中的修改大都会针对服务端而言，否则仅仅是浏览器端的样式打包是很简单的。我最开始是通过 dangerouslySetInnerHTML 很蠢的往 html 中加入内联 style 或者直接 link 引入，保持服务器和浏览器一致。现在直接使用 withLess 加载 less 样式，css 的加载或者需要通过 withCss 打通？[还没尝试]。其中通过 'style-loader' 暂时开启 dev 环境的样式热更新

## styled-jsx(已删除)
+ `styled-jsx` 设置 `scoped` 后会在编译的元素的 `className` 里多带上一个 `styled-id`，但是当 `className` 加在一个引进的第三方的组件上时，编译出来的第三方组件的 `className` 上并不会带上 `styled-id`，但是 `css` 里的样式却对应着 styled-id
+ `styled-jsx` 设置为 `<style jsx global>` 后不会带上 `scoped id`，但是该 `style` 下全部样式均为全局，或者 [`styled-jsx` 设置为 `<style jsx>`，具体不需要加上 `scoped id` 的元素加上 `:global` 标识](https://github.com/zeit/styled-jsx#one-off-global-selectors)

## TODO

+ 添加项目 precommit 及 github-hook 等完成自动化部署
+ React 版本更新，及部分旧代码的更换
+ 数据由文件存储过渡到数据库
+ 完成用户模块
+ 适当考虑登录注册功能
+ 首屏加载时，异步加载的样式文件因为 transition 的动画会造成视觉上不良好的体验，所以暂时在客户端第一次渲染时加入一个全屏 loading【生产环境下应该没多大问题，但 dev 环境下第一次会有很大视觉延迟，需要把 loading 的样式文件单独内联渲染么？】
