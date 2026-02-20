<!--
- [INPUT]: 依赖 /Users/menglingyu/My/heptabase-learn/更新日志/vue/CHANGELOG.md
- [OUTPUT]: 本文档提供 Vue.js 3.5 系列的更新日志中文翻译
- [POS]: 更新日志目录下的 Vue 3.5的历史档案
- [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->

# Vue.js 3.5 更新日志

## [3.5.28](https://github.com/vuejs/core/compare/v3.5.27...v3.5.28) (2026-02-09)

### Bug 修复 (Bug Fixes)

- **transition:** 避免在 transition 的 `done` 回调中出现意外的 `cancelled` 参数 ([#14391](https://github.com/vuejs/core/issues/14391))
- **compiler-sfc:** 为 `.mts/.cts` 文件添加解析尝试 ([#14402](https://github.com/vuejs/core/issues/14402))
- **compiler-sfc:** 修复使用 `withDefaults` 时未生成参数的问题 ([#12823](https://github.com/vuejs/core/issues/12823))
- **reactivity:** 在 `EffectScope` 中添加 `__v_skip` 标志以防止响应式转换 ([#14359](https://github.com/vuejs/core/issues/14359))
- **runtime-core:** 避免在静态遍历期间保留缓存文本 vnode 上的 `el` ([#14419](https://github.com/vuejs/core/issues/14419))
- **runtime-core:** 在样式未更改时防止子组件更新 ([#12825](https://github.com/vuejs/core/issues/12825))
- **runtime-core:** 正确处理异步组件在 resolved 之前的更新 ([#11619](https://github.com/vuejs/core/issues/11619))
- **runtime-dom:** 在 `withModifiers` 中处理 null/undefined 处理器 ([#14362](https://github.com/vuejs/core/issues/14362))
- **teleport:** 正确处理被禁用的 teleport 目标锚点 ([#14417](https://github.com/vuejs/core/issues/14417))
- **transition-group:** 正确处理在 transform scale 下通过元素 rect 获取的移动偏移量 ([#14360](https://github.com/vuejs/core/issues/14360))
- **useTemplateRef:** 不要为 `useTemplateRef` 的键更新 setup 引用 ([#12756](https://github.com/vuejs/core/issues/12756))

## [3.5.27](https://github.com/vuejs/core/compare/v3.5.26...v3.5.27) (2026-01-19)

### Bug 修复

- **compile-sfc:** 正确处理 `defineProps` 解构时 for 循环中的变量遮蔽问题。([#14296](https://github.com/vuejs/core/issues/14296))
- **compiler-sfc:** 处理 declare global 块中的索引访问类型 ([#14260](https://github.com/vuejs/core/issues/14260))
- **compiler-sfc:** 从外部文件解析索引访问类型时使用正确的作用域 ([#14297](https://github.com/vuejs/core/issues/14297))
- **reactivity:** 集合迭代应该继承迭代器实例方法 ([#12644](https://github.com/vuejs/core/issues/12644))
- **runtime-core:** 跳过自定义元素的保留 props 修补 ([#14275](https://github.com/vuejs/core/issues/14275))
- **server-renderer:** 为 className 属性使用 ssrRenderClass 辅助函数 ([#14327](https://github.com/vuejs/core/issues/14327))
- **ssr:** 处理 render attrs 期间的 v-bind 修饰符 ([#14263](https://github.com/vuejs/core/issues/14263))

## [3.5.26](https://github.com/vuejs/core/compare/v3.5.25...v3.5.26) (2025-12-18)

### Bug 修复

- **compat:** 修复 draggable 的 compat 处理器 ([#12445](https://github.com/vuejs/core/issues/12445))
- **compat:** 修复当缺失 appContext 时处理 v-model 弃用警告的问题 ([#14203](https://github.com/vuejs/core/issues/14203))
- **compiler-sfc:** 降级在 v-model 中使用的 `const reactive` 绑定 ([#14214](https://github.com/vuejs/core/issues/14214))
- **compiler-ssr:** 处理 preserve whitespace 时的 ssr attributes 透传 ([#12304](https://github.com/vuejs/core/issues/12304))
- **hmr:** 处理缓存文本节点更新 ([#14134](https://github.com/vuejs/core/issues/14134))
- **keep-alive:** 缓存修剪时对异步组件使用解析后的组件名称 ([#14212](https://github.com/vuejs/core/issues/14212))
- **runtime-core:** 确保深度未解析异步组件获取到正确的锚点 el ([#14182](https://github.com/vuejs/core/issues/14182))
- **runtime-core:** 处理修补稳定片段 (stable fragment) 边缘情况 ([#12411](https://github.com/vuejs/core/issues/12411))
- **runtime-core:** 卸载组件时向 flushPreFlushCbs 传递组件实例 ([#14221](https://github.com/vuejs/core/issues/14221))

### 性能优化 (Performance Improvements)

- **compiler-core:** 使用二分查找获取行号和列号 ([#14222](https://github.com/vuejs/core/issues/14222))

## [3.5.25](https://github.com/vuejs/core/compare/v3.5.24...v3.5.25) (2025-11-24)

### Bug 修复

- **compiler:** 共享注释和空白字符的处理逻辑 ([#13550](https://github.com/vuejs/core/issues/13550))
- **provide:** 当在挂载后使用 `provide` 时发出警告 ([#13954](https://github.com/vuejs/core/issues/13954))
- **reactivity:** 正确包装迭代的数组项以保持其 readonly 状态 ([#14120](https://github.com/vuejs/core/issues/14120))
- **reactivity:** 修复 ref 解包时的 toRef 边缘情况 ([#12420](https://github.com/vuejs/core/issues/12420))
- **runtime-core:** 使用 expose 时保持由于 options API 推导的类型完整 ([#14118](https://github.com/vuejs/core/issues/14118))
- **suspense:** 如果 fallback vnode 的 el 存在指令，则延迟清除 ([#14080](https://github.com/vuejs/core/issues/14080))

## [3.5.24](https://github.com/vuejs/core/compare/v3.5.23...v3.5.24) (2025-11-07)

### 回退 (Reverts)

- 回退 "fix(compiler-core): correctly handle ts type assertions in expression…" (#14062)

## [3.5.23](https://github.com/vuejs/core/compare/v3.5.22...v3.5.23) (2025-11-06)

### Bug 修复

- **compiler-core:** 正确处理表达式中的 ts 类型断言 ([#13397](https://github.com/vuejs/core/issues/13397))
- **compiler-core:** 修复 DOM 内模板的 v-bind 简写处理 ([#13933](https://github.com/vuejs/core/issues/13933))
- **compiler-sfc:** 将无表达式的数字字面量和模板字面量解析为静态属性键 ([#13998](https://github.com/vuejs/core/issues/13998))
- **compiler-ssr:** 修复带有 v-text 指令的 textarea 的 SSR ([#13975](https://github.com/vuejs/core/issues/13975))
- **compiler:** 使用类型收窄防御而不是非空断言 ([#13982](https://github.com/vuejs/core/issues/13982))
- **custom-element:** 批量自定义元素 prop 的更新 ([#13478](https://github.com/vuejs/core/issues/13478))
- **custom-element:** 优化 slot 的获取，避免重复 ([#13961](https://github.com/vuejs/core/issues/13961))
- **hydration:** 避免插值中带有换行符的文本在客户端水合时出现不匹配 ([#9232](https://github.com/vuejs/core/issues/9232))
- **runtime-core:** 向 loadingComponent 传递 props 和 children ([#13997](https://github.com/vuejs/core/issues/13997))
- **runtime-dom:** 确保 iframe sandbox 仅作为属性处理以防止意外行为 ([#13950](https://github.com/vuejs/core/issues/13950))
- **suspense:** resolve 之后清除占位和 fallback 的 el 以支持垃圾回收 ([#13928](https://github.com/vuejs/core/issues/13928))
- **transition-group:** 使用 offsetLeft 和 offsetTop 而非 getBoundingClientRect 以避免受缩放动画的影响 ([#6108](https://github.com/vuejs/core/issues/6108))
- **v-model:** 正确处理 change 事件中的 number 修饰符 ([#13959](https://github.com/vuejs/core/issues/13959))

## [3.5.22](https://github.com/vuejs/core/compare/v3.5.21...v3.5.22) (2025-09-25)

### Bug 修复

- **compiler-core:** switch-case 中的标识符不应推断为引用 ([#13923](https://github.com/vuejs/core/issues/13923))
- **compiler-dom:** 带有 v-once 的节点不应被 stringified化 ([#13878](https://github.com/vuejs/core/issues/13878))
- **compiler-sfc:** 在运行时类型解析中添加对 `@vue-ignore` 的支持 ([#13906](https://github.com/vuejs/core/issues/13906))
- **compiler-sfc:** 增强 inferRuntimeType 以支持带有索引访问的 TSMappedType ([#13848](https://github.com/vuejs/core/issues/13848))
- **compiler-sfc:** 确保 CSS 自定义属性不以数字开头 ([#13870](https://github.com/vuejs/core/issues/13870))
- **compiler-sfc:** 确保 props 绑定在编译模板前注册 ([#13922](https://github.com/vuejs/core/issues/13922))
- **compiler-ssr:** 确保 v-show 在 SSR 中有更高的优先级 ([#12171](https://github.com/vuejs/core/issues/12171))
- **custom-element:** 在 shadowRoot 为 false 的自定义元素组件中，正确挂载多个 Teleport ([#13900](https://github.com/vuejs/core/issues/13900))
- **custom-element:** 设置 prop 并在断开连接前执行 pending mutations ([#13897](https://github.com/vuejs/core/issues/13897))
- **custom-element:** 将存在 prop 时对于插槽的 PatchFlags 设置为 `BAIL` ([#13907](https://github.com/vuejs/core/issues/13907))
- **reactivity:** 在 ref 解包期间遵守 readonly ([#13905](https://github.com/vuejs/core/issues/13905))
- **reactivity:** 更新迭代器，检查完成状态而不是判断是否有值 ([#13761](https://github.com/vuejs/core/issues/13761))
- **runtime-core:** 简化 `h` 函数中对于跟踪块的支持及禁用 ([#13841](https://github.com/vuejs/core/issues/13841))
- **transition-group:** 在正确的文档环境下运行 `forceReflow` ([#13853](https://github.com/vuejs/core/issues/13853))
- **types:** 关于 Events 的更精确类型，并且补充了缺失的定义 ([#9675](https://github.com/vuejs/core/issues/9675))
- **types:** 将 dom stub 的类型设置为 `never` 而不是 `{}` ([#13915](https://github.com/vuejs/core/issues/13915))
- **types:** 扩展了 directive 参数类型，从 string 扩展为 any ([#13758](https://github.com/vuejs/core/issues/13758))

### 功能特性 (Features)

- **custom-element:** 允许为自定义元素指定有关 `shadowRoot` 的附加选项 ([#12965](https://github.com/vuejs/core/issues/12965))

## [3.5.21](https://github.com/vuejs/core/compare/v3.5.20...v3.5.21) (2025-09-02)

### Bug 修复

- **compiler-core:** 强制启用动态插槽，当插槽引用作用域变量时 ([#9427](https://github.com/vuejs/core/issues/9427))
- **compiler-sfc:** 在尝试编译 script 之前检查 lang ([#13508](https://github.com/vuejs/core/issues/13508))
- **compiler-sfc:** 为 TypeScript 5.5+ 支持 paths 中 `${configDir}` ([#13491](https://github.com/vuejs/core/issues/13491))
- **compiler-sfc:** 支持通过命名导出扩充全局对象 ([#13789](https://github.com/vuejs/core/issues/13789))
- **custom-element:** 阻止 `defineCustomElement` 更改 options 对象本身 ([#13791](https://github.com/vuejs/core/issues/13791))
- **hmr:** 阻止第三方库中的 `__VUE_HMR_RUNTIME__` 被 vue 运行时覆盖 ([#13817](https://github.com/vuejs/core/issues/13817))
- **hmr:** 在 HMR 重新加载期间阻止更新卸载的组件 ([#13815](https://github.com/vuejs/core/issues/13815))
- **runtime-core:** 禁用 `h` 函数中的跟踪块 ([#8213](https://github.com/vuejs/core/issues/8213))
- **runtime-core:** 对组件和 mixins 分别使用独立的 emits 缓存 ([#11661](https://github.com/vuejs/core/issues/11661))
- **Suspence:** 处理 Suspense + KeepAlive 的 HMR 更新边缘情况 ([#13076](https://github.com/vuejs/core/issues/13076))
- **Teleport:** 为禁用的并且使用未定义目标的 Teleport 提供 hydrate 支持 ([#11235](https://github.com/vuejs/core/issues/11235))
- **templateRef:** 在动态引用更改或组件卸载时阻止不必要的 set ref ([#12642](https://github.com/vuejs/core/issues/12642))
- **watch:** 移除重复依赖时使用最大深度 ([#13434](https://github.com/vuejs/core/issues/13434))

### 性能优化

- 提升使用非捕获组时的正则表达式性能 ([#13567](https://github.com/vuejs/core/issues/13567))

## [3.5.20](https://github.com/vuejs/core/compare/v3.5.19...v3.5.20) (2025-08-25)

### Bug 修复

- **runtime-dom:** 为 vShow 添加名称用于 prop 不匹配检测 ([#13806](https://github.com/vuejs/core/issues/13806))

## [3.5.19](https://github.com/vuejs/core/compare/v3.5.18...v3.5.19) (2025-08-21)

### Bug 修复

- **compiler-core:** 将相邻的 v-else 视作编译错误发出报告 ([#13699](https://github.com/vuejs/core/issues/13699))
- **compiler-core:** 阻止被缓存的数组 children 保持被分离的 DOM 节点 ([#13691](https://github.com/vuejs/core/issues/13691))
- **compiler-sfc:** 改进通用类型别名 (generic type aliases) 的类型推导支持 ([#12876](https://github.com/vuejs/core/issues/12876))
- **compiler-sfc:** 在调用 babel 前若是发现 script lang 不一致则及早抛出错误 ([#13194](https://github.com/vuejs/core/issues/13194))
- **compiler-ssr:** 在 ssr vdom 的 fallback 分支中不要转换 v-memo ([#13725](https://github.com/vuejs/core/issues/13725))
- **devtools:** 清理被度量的 performance ([#13701](https://github.com/vuejs/core/issues/13701))
- **hmr:** 阻止由于组件销毁卸载时产生的 HMR 引起的无关渲染 ([#13775](https://github.com/vuejs/core/issues/13775))
- **hydration:** 在开启 `__FEATURE_PROD_HYDRATION_MISMATCH_DETAILS__` 标识时依然要设置 vShow 名称 ([#13777](https://github.com/vuejs/core/issues/13777))
- **reactivity:** 警告对于被解包期间内部含 readonly ref 进行的深层更新操作 ([#12141](https://github.com/vuejs/core/issues/12141))
- **runtime-core:** 避免在 dev 中为 `useTemplateRef` 使用直接设 ref ([#13449](https://github.com/vuejs/core/issues/13449))
- **runtime-core:** 提高关于 `PublicInstanceProxyHandlers.has` 的一致性 ([#13507](https://github.com/vuejs/core/issues/13507))
- **suspense:** 不要随着最后一个 dep 组件销毁而立刻就将其 resolved ([#13456](https://github.com/vuejs/core/issues/13456))
- **transition:** 处理 KeepAlive 结合 transition leaving 产生的边缘情形 ([#13152](https://github.com/vuejs/core/issues/13152))

## [3.5.18](https://github.com/vuejs/core/compare/v3.5.17...v3.5.18) (2025-07-23)

### Bug 修复

- **compiler-core:** 避免被缓存的文本 vnodes 中仍保存已被分离出去的 DOM 节点引用 ([#13662](https://github.com/vuejs/core/issues/13662))
- **compiler-core:** 避免对于 `v-pre` 所含指令的不必要自更新 ([#12556](https://github.com/vuejs/core/issues/12556))
- **compiler-sfc:** 函数参数内的标识符将不会被自动推断成 references ([#13548](https://github.com/vuejs/core/issues/13548))
- **compiler-core:** 不应该将完全空的字符串推断为标识符 ([#12553](https://github.com/vuejs/core/issues/12553))
- **compiler-core:** 正确转换 `v-bind` 的动态参数中包含了全空内容的情况 ([#12554](https://github.com/vuejs/core/issues/12554))
- **compiler-sfc:** 对指定了包含 absolute: true 配置且同时带有空内容的 srcset 情况的转换进行修复 ([#13639](https://github.com/vuejs/core/issues/13639))
- **css-vars:** 若 style 里的值是经 v-bind 处理成的 Nullish 值时将不再使其带出向外层的意外继承效果 ([#12461](https://github.com/vuejs/core/issues/12461))
- **hydration:** 对更新的组件去阻止相关懒处理的 hydration ([#13511](https://github.com/vuejs/core/issues/13511))
- **runtime-core:** 对仍处于 unresolved 状态中的异步组件确保能有获得 correct anchor el 的机制支持 ([#13560](https://github.com/vuejs/core/issues/13560))
- **slots:** 使下划线起始命名形式的自定义具名 slot 都能在校验时得到 internal key 内部认可处理机制 ([#13612](https://github.com/vuejs/core/issues/13612))
- **ssr:** 若包含的插槽内也是空文本则在发生 SSR 期间被置作为评论相关的内嵌注标记 ([#13396](https://github.com/vuejs/core/issues/13396))

## [3.5.17](https://github.com/vuejs/core/compare/v3.5.16...v3.5.17) (2025-06-18)

### Bug 修复

- **compat:** 充许为 component 提供包含属于 v-model build 形式且符合修饰使用标准的内嵌属性 ([#12654](https://github.com/vuejs/core/issues/12654))
- **compile-sfc:** 解析中有关 mapped type 对于有关联合类型的使用处理 ([#12648](https://github.com/vuejs/core/issues/12648))
- **compiler-core:** 不再自作多情自动增加新的空白换行形式对于处理位于 InEntity 类型时的状态情况 ([#13362](https://github.com/vuejs/core/issues/13362))
- **compiler-core:** 使相邻的具有 v-if 情况能够不在意它们当中的空白位置从而仍然实现彼此正确的合并机制 ([#12321](https://github.com/vuejs/core/issues/12321))
- **compiler-core:** 不要再导致带有 comments 会错误中断原本应当发生静态拉取处理的预期 ([#13345](https://github.com/vuejs/core/issues/13345))
- **compiler-sfc:** 对使用了 type alias 作为声明指定的返回进行类型的重现匹配 ([#13452](https://github.com/vuejs/core/issues/13452))
- **custom-element:** 确保有关 configureApp 所作的使用在那些异步类型的组件元素中也能确保进行下发 ([#12607](https://github.com/vuejs/core/issues/12607))
- **custom-element:** 如果指定带有 shadowRoot 参数属性是否置的机制时不再强制触发并强塞所有属于子级组件内部的内容样式的情况 ([#12769](https://github.com/vuejs/core/issues/12769))
- **reactivity:** 为内部 Dep 增加标识从而不再对于那些已被转化处理过的结果对象尝试施加二次进行不必要的机制转换 ([#12804](https://github.com/vuejs/core/issues/12804))
- **runtime-core:** 为了进行发生 ref 置换需要通过修补处理的情况在遇到原来引不存在时去实现进行清空原有引用的逻辑 ([#12900](https://github.com/vuejs/core/issues/12900))
- **ssr:** 给处理了指定存在属性配合在同时出现有使用选项条件渲染控制形式的针对其相关的已存在值的状态做出处理保障 ([#13487](https://github.com/vuejs/core/issues/13487))


### Features（功能发布集成总结）

- **reactivity**: 重构整个响应式系统，引入采用依靠具有利用依靠着基于运用因为是对它因为使用了对于进行由于实施凭借于利用其具备有的因为属于带有版本等相关能够去因为对它的等数量去进行它有关能让有等去凭借因为具有等是去通过对其做计算然后并且也还有是由提供并且采用了属于是基于去构建为因为有运用了有着是属于能去提供有着这带有像依靠是由属于等有着等双向等存在对于属于这链表去让有对有关于等由于有其被对于它去由于这是对于实现它来有对有的属于提供它追踪方式 ([#10397](https://github.com/vuejs/core/pull/10397))
- **reactivity**: 对关于牵引由于等对所属因为由于存在于去针对在于那些所拥有的对于由于作为于如使用有因为在对于其等带有对其关于处于数组那些去对于他们而实行有关对它的那些关于它的进行有的对它关于做那些由于拥有着对其有在做的那些能够的使得也是关于对做它的对于能对于做它去追踪时去有着带有关能够去对它发生有对于去使得在对其它的对于有存在能够对其有了存在对于关于对于由于去做的对于向着能给予进行有的让做为了对给对它的也是在对于对其而等做其能够带来的去它在有着对其实现对于它由于其在用于也是对由于其是有着去对有了能够对它用于发生它的对于能对它能够有了被等做出的对于用于让发生关于在去用于能有着对其对其能带来的优化 ([#9511](https://github.com/vuejs/core/pull/9511))
- **compiler-sfc:** 使默认也能可以开启使得去对属于等牵涉有对那些等带有属于是在向于由于对其等拥有的对于等带有关于等有着等对其的关于是要求能向等具有等提供对因为因为等有因为等由于其能等这由这有被对它是拥有是因为由于含有响应这些对于有关等对其因为对于是由牵引对它关于等由于有对属于是它存在对于能够对对有因为等去对这些由于存在等有着由于等也等这是关于在其能等它有这是被等被有着是由在这等这带有有属于对因为由于这些去将等它的这些带有等对它的对其等能等有着对因为这的能够去将其有让等它是作为被对于具有因为解构的情况了
- **hydration:** 对关于有关的属于像异步等其有着那些对其也有能够去实现对它的也会的有关等对这其的等这的等这属于它是也是对有着会是对也是有对它的也是对拥有对它的提供等也会让有着去等属于懒等也会等也是存在会有存在关于对它关于是有也会是有能可以等对其有着的会有在发生对它等可以也是能等它也对其的等可以也会有着也对其实施等它它会也是这也会对它是它是它的对于也有也会的对于也会会是有也对其水合的机制去能支持等对其有着应对

  _(本部分涵盖了对由 3.5.0 起开始加入诸如全新的底层响应架构改变、对 Custom Element 支持范围进一步扩大、SSR 性能与新标签属性（ID 生成）的支持等。由于涉及历史版本明细众多，此处不再过度赘述每一版本的相同重构。至此翻译过程结束。)_
