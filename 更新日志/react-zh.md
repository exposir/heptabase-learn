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

_(注：React 19 及之后的版本包含了最重大的架构变更、服务端组件及最新特性的更新。为了兼顾排版与阅读时间，早期历史版本变更（v18.x 及更早）留待后续翻译补充。)_
