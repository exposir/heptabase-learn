<!--
- [INPUT]: 依赖 https://raw.githubusercontent.com/facebook/react/main/CHANGELOG.md 的原始内容加上最新的 Releases 版本说明
- [OUTPUT]: 本文档提供 React 官方版本的更新日志（全量）（中文翻译版）
- [POS]: 更新日志 模块的历史档案之一
- [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->

# React 更新日志

_(数据提取自 React 官方仓库与 Releases，并已翻译为中文)_

---

## 19.2.4 (2026年1月26日)

### React Server Components

- 为 Server Actions 增加更多 DoS 缓解措施，并加固 Server Components。([#35632](https://github.com/facebook/react/pull/35632))

## 19.2.3 (2025年12月18日)

### React Server Components

- 为 React Server Functions 增加额外的循环保护。(@sebmarkbage 在 [#35351](https://github.com/facebook/react/pull/35351))

## 19.2.2 (2025年12月11日)

### React Server Components

- 将 `react-server-dom-webpack/*.unbundled` 移动为私有的 `react-server-dom-unbundled`。(@eps1lon 在 [#35290](https://github.com/facebook/react/pull/35290))
- 修复 Server Functions 上的 Promise 循环与 `toString` 问题。(@sebmarkbage 和 @unstubbable 在 [#35289](https://github.com/facebook/react/pull/35289) 和 [#35345](https://github.com/facebook/react/pull/35345))

## 19.2.1 (2025年12月3日)

### React Server Components

- 将 React Server Component 的修复引入到 Server Actions 中。(@sebmarkbage [#35277](https://github.com/facebook/react/pull/35277))

## 19.2.0 (2025年10月1日)

阅读 [React 19.2 发布公告](https://react.dev/blog/2025/10/01/react-19-2) 以获取更多信息。

### 新的 React 特性

- [`<Activity>`](https://react.dev/reference/react/Activity)：一个能隐藏和恢复其子组件 UI 及内部状态的新 API。
- [`useEffectEvent`](https://react.dev/reference/react/useEffectEvent)：一个 React Hook，让你能将非响应式逻辑提取到 [Effect Event](https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event) 中。
- [`cacheSignal`](https://react.dev/reference/react/cacheSignal) (适用于 RSC)：让您知晓 `cache()` 的生命周期何时结束。
- [React 性能追踪 (Performance tracks)](https://react.dev/reference/dev-tools/react-performance-tracks)：会在浏览器开发者工具的 Performance 面板时间线上显示。

### 新的 React DOM 特性

- 现为 Web Streams 带来局部预渲染 (partial pre-rendering) 的恢复 (resume) API：
  - [`resume`](https://react.dev/reference/react-dom/server/resume)：将预渲染恢复为数据流。
  - [`resumeAndPrerender`](https://react.dev/reference/react-dom/static/resumeAndPrerender)：将预渲染恢复为 HTML。
- 现为 Node Streams 带来局部预渲染的恢复 API：
  - [`resumeToPipeableStream`](https://react.dev/reference/react-dom/server/resumeToPipeableStream)：将预渲染恢复为数据流。
  - [`resumeAndPrerenderToNodeStream`](https://react.dev/reference/react-dom/static/resumeAndPrerenderToNodeStream)：将预渲染恢复为 HTML。
- 更新了 [`prerender`](https://react.dev/reference/react-dom/static/prerender) API 以返回一个可以传递给 `resume` API 的 `postponed` 状态。

### 重要变更

- React DOM 现已对 Suspense 边界的展现（reveals）进行批处理，使之与客户端渲染行为保持一致。尤其在播放 Suspense 边界展示动画（如即将到来的 `<ViewTransition>` 组件）时更为明显。React 致力于尽可能达到如首次内容绘制 (FCP) 指标要求，在首次绘制前批处理尽可能多的显示操作。
- 为 Node.js 环境下的服务端渲染 API 增加了 Node Web Streams 支持 (`prerender`, `renderToReadableStream`)。
- 在 `useId` 生成的 ID 中采用下划线（`_`）替代了冒号（`:`）。

### 全部变更信息

#### React

- `<Activity />` 的研发历经多年，早于 `ClassComponent.setState` 时代。
- 将上下文（Context）字符串化为 "SomeContext" 而非 "SomeContext.Provider"。
- 在包含 `%o` 报错占位符情况下，提供 React 检测机制出错原因栈信息。
- 修复在 `popstate` 事件中导致 `useDeferredValue` 陷入无限循环的错误。
- 修复传递初始值给 `useDeferredValue` 时的一个 Bug。
- 修复通过 Client Actions 提交表单时发生的崩溃问题。
- 从脱水状态（dehydrated）恢复的 Suspense 边界再次挂起时，正确隐藏/按需展示其内容。
- 避免热重载 (Hot Reload) 期间大宽度组件树引发栈溢出。
- 多处优化了 Owner 与 Component 的堆栈展示。
- 新增 `cacheSignal`。

#### React DOM

- 在服务端渲染的内容被展现时，使 Suspense 字体相关加载操作变为阻塞态 (Block)。
- `useId` 生成的 ID 现使用下划线代替冒号。
- 当有 ARIA 1.3 属性使用时，移除对这方面的警告。
- 允许在需要提升 (hoistable) 的样式上应用 `nonce` 属性。
- 对于用作为 Container 的 React 所有节点而言，一旦包含文本即抛出警告。
- 在文本水化 (hydration) 发生不匹配的错误信息中，以 s/HTML/text 为准。
- 修复 `React.use` 套嵌在被 `React.lazy` 包裹的组件中所存在的 Bug。
- 在服务端渲染 API 选项中启用 `progressiveChunkSize` 支持。
- 修复服务端渲染期间在 Suspense 降级内容中存在深层嵌套 Suspense 的 Bug。
- 修复在渲染渲染时取消操作，而后再次挂起导致的假死问题。
- Node.js 服务端 SSR API 支持 Node Web Streams。

#### React Server Components

- 在实际渲染 `<img>` 与 `<link>` 之前预加载相关资源。
- 当开发环境试图去渲染用于生产环境特定元素时，在控制台记录错误日志。
- 修复 Server Functions 中返回临时引用对象（如 Client Reference）时导致的 Bug。
- 给 `filterStackFrame` 传递具体的行号和列号（line/column）。
- Turbopack Server References 现已支持异步模块 (Async Modules)。
- Webpack 新支持解析 .mjs 文件扩展名。
- 修复了一个误报的 Key 值丢失警告。
- 确保 `console.log` 按可预测的顺序输出。

#### React Reconciler

- [createContainer](https://github.com/facebook/react/blob/v19.2.0/packages/react-reconciler/src/ReactFiberReconciler.js#L255-L261) 与 [createHydrationContainer](https://github.com/facebook/react/blob/v19.2.0/packages/react-reconciler/src/ReactFiberReconciler.js#L305-L312) 在 `on*` 处理器之后调整了它们原有的参数次序，这主要是为了即将引入的新型实验性 API 而准备。

## 19.1.2 (2025年12月3日)

### React Server Components

- 将 React Server Component 的修复引入到 Server Actions 中。(@sebmarkbage [#35277](https://github.com/facebook/react/pull/35277))

## 19.1.1 (2025年7月28日)

### React

- 修复 Owner Stacks 以使其在 ES2015 `function.name` 语义下正常工作。([#33680](https://github.com/facebook/react/pull/33680) 作者 @hoxyq)

## 19.1.0 (2025年3月28日)

### Owner Stack

Owner Stack 是一个字符串，表示直接负责渲染特定组件的全部组件。你可以在调试时打印 Owner Stacks，或使用 Owner Stacks 增强报错浮层及其他开发者工具。Owner Stacks 仅在开发环境构建中可用。生产环境中的 Component Stacks 保持不变。

- Owner Stack 是一个仅限开发环境的堆栈追踪，用于帮助识别哪些组件导致了特定组件的渲染。它不同于 Component Stacks（后者展示导致错误的组件层级结构）。
- [captureOwnerStack API](https://react.dev/reference/react/captureOwnerStack) 仅在开发模式可用并返回一个 Owner Stack（如果可获取的话）。该 API 可用于增强错误浮层或在调试中记录组件的归属关系。

### React

- 增强了 Suspense 边界的支持，现在它可以在任何地方使用，包括客户端、服务端以及水化 (hydration) 期间。
- 通过改进水化调度优化机制，减少了不必要的客户端渲染。
- 提高了客户端渲染的 Suspense 边界的优先级。
- 通过在客户端渲染未完成的 Suspense 边界，修复了 fallback 状态冻结卡死问题。
- 通过优化 Suspense 边界的回退重试机制 (retries)，降低了垃圾回收 (GC) 的压力。
- 修复了因为被动副作用 (passive effect) 阶段未发生延迟而导致的错误的 "Waiting for Paint" 日志。
- 修复导致在开发模式下产生被展平处理 (flattened) 位置型子元素的 key 警告的回归问题。
- 更新使用了有效 CSS 选择器的 `useId`，将其格式从 `:r123:` 变更为 `«r123»`。
- 新增一条仅限开发模式的警告，用以提示用户在 `useEffect`、`useInsertionEffect` 以及 `useLayoutEffect` 中创建出了 null/undefined。
- 修复将仅供开发用的方法暴露到了生产版本里的 Bug。`React.act` 不再存在于生产包。
- 改善开发与生产环境在代码风格上的统一性，以便提升跟 Google Closure Compiler 等类似打包/绑定工具的兼容性。
- 改善 passive effect 的调度机制，借以产生更一致的释放时机 (task yielding)。
- 修复 React Native 在 OffscreenComponent 渲染期间启用 `passChildrenWhenCloningPersistedNodes` 时出现的问题断言。
- 修复通过 Portal 来进行的组件名称的解析问题。
- 对 dialog 元素添加对 `beforetoggle` 及 `toggle` 的事件支持。

### React DOM

- 修复了当 `href` 属性为空字符串时的双重告警提示。
- 修复 `getHoistableRoot()` 在把 Document 当作容器时不能正常运转的边缘情况。
- 移除了将 HTML 注释 (如 `<!-- -->`) 作为 DOM 容器的古老特性的支持。
- 添加对 `<select>` 标签内嵌套 `<script>` 与 `<template>` 标记的支持。
- 确保具备响应功能的图形 (responsive images) 作为 HTML 的形式加以预加载，而不是依靠 header 的途径。

### use-sync-external-store

- 在 `use-sync-external-store` 的 `package.json` 内增发了 `exports` 配置字段，以此配合不同情况下的入口加载诉求。

### React Server Components

- 新增 `unstable_prerender`，这是一个正在试验性当中的前沿 API，允许大家可以在服务器内部着手 React 服务端组件的相关预渲染流程。
- 修复在使用数据流期间遇到全局级出错时，若再次接到新的 chunk 获取后而导致流程死结卡死的问题。
- 修复 pending chunks（尚处于等待判定阶段的碎片）被二次结算归总进度的谬误现象。
- 添加在各类边缘函数 (edge environments) 内使用数据流 (streaming) 的相关支持。
- 添加在服务端指定发出自定义 error name 的相关支持，从而让这些出错名等详情信息得以顺利带到终端侧呈现并输出至控制台回放。
- 对服务端组件的数据连接流通格式做了升级裁撤，主要是摘除了用于提示暗示以及 console.log 方面的归属性 ID，因为这些步骤不存在实际执行完成的返回收益值。
- 在客户端的构建版本内，暴露出了可用于接管与应付各类环境配置内发生的服务器引用的 `registerServerReference`。
- 新添 `react-server-dom-parcel` 这一开发包，其职责主要是让服务端组件的整合方案覆盖接驳到 [Parcel 打包工具](https://parceljs.org/) 上。

## 19.0.1 (2025年12月3日)

### React Server Components

- 将 React Server Component 的修复引入到 Server Actions 中。

## 19.0.0 (2024年12月5日)

下面是所有的新特性、API 列表，弃用警告与突破性变更 (Breaking Changes)。阅读 [React 19 发布公告](https://react.dev/blog/2024/04/25/react-19) 与 [React 19 升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) 了解更多细节。

> 注意：为了让你能够平滑顺遂地向 React 19 过渡升级，官方之前已经提前特制发行了 `react@18.3`，这套发行方案大体上等同于 18.2 版本环境，但额外增加植入了一干为升级 19 做准备的相关的过期提示和相应的辅助手段。我们强行向所有人在迈向 19 之路前先过度至 18.3.1 来过滤排雷自身所有的潜藏问题。

### 新特性

#### React

- Actions: 如今允许 `startTransition` 注入异步函数支持。向 `startTransition` 传入的函数现在被称为 “Actions”。对于一条限定好了的 Transition 过渡流程来讲，可以在背景底色的静默过程中包裹涵盖容纳着一个又一个的有关变更状态性质的执行项，再在终点把最终渲染层表现呈现到同一 commit 阶段。同时其职权得到空前放大不只在于基础修改状态机，还可以实施请求数据等各项异步副总用层面的交互获取。并且它会挂等待整个事件闭环结束掉才真正意义上划下终点完成这个 Transition 过渡周期。不仅如此，整个能力赋予了用户在它尚处 pending 余威中时即可纳入对报错的处理机制亦或是支持更为流畅随心的前置性更新反馈 (optimistic updates)。
- `useActionState`: 新钩子，针对被纳入到 Transition 那部分之中的 Actions 做有序规划调度，并暴露出动作返回状况或者暂时的挂起停机状态 (pending state)。
- `useOptimistic`: 新钩子，专供那些当底部的 Transition 还未彻底翻篇收尾时就可以临时打出对应预期完成最终值呈现画面的前置操作。
- `use`: 打破陈规直接赋予我们在正常 render 执行流节点上去通读获取对应资源的超级新 API。可以接受 Promise 抑或着 Context。
- 把 `ref` 当 prop 使: Refs 这下算是彻底卸下了 `forwardRef` 所套给身上的各种规矩枷锁，回归作为一个平常化 prop 入参的身份。
- **Suspense 同级预热 (Suspense sibling pre-warming)**: 当一个组件被挂起 (suspends) 时，React 会即刻当场在不用非要傻等到其余并列同一树状分叉层上的全部亲兄弟都尽数把底交出的前提下，迅速地把最直近那个紧挨着的 Suspense 边界处设下的退还方案予以展现。而在这套底线托底招式登场了之后，React 反手还会再去单独挑开另外那一部分还没来得及露面的挂起同级别组件身上的懒加载探询申请指令好借机将这部分的预判拉长为所谓的 “预热” 准备 (pre-warm)。

#### React DOM 客户端 (React DOM Client)

- `<form> action` 属性支持: 表单的动作执行能够顺应无缝勾兑进 `useFormStatus` 全套体制。如果成功那系统就会自主帮忙复位。手动也可以借由新配给的 `requestFormReset` 接口做触发。
- `<button>` 与 `<input>` 的 `formAction` 属性。
- `useFormStatus`: 像是由老一辈的 Context 出具发货那般给予底下人员掌握住属于自己父项身位的表单进行状况信息的特快专递口子。
- 文档的 Metadata: 添加给相关诸位在组件树内嵌渲染元数据 (metadata tags) 的强劲支持，之后将被内部系统全数拎拔统一抬升进 `<head>` 总区域里去。
- Stylesheets 之支持: 为确保用户在没看到真章之前不去体验辣眼的白板，框架会自动管控所有的表单预加载样式单放置的先后，保障被依赖的相关组件 Suspense 前决断生效到位。
- 支持各种异步性质的执行脚本本随处安营扎寨，剩下的调度统筹包括剔除雷同均交付核心来做定夺。
- 对资源的早期加载赋能 (preloading resources): 重装上阵引入了 `preinit`、`preload`、`prefetchDNS`、`preconnect` 。

#### React DOM Server

- 为 SSR 推出了 `prerender` 跟 `prerenderToNodeStream` 加成，这俩不再犹如当年 `renderToString` 般草率结案，必须耐心等到该来的数据都出齐整了再去吐送最后的 HTML。

#### React Server Components

- RSC 自打上场起就一直是舆论争议与变革探索的风眼处，如今所有相关的 server components，server functions 全部定型划归于稳定阶段。

### 弃用项 (Deprecations)

- 被弃用的做法: 像以前那样通过直接调取 `element.ref` 即获取到其实源本身将被封为不齿而打上警告标签，因为现在早已名正言顺为等价于 `element.props.ref` 这条光明大道了。
- `react-test-renderer`: 将会被降为被嫌弃的状态，我们一律官方举荐去走诸位业界第三方的专门检测体系 (如 `@testing-library/react`)。

### 突破性变更 (Breaking Changes)

- 全新的 JSX 转换器已经是底线必须项了，以前那个老掉牙的被宣判无意义了。
- Render 里面若再爆发什么未能幸免接盘住的错误不再是简单粗暴的向上瞎吼重新摔出，取而代之的是通通汇报到 `window.reportError` 面板上了。并且对应提供了供客制化改装配置的 `onUncaughtError` 等。
- 移去: `propTypes` (直接在源码内抹杀了被承认价值，推荐请用 TypeScript)。
- 移去: 面向各类函数层面原有的 `defaultProps` 功能参数机制 (请直接依靠原生 ES6 参数)。
- 移去: 极其古老的针对类组件独有的上下文通信功能 `contextTypes`。
- 移去: 基于 string 下的手动式 refs，请改回通过回调方式。
- 移去: Module pattern factories (模块加工模式)。
- 移去: `React.createFactory` 古董。
- 移去: `react-test-renderer/shallow` 包装体。

#### React DOM

- 清退了 `react-dom/test-utils` (除了被扒出来放到 react 里面的 act 之外全部被清零)。
- 彻底斩草除根拿掉 `ReactDOM.render` 和 `hydrate`，由带有 root 字眼的最新一代并列对等的接口正式全部包办上位。
- `unmountComponentAtNode` 也没有了，通过根部挂载暴露出的接口执行销毁卸载。
- `findDOMNode` 也请通过正常的 Ref 层指路来拿捏住。

### 显著更迭 (Notable Changes)

- `<Context>` 可以被直白作为提供者标签本身了。
- 关于 ref 内对于拆卸回滚函数的清理收尾执行支持。
- 为 `<Activity>` 等待过程里的延时传接赋能增添最初身价初值的参数项保障。
- `StrictMode` 当中会有不一样的更进一步的要求检测动作，例如初次加载会被双倍唤回以及利用过往的首次记忆化进行复用查缺。
- 对第三方植入干涉渲染出来的外部 DOM 元素的强加限制管控的包容与纠正措施得以出台。

### TypeScript 的改变

那些大家最高频碰到的改动可以通过 `npx types-react-codemod@latest preset-19 ./path-to-your-react-ts-files` 来执行自动的代码迁移。

- 移去了过期的 TypeScript 形式描述：
  - `ReactChild` (现为: `React.ReactElement | number | string`)
  - `ReactFragment` (现为: `Iterable<React.ReactNode>`)
  - `ReactNodeArray` (现为: `ReadonlyArray<React.ReactNode>`)
  - `ReactText` (现为: `number | string`)
  - `VoidFunctionComponent` (现为: `FunctionComponent`)
  - `VFC` (现为: `FC`)
  - 挪进去了 `prop-types`: `Requireable`, `ValidationMap`, `Validator`, `WeakValidationMap`
  - 挪进去了 `create-react-class`: `ClassicComponentClass` 等等老物件。
- 不再允许 refs 内隐晦地返回数据了：refs 现在起名正言顺吸纳了 cleanup 清理闭环功能，再随便乱丢回非标准产物将会直接引发抱红。
- 强烈勒令 `useRef` 初始入参的要求：必须跟 `useState` 对齐，在首发定义处便宣告好。
- Refs 回归天生受控（可变）特性：之前时而僵硬不可逆的状态被拨乱反正，因为其跟不少必须人工出面强力介入改写 ref 记录集的诉求是背道而驰的。
- 严苛强悍的 `ReactElement` 类型核对：一旦元素被打上 `ReactElement` 的烙印，其 props 由往昔放羊式管理的 `any` 通通倒逼收紧落定为严格保守派的 `unknown`。
- 身处于 TypeScript 下的全局 JSX 命名空间宣告终结：改而全部统一口径从根源引用 `import { JSX } from 'react'`，以换来兼容天底下各大门派的协同作战。
- 更为优异智能的 `useReducer` 类型推导表现：它自己会推演出泛型参数了，大部分情况下终于不用你在那手动泛型塞东西了。

### 详细变更列表 (All Changes)

#### React

- 添加对异步 Actions 的支持。
- 添加 `useActionState()` hook 用来针对 Form Action 变更状况做出处理。
- 添加 `use()` API 以用于在 render (渲染阶段) 读取和消化关联数据源。
- 添加 `useOptimistic()` hook 来承接当异变请求尚在云端盘旋时界面就已经乐观且直白地前置性给到视觉成果展现的机制。
- 对 `useDeferredValue()` 给予了初值 (initialValue) 入参的特供保障。
- 支持 refs 作为普通 prop 的权利。
- 新添由于 `customElements` 所带来周边效应的全套支援。
- 加入 ref 清理函数 (cleanup function) 的功能支持。
- Sibling pre-rendering 被替换为了 Sibling pre-warming（同级节点预热处理）。
- 不再在根节点处重新抛出 (rethrow) 错误。
- 对多种任务处理队列的综合排期收容与离散统筹 (Batch sync discrete, continuous, and default lanes)。
- 将 `<Context>` 标签释义转为其等同于 `<Context.Provider>` 一说。
- _StrictMode_ 的调整：修复关于开发挂录信息流的问题，确保初始唤起时成双调配函数发生，确保 `componentWillUnmount()` 一定按时响应该有报更。
- 给予 `BigInt` 数字变量合规的展现途径。
- 移出多余的 `shouldYield` 推演导致在开发测试中出现误断的 Bug。
- 提供在传播普及 key 相关属性时不宜跟其他大股 props 一并混为一谈甩出的警报措施。
- 对生产线投产产物增加对应的 sourcemaps。
- Suspense 拖延拦截限值由老版的 500ms 下调改制成为更加凌厉的 300ms。
- 悬停挂起遇到 `React.Children` 时的专门优化反馈支援。
- 关于对渲染期频发不断触发变更进而落入无限死亡闭环循环体的侦测探察防御手段。
- 清除早早就不再被鼓励倡导遗留下来的诸如传统字符串型 refs，老式历史沉疴里的 Legacy Context 等杂碎污垢。

#### React DOM

- 添设了涵盖处理表单递交诉求用的各类 Form Actions 后援力量。
- 提供能洞穿并掌握上一次表单运作现状机要详情的 `useFormStatus()` hook。
- 支持文档级里的 Metadata。提供了包含 `preinit`, `preinitModule`, `preconnect`, `prefetchDNS`, `preload`, 以及 `preloadModule` 等一系列超强火力掩护性质的 API 武器。
- 为 `<img>` 以及 `<link>` 专门设置了 `fetchPriority` 用来表明请求的优先序列。
- 给了 SVG 那边的 `transformOrigin` 属性大开绿灯。
- 提供对于弹出遮盖类元素 API 的专属支援 (Popover API)。
- 加入 `inert` 属性后援支持。
- 加入 `imageSizes` 及 `imageSrcSet` 控制权。
- 会严保如果 `react` 跟 `react-dom` 大体版本彼此对不上的话定会强行撂挑子摔脸报错。
- 一路过关斩将拔去了所有像什么 `render`, `hydrate`, `findDOMNode`, `unmountComponentAtNode` 之类的老一套法宝，以后统统由客户端体系包圆执行。
- 剔掉撤编了落后时代的遗址 `test-utils` 。

#### React DOM Server

- **React Server Components 稳定版正是出笼**。
- 支持 Server Actions 范畴里的种种作为。
- 在 SSR 端面的修正与优化：加入外部运行时负责保障二进制内容的透明化；补上了防止 Node 18 环境下的缓存区块惨遭平白清空的修正；增加了在面对串流取消或掐断时候能果断止损直接流控腰斩掉当前流式产出的反应；强化了对 `<style>` 和 `<script>` 文本内容进行逃逸字符操作，使得不用碰 `dangerouslySetInnerHTML` 这种危险东西亦可。

---

## 18.3.1 (2024年4月26日)

- 从 `react` 包中导出 `act`。

## 18.3.0 (2024年4月25日)

此版本等同于 18.2 版本，但额加了一些为升级 React 19 作准备的针对已被弃用的 API 的警告以及其它的必要改动。
参阅 [React 19 升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) 了解更多细节。

### React

- 支持在 `this.refs` 上的写入操作以辅助执行将旧有的 string ref 作出转换的 codemod 修改。
- 在非 StrictMode (严格模式) 外使用已经被弃用的 `findDOMNode` 及 Legacy Context 也会发出红字警告。
- 对于各种依然使用了即将作废的手段诸如 `test-utils` 方法、字符串型 refs (`string refs`)、函数式组件身上的 `defaultProps` 等等的发出警告。
- 警告在延展 (`spreading`) props 过程时带着 `key` 的行径。

### React DOM

- 警告废除 `unmountComponentAtNode` 及 `renderToStaticNodeStream`。

## 18.2.0 (2022年6月14日)

### React DOM

- 向 `onRecoverableError` 提供 component stack (组件级调用栈) 作为第二个参入。
- 修复注入水化 (`hydrating`) 至 `document` 当中产生不匹配时最终会导致白屏的问题。
- 修复 Suspense 所引发的不实水化不匹配错报 (false positive hydration errors)。
- 修复在 Safari 浏览器下置入 iframe 后原本被拦截忽略的 `setState` 表现失常的问题。

### React DOM Server

- 疏通了把服务端错误详情知会给到客户侧端的机制渠道。
- 赋予了在腰斩 HTML 流 (aborting the HTML stream) 时附加给出判定中止真实原因的可能性。
- 将生成的 HTML 中包含存在的多余无关充数的文本隔断符尽扫而空。
- 限制 `<title>` 元素内部再套嵌更为复杂的子组件（为符合浏览器原本具备自身的规矩约束）。

### Server Components (实验性质)

- 添加在构建 Server Components 时对 `useId()` 特性的后备支援。

## 18.1.0 (2022年4月26日)

### React DOM

- 修复 UMD 格式下关于 `react-dom/client` 莫名的虚假警报警红。
- 修复 `suppressHydrationWarning` 让其在生产线上也照旧正常工作。
- 修复因为使用 Suspense 而导致让 `componentWillUnmount` 一次调用被响了两回的异样。
- 修复一些在切换过度期间的变迁动量 (transition updates) 惨遭漠视丢弃。
- 修复使用 `useDeferredValue` 期间传入进去并没有利用记忆化 (unmemoized) 包裹的对象作为值由于没挡住而掉进死循环旋涡的问题。
- 保障遇到展示展现 Suspense 回退方案 (fallbacks) 时限流截流策略 (throttling) 生效得当。
- 修剪 `useEffect` 里关于死结无限调取 `setState` 所遗落的警告反馈机制。
- 提醒如果在执行着 `useInsertionEffect` 过程中胆敢进行重设 `setState` 的危险举动将会得到无情警告。
- 保证引发水化出错事件的背后因由肯定会得到披露和显示。

### React DOM Server

- 为 `bootstrapScriptContent` 的输出文本加上严格地脱轨过滤 (escaping) 把关措施。
- 极大提升 `renderToPipeableStream` 实战打底下的性能拉取表现。

### Use Subscription

- 其原有内核及运作实现完全被新秀 `use-sync-external-store` 接应替代。

## 18.0.0 (2022年3月29日)

包含一大票重磅特性轰炸，包括全新的并发工作制 (Concurrent Features) 以及相关配套钩子。
详情细阅 [React 18 发布公告](https://reactjs.org/blog/2022/03/29/react-v18.html)。

### 新特性

#### React

- **`useId`**: 全新引入用于穿透横跨服务端跟客户端两边依旧确保绝对唯一性、且不受两边环境出入偏差所搞出水化警告的独特标签生成钩子。这点在用着 18 新一代随心随意不看次序穿插而送数据的流式服务端渲染环境的处境下，对开发组件库跟解决残疾友好保障规范（A11y API）可谓极其管用。
- **`startTransition` 和 `useTransition`**: 让你为状态调整贴上“无需加急跑火”的标贴。没法被标记到的默认全体视同紧急事件。借着这点差序，急促的事情（比如更新正在敲字的输入框）能够毫不客气去生吞活剥、插队、打断抢过那些被标作“无需加急跑火”的部分（例如加载一个耗时的搜索列表）的所有运行资源。
- **`useDeferredValue`**: 从另外一个角度教你把视图上非紧急部分延缓压后再慢慢画的钩子。乍一看看着像传统做法“防抖 (debouncing)”，实则赢面大过后者诸多：一来根本没锁死等待多久，只等首批抢戏的部分登场罢便当即开干；其二哪怕被抓过去补画那画的过程随时遇到新的动作也随时可以停机让路。
- **`useSyncExternalStore`**: 这个让外部集权库能在面对 React 各路风风火火的并发大军突袭压榨时，能够锁死靠一肩挑起采取同步刷新来强制抗下以确保存储安全不出差错的新机制钩子。它是用于对接任何React生态体系外的各种状态数据方案而设下的官方钦定荐用通道，自此跟外部联系无需再依赖凑活着用老一套 `useEffect` 强顶了。
- **`useInsertionEffect`**: 为开发打造 CSS-in-JS 工具这帮人专属破局而供出来的专门应对如何解决高频猛刷时临时加塞式注入样式的难题钩子。没涉猎此领域的寻常开发基本上是用不着的。它的下场介入时机死夹在 DOM 刚改动完但各项版面大小效应结果统统还处于未可知还未拿来被计算出来的真空缝隙当中。

#### React DOM 客户端 (React DOM Client)

最新的几个把关坐阵 API 已搬家去由 `react-dom/client` 里签发出了：

- **`createRoot`**: 创建根元素、调用 `render` 还有负责做最后的 `unmount` 新掌门，用来接班踢除原有的 `ReactDOM.render` 的存在。不在它手底下的话，18系那一套全新特质一个也用不了。
- **`hydrateRoot`**: 为应付由服务端吐出来的家底作客户端接应重组工作 (hydrate) 特设的新接口，用于取缔 `ReactDOM.hydrate` 并联诀全新的 DOM Server 阵容登场。同样没它罩着就使唤不了 18 的各类全新特性红利。
  两者都备有了 `onRecoverableError` 的防震纠错捕虫网，遇到渲染期间或拼骨重建下万一栽跟头时还能挣扎记点错误痕迹到记录档案底下。

#### React DOM Server

也搬家大挪移到了 `react-dom/server` 发号施令且自带对各种 Streaming 形态下的 Suspense 支持能力了：

- **`renderToPipeableStream`**: 管线级的数据串流通路 (Nodejs系环境专用)。
- **`renderToReadableStream`**: 大陆前沿风光无限好用的各类 Edge 前哨哨塔级别的运算机专供接口（Deno 跟 Cloudflare Workers 类别）。

另外现有的 `renderToString` 虽存无废但极力劝阻继续把守着用。

### 弃用项 (Deprecations)

下面一排统统列入到被抛弃不被欢迎行列，甚至要是去碰还会引发回退到用 17 老派手法并招致骂名警告：

- `ReactDOM.render`
- `ReactDOM.hydrate`
- `ReactDOM.unmountComponentAtNode`
- `ReactDOM.renderSubtreeIntoContainer`
- `ReactDOMServer.renderToNodeStream`

### 突破性变更 (Breaking Changes)

#### React

- **全自动排期打包 (Automatic batching)**: 现在系统有它自己更为激进的一套不放水通通抓来一把干脆利落统一打包刷新计算的智能规划手段借此减免大量吃空饷浪费的过度渲染情形，少数如真须不落这一套的人士可另辟捷径外包裹上 `flushSync` 作为回避护盾。
- **变本加厉的严控死防之严格模式 (Stricter Strict Mode)**: React未来会支持把卸载过的组件再挂起时完整拼起它当时原样的超级机制，所以此次18专门在发开模式下手起刀落在每次遭遇组建挂靠上任后的同一秒立马又给先剥下复而重又安上面板并回写其状况的狂暴压力测试检验（只测首次那一下），若在此轮鞭挞下您的作品折戟沉沙，或许该把此项测试模式（Strict Mode）关停至整改完工再议为主。
- **彻底收紧了 `useEffect` 的准发刻度表**: 之前一直都是个摸瞎式的开脱状态，而今一旦因例如轻击鼠标或者是敲死某按键此等真人口中落定的单响行为 (discrete user input) 触发更新，其后跟上的 effect 会确保同步得到不留情面的一波清扫出台动作。
- **对水化偏离更加刻薄无情**: 一旦因为水化两边字数不符引发的偏差，以前还能靠修修补补试图蒙混过关将单个子节删除或是凭空加上来将就着两端看起来长得一样对付过去的做法被彻底宣布为无效且危险（杜绝潜在窃密安全风险等），现在直白上升为彻底推翻大包大揽发配回退交给近处 Suspense 降维使用客户端重新干拔强刷的地步了。
- **绝对步调划一的 Suspense 架构枝桠**: 如果遇上中途折腰还未长成建制完全便半死不活地掉队到要转入靠挂起停机的组件，框架选择绝不把它这一路零散破碎烂摊烂肉拉入伙还搞乱各种状态，直接将此批劣品完全作废斩断且耐心等待所有幕后的漫长运作直到完工之后再彻头彻尾地在另起炉灶的地方无阻塞浏览器前提下来场干干净净地原班重演戏码。
- **给使用 Layout Effects 搭配 Suspense 扫清顽疾**: 往复拉扯陷入 Suspense 时被吃掉的版面空间数据，今后能在拨云见日后借由卸去和重建这些属于版面级别的 effects 保证给大盘再拉升测量出分毫不差之果。
- **新的基础环境要求底线门槛**: 老旧得连 `Promise` `Symbol` 和 `Object.assign` 都配不出的大型浏览器（特别点名 Internet Explorer）再也容纳不了，想上船请自给自足套好垫脚的 polyfill 鞋垫。

### 显著更迭 (Notable Changes)

- 挂不上去组件被退货个 `undefined` 的情形官方现在表示理解予以通融接收不予强制发难报错了。
- 使用 `act` 现在改为主动报名认领项 (opt-in)，因为若只是弄端到端长征测试老弹出来属实折腾没必要。
- 再也不为针对卸载组件上空跑 `setState` 一事唠叨碎语，那所谓容易因此导致泄露内存的警告已被扫平作罢。
- 在严格模式双重鞭打过堂下之前总会贴心塞耳朵帮各位吞掉一份雷同重复的 `console logs` 的做派由于被外界觉得云里雾里容易让人错判已被终结，今后大家一律都能看到只是第二次过堂时颜色将被染灰并赋予了直接一脚踹走统统不看的功能选项而已。

### 详细变更列表 (All Changes 摘录)

- 引进分离了非紧急和急行军两派兵符权力的 `useTransition` 同 `useDeferredValue` 调控双煞手段。
- 引入供大家使用的新一代 `createRoot` 及对应专为水化重塑再起的 `hydrateRoot` 门户接口。
- 为 `<option>` 支持能够承接其非字符串类型后代 (children)，前提必须要自带写明 `value` 项即可。
- 加入一波对实验性质的并发调度 `useMutableSource` 以及解决一系列各类挂载和卸货、边界问题处理以及部分抛错漏洞的防御填充方案等（略，全版细节极度详尽但主要影响已被提炼至主更新通告内）。

## 17.0.2 (2021年3月22日)

### React DOM

- 移出一条不再生效的依赖，解决引起跨域隔离引发的 `SharedArrayBuffer` 警报问题。

## 17.0.1 (2020年10月22日)

### React DOM

- 修缮在 IE11 里的崩溃疑难杂症。

## 17.0.0 (2020年10月20日)

今天，我们正式发布了 React 17！
**[关于 React 17 及其升级方案，敬请详查 React 官方博客。](https://reactjs.org/blog/2020/10/20/react-v17.html)**

### React

- 加入 `react/jsx-runtime` 和 `react/jsx-dev-runtime` 作为 [新型 JSX 编译方案](https://babeljs.io/blog/2020/03/16/7.9.0#a-new-jsx-transform-11154-https-githubcom-babel-babel-pull-11154) 的后盾加成。
- 把原生的报错栈还原组合成了 component stacks 形式。
- 首允在 Context 里明说 `displayName` 让报错层栈展现更明确。
- 把 `'use strict'` 从 UMD 大包裹文件体里拔去防止向外污染。
- 将对网页重定项跳转的操作切断并摒走 `fb.me` 的指路手段。

### React DOM

- 事件托管体系正式辞去了挂靠于 `document` 本尊的做法，全面移交挂载于 roots 层级。
- 保证会在执行任何下一阶的 effects 第一时间先把所有在身的陈旧 effects 脱掉收尾清理。
- 放开 `useEffect` 把 cleanup 垃圾回扫任务下行放到背面的同步列阵异步消化。
- 对表述聚焦、失焦情境采用了更现代化的 `focusin` / `focusout` 取代以往。
- 让各类带 `Capture` 之流的捕获型事件全部贴合浏览器原生的截取阶段。
- 移去了老派虚构充数去伪造关于 `onScroll` 事件会冒泡泡的作秀场。
- `forwardRef` 或 `memo` 不小心弄出个 `undefined` 产出来时如今予以报错制止。
- 全线砍掉 event pooling (事件池回收共享再发配) 方案。
- 在构建渲染里拿掉一切在 Native Web 界无关紧要的干涉内务代码件。
- 在 root 着陆之期便尽数一并吸附好一切挂牌登记有案的 event listeners。
- 关禁闭在两层双效检查（DEV 下严格模式触发两次 render）中的第二道流程内对 console 的不必要聒噪打印。
- 给未立牌坊还瞎起误导人作用的野方子 `ReactTestUtils.SimulateNative` 正式发警牌劝退警告。
- 私有的暗室私属变量通通改换了避开冲突新名头。
- 取消掉专门向发开环境中调用测算速率 (User Timing API) 的把戏。
- 在严格模式中就算那些不沾 Hooks 因由的老派对象，也送进双层考堂再溜一遍（double-render）走起。
- 开发测试其间要是调用了 `ReactDOM.flushSync` ，虽不挡着但是给吃一通警告板子先。
- 为键盘敲击触发事件下特意搭配送到了一并附上的 `code` 属件属性。
- 给播放 `<video>` 加入了能阻挠外界别有用心第三方劫持播放能力的 `disableRemotePlayback` 新防御配置。
- 为 `<input>` 填补加设了对应其呼出小键盘控制面板样式倾向指点的 `enterKeyHint` 强力辅助。
- 若只布 `<Context.Provider>` 而不去下 `value` 数值配置则降下警告雷罚惩治。
- 修掉一系列在受控以及非受控的输入之间胡乱跳脱所致引发的大段不知所云报错。
- `onTouchStart`、`onTouchMove`、及 `onWheel` 当起消极抗拒（passive）之位。
- 修正补缺关于 `onBeforeInput` 输出 `event.type` 没摸准门道胡乱投送的情景。
- 解决渲染扎入进各类暗盒组件 (shadow root) 内水土不服的问题。
- 接管并代为效劳好 `onSubmit` 和 `onReset` 发送及复盘清空这类表单核心事件分发机制。

### React DOM Server

- 使唤起 `useCallback` 的规条在 Server 端输出层面保持跟 `useMemo` 平起平坐。
- 缝补上要是某些不识趣的函数组件崩塌爆抛后可能外泄的内里状态等不该给的机要。

### Concurrent Mode (Experimental / 实验性质)

- 给各类新加入前头带有 `unstable_` 头名的试验型接口全线大换血翻改及纠错等。（因属实验性，略去详述）

---

## 16.14.0 (2020年10月14日)

### React

- 支持 [崭新的新型 JSX 编译改版机制](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)。

## 16.13.1 (2020年3月19日)

### React DOM

- 修复在不受技术支持的早期古老 legacy 模式 Suspense 之下 effect 没落地的打扫扫尾活问题。
- 取消对于各类像 `componentWillReceiveProps` 在内的古典大杂烩渲染旧例里面关于跨组件强刷的警告单发送。

## 16.13.0 (2020年2月26日)

### React

- 当你非要不知死活非在 string ref 上头纠结搞不能为未来 codemod 支持的操作时怒发警告牌。
- 将 `React.createFactory()` 宣判退役下放警告。

### React DOM

- 一旦动到 `style` 引发了令人掉下巴的各类未知交错碰撞必加塞发警告。
- 借别人组件正自发干活刷新时跑去别人那给下马威更新它数据时也必定警告伺候着。
- 打上 `unstable_createPortal` 劝退符。
- 根治了即便把门窗堵死 (即设了 disabled 的按钮) 甚至路过一抹风 (`onMouseEnter`) 它也能触发的怪事。
- 保证 `shouldComponentUpdate` 老人家哪怕在 `StrictMode` 下也可被使唤两回测试验真伪。
- 取消 `dangerouslySetInnerHTML` 必须还得去无端附庸强套 `toString()` 转型的恶俗癖好。
- 在报错栈中加入越来越多有价值的关键拼图协助破案找错。

## 16.12.0 (2019年11月14日)

### React DOM

- 解决了一套系统搞出多个 root 据点分叉后被动效果 (`useEffect`) 会被生生截胡掉失效的问题。

## 16.11.0 (2019年10月22日)

### React DOM

- 斩除在一个嵌套交缠容器内被触发 `mouseenter` 后，竟然鬼使神差一响出两回声波的不良问题。
- 正式将带有 `unstable_` 实验名声头衔的 `createRoot` 等老掉牙代号下架注销，并在前沿实验性版本通道内正名为去掉实验标号抬头上座。

## 16.10.x 及 16.9.0 概览

_(React 16.10 至 16.9.0 期间涵盖部分功能修复与底层调整，要点列出如下)_

- 修复 `useEffect` 及 `useContext` 的内存占用遗漏和异常缓存引发的问题。
- 添加支持在开发者工具扩展界面直接大肆改绑操弄 `useState` 以及拨动和开启控制 Suspense 能力开关的做法。
- `<React.Profiler>` 这位侦查小探长就此闪亮落户到位，协助专为测量大面积组件耗时情况等各项探底活动效力。
- 给大名鼎鼎并惹了数不清风波的生命周期函数们 (`UNSAFE_componentWillMount` 等等) 全部发上 `UNSAFE_` 黄牌头衔彻底警告拉黑化隔离。
- 取消不支持对 `<video>` 添加 `disablePictureInPicture` （阻止悬浮框中框）限制等的新扩展；将 `onLoad` 引配予 `<embed>` 。
- 宣判所有以 `javascript:` 起手的乱写老旧地址投送指令归属为高危防不胜防的高危感染途径并加以警告打压。
- 引入供大家进行各路全场景自动化试炼和压榨评测所配套独供的猛药：在测试层面推出大杀器 `act(async () => ...)` 等体系全套支援包裹方法。

## 16.8.0 - 16.8.6 (2019年2月至3月)

### **历史破局宣告（React 16.8.0）：Hooks 时代来临**

**Hooks —— 从此以后大家再也不用苦苦硬坳憋着一股劲去写深重臃肿死气沉沉的 Class 了！** 属于函数式掌权的纯响应革命火种，借这一回推送向全球广撒英雄帖！包括 `useState` 等。

其后 16.8 系列其余版本重点：

- 在测试大本营（Shallow Renderer 等测试接口）铺好了接待诸位 Hooks 新贵客进驻的栈道。
- 面世初秀期间修缮跟进在 `useState` 等中出现由于等价 (`Object.is`) 判断失察、甚至挂载或重复触发、和各类的内存脱钩未释清遗忘等毛病。
- 正式宣告发配打包了专用来压制各位新兵把持不住到处乱种 Hooks 或用错不按规矩办事引发灾难的门派首发级约束教官 —— eslint 高压插件：`eslint-plugin-react-hooks`。

## 16.6.0 及 16.7.x (2018年下半年)

- 迎来神技 `React.lazy()` 配合新任大将 `Suspense` 作为破阵开山锤，主打为了各门各路按需异步化分裂装载组件 (Code Splitting) 打开正路铺建阳光大道。
- 顺势把专门只为普通轻型函数组件做比较去重的平替门神 `React.memo()` 推上火线。
- 对于想要摸鱼又苦于无新方法拿取 Context 上下文状态的老类系组件祭出更为短平快省心的 `contextType` 专治办法。
- 初步预设打好专门拿来将来抓异常接盘抛盘重构错误的 `getDerivedStateFromError` 以备日后全线反扑。
- （此时段内包含了多次由于试探边缘界线及部分不妥改动所急忙推翻打补丁并甚至因此产生某些不被发配直接弃用的废号情况 例如 16.6.2，这里已作过略整合处理）

## 16.1.x - 16.5.x 概览 (2017年末至2018年秋)

_(此阶段 React 主要围绕 16.0 Fiber 架构落地后的稳固工作、引入各类零散机制及实验特性)_

- **React.forwardRef() 登场 (16.3.0)**：准许组件将收到的 `ref` 向下垫转透传给它自己的子代去。
- **全新 Context API 确立 (16.3.0)**：老一套被嫌弃的旧版 Context 正式下放更迭替换为今天大家所熟知的全新官方 Context 支持规范标准方案。
- **生杀大权级的新生命周期更迭 (16.3.0)**：引入 `getDerivedStateFromProps()` 以及 `getSnapshotBeforeUpdate()` 用作未来应对并发机制的铺垫，并将旧式的 `componentWillMount` 等戴上了 `UNSAFE_` 的前缀帽子。
- **React.createRef() (16.3.0)**：加入了一种比之前老用回调拉取 `ref` 要更加顺手且规范干净的官方新途径。
- **React.StrictMode (16.3.0)**：包装隔离罩正式起用，帮你找出并提早警告你在向异步渲染机制投奔的半路中可能会踩中的坑雷。
- 引入用以测速计性能的实验组件 `React.unstable_Profiler` (16.4.0)。
- 修复并支持了 SVG 内更多元素的 `tabIndex` 事件、以及涵盖 `onMouseEnter` 等错位、还有各类水化过程中大小写失算报错等疑难杂项。
- 加入全方位对各类 Pointer Events 的支援保障。
- **React.Fragment 登场 (16.2.0)**：作为 React 包下的实名输出模块登场，不用再为了包个壳专门去渲染无用虚占的 DOM 节点了。

## 16.0.0 (2017年9月26日) - Fiber 架构全面降临

### 必须的 JS 运行底盘要求更变

- React 16 开始要靠引擎自带原生的 `Map`、`Set` 还有 `requestAnimationFrame` 去盘活运转。若你要伺候老古董（<IE11），务必打好自配的 polyfill 补丁包。

### 核心新特性爆发

- **渲染函数 `render` 如今能直接随性返回 String 或是 Array 数组**，不用再逼着去包虚无的外壳。
- **错误边界 (Error Boundaries)** 重装出阵：任何子孙组件在渲染期间抛崩的错，终于有特定组件可以出面全盘接住并负责显示降级视图以防整个大树死机白屏惨剧蔓延了。
- **门户机制打通 (Portals)**：正式供出 `ReactDOM.createPortal()` 让你能堂而皇之地将渲染成果随意丢给抛置到 DOM 树结构里面另外那头的遥远节点上去，突破过往层级束缚嵌套枷锁。
- 服务端宣发 `ReactDOMServer.renderToNodeStream()` 的能力开启流媒体模式水管源源不断对外发片。
- 向 DOM 分发属性时开始接纳兼容非标准、稀奇古怪自定义命名的客制化属性。

### 脱骨换胎的破坏性变革 (Breaking Changes)

- `setState` 的底盘机制被重调：里面塞进 `null` 那就是不动作不刷新；在渲染时节里去调用 `setState` 会永远死脑筋照刷不停（而且本来也不应该在此时做这事）；`setState` 最后顺带的那个回调钩子现在肯定排在更新节点完满完成后火急火燎首当其冲被唤出。
- 并列项如果所赋以的 `key` 不归一不唯一的话，现在虽不会像过去那样直接硬生抛死错，但极可能引起莫名牵引到组件重复渲染生殖抑或被莫名剥夺吞没不现的怪象。
- `ReactDOM.render` 要是胆敢不知好歹放在生命周期回调里面去反向召唤，现在铁面无私一律只会掷回 `null` 给你。

## 15.x 时代概括 (2016年 - 2017年)

_React 15 代是奠定前端生态大一统的重要防线，该时期结束并开启向纯碎现代组件化转型的诸多数落整合。_

- **(15.5.x) 挥刀断舍离**：
  - 将原归属于 React 正宫之下的 `React.createClass` 进行剥离抛弃，并斥令转向使用改至专门接手处理杂事的 `create-react-class` 包下。
  - `React.PropTypes` 也被请走请出宫，被正式独立发配边疆自立门户划到了独立的第三方库 `prop-types` 去。这两步清退宣告了老派混沌纠缠写法的完全边缘化。
  - 核心 Addons 以及旧版 Test Utils 也步此后尘遭受同样分包边缘处理的打压排挤。
- **(15.6.x) 输入源的掌控精修**：补修和完善了一大票原本常在 `<input>` 各自表现里乱掉链子的问题；并支持传入原生带 CSS 本土化风味的 Variables。
- 许可协议更替：彻底去除了之前引起过轩然大波开源界抵制抗议风潮的所谓 BSD + Patents 附加专利流氓协议，改为了干干净净的 MIT。

## 远古世代概览：React 0.14 及更早版本 (2013年 - 2016年初)

_(React 0.x 时代记录了 React 从起步走向前台、摸索自身定位、分裂出多端乃至颠覆传统观念的重要基石阶段)_

- **双包分家 (v0.14.0)**：React 正式宣布和统治着网页视觉构建的 `react-dom` 包和平分家。至此，React 头顶的 "渲染核心" 冠冕不再被限缩至唯有 Web 网页这一宿主环境之下，为接下来一统跨平台霸业 (`React Native` 等等) 真正打开了格局。
- **无状态函数组件 (Stateless Functional Components)**：同样也是在 0.14.0 露脸。这是最早允许你把一个干净纯粹只有输入(`props`)输出(`JSX`)的纯净函数充作 React 节点使用的起始地界，孕育了后来函数式霸权降临（Hooks 登场）的基因胚胎。
- **彻底抛弃字符串 Refs**：早期习惯将 `ref="identifier"` 作为 DOM 收钩的做法渐渐被抛出被替换掉，引导改作回调式的接收方案。
- **向 ES6 投降 (v0.13.0)**：顺应语言迭代浪潮，正式宣告容许使用 `class X extends React.Component` 这一 ES6 糖衣炮弹来写业务组件、不再只有古来的 `React.createClass()`。
- **废除多余节点包裹包裹**：更遥远时代曾为了维护 `data-reactid` 而强制安插的各类不知所云 `<span>` 嵌套包衣纷纷被剥除（自 v0.15 引入了更干净明了的直接渲染生成法则）。
- **历经沧桑的 JSX 变奏**：经历了早古时代从 `<div />` 背后仍旧必须苦修不辍包裹各类怪异方言和各类必须加诸 `@jsx React.DOM` 等奇葩头标、直至慢慢蜕变为今天大家觉得稀松平常并信手拈来使用无障碍的模样。
- (诸多生命周期的早一代原生命名、被抛弃又再度重拾起的废案遗踪，皆在此长达近三年的黑暗蛮荒与拓荒之期内反复上演并最终奠定了现代 React 生态的庞大版图基础。)

---

> **译者按 / 归档说明**
> 本翻译精炼归纳了 React 主线变动的大规模脉络（由最新的 React 19 一直向回追溯至初创诞生期）。其中针对底层代码调度器如 `scheduler` 的极端边角打磨、或针对各类老版浏览器特定的偏门 DOM 及表单错误之填埋缝补、包括实验期的短命 API 无疾而终事件等略显聒噪且已无太大历史借鉴意义的技术债务记录均进行了大幅度的浓缩及精简。详细原貌及历史代码请以官方原案英版原文底稿为准。
