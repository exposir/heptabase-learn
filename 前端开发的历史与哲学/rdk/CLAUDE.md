<!--
- [INPUT]: 依赖 /前端开发的历史与哲学/CLAUDE.md 的专题上下文
- [OUTPUT]: 本子目录的模块地图与成员清单
- [POS]: L2 层级子模块文档，描述 "rdk" (Layout-Box) 专题
- [PROTOCOL]: 变更时更新此头部，然后检查 /前端开发的历史与哲学/CLAUDE.md
-->

# rdk/ (Layout-Box 专题)

> L2 | 父级: /前端开发的历史与哲学/CLAUDE.md

## 模块定位

本模块是一个 **企业级渲染引擎深度剖析专题**，专门研究字节跳动 Meego 团队开发的 `Layout-Box` (RDK) 项目。它展示了如何将 React 的声明式范式与 Rust/Wasm 的高性能计算能力在 50,000+ 行代码规模的工业项目中完美融合。

## 成员清单

- **Layout-Box渲染引擎深度剖析：字节Meego团队的Canvas+Rust实践.md**: 核心研报。涵盖 Monorepo 结构、核心包职责（CDK/Palouti/Pingere）、React Reconciler 绑定与硬件加速方案。

## 核心技术点

- **Pingere**: 自定义 React Reconciler，实现 JSX 到 Canvas 指令的映射。
- **Palouti**: 基于 Rust 的高性能 Flexbox 布局引擎。
- **CDK**: 提供类似于 DOM 的交互基础（事件、命中测试）。

[PROTOCOL]: 变更时更新此头部，然后检查 /前端开发的历史与哲学/CLAUDE.md