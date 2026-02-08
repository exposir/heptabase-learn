<!--
- [INPUT]: 无外部依赖，作为项目门户的自包含文档
- [OUTPUT]: 提供项目概览、导航指引、使用说明
- [POS]: 项目根目录的入口文档，访客第一读物
- [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->

# Heptabase Learn - 前端与大模型知识库

> 用 Heptabase + Markdown + Git 构建的个人知识管理系统
> 深度学习前端开发、大模型（LLM）、AI 技术的思想沉淀之地

[![Knowledge Management](https://img.shields.io/badge/Knowledge-Management-blue)](https://heptabase.com)
[![Frontend Philosophy](https://img.shields.io/badge/Frontend-Philosophy-green)](./前端开发的历史与哲学：从混沌到秩序的技术演进史)
[![GEB Protocol](https://img.shields.io/badge/GEB-Protocol-orange)](./CLAUDE.md)

---

## 🎯 项目定位

这不是一个普通的技术笔记仓库，而是一个**知识的沉淀场域**，一个**思想的实验室**。

**核心理念**：
- 📚 **深度优于广度**：宁可深挖一口井，不愿浅尝百家泉
- 🔗 **关联优于孤立**：知识的力量在于网络，而非碎片
- 🧠 **哲学优于技术**：理解"为什么"比记住"怎么做"更重要
- 🌱 **持续优于完美**：知识如花园，需要持续耕耘而非一次建成

**知识管理工具**：
- **Heptabase**：可视化知识图谱，白板式思维整理
- **Markdown**：纯文本记录，版本可控，永久可读
- **Git**：知识的版本管理，思想的演进轨迹

---

## 📂 目录结构

```
heptabase-learn/
│
├── 前端开发的历史与哲学：从混沌到秩序的技术演进史/
│   ├── CLAUDE.md                                                      # 模块地图（L2）
│   ├── README.md                                                       # 主文档：前端演进史（15000字）
│   ├── MVC模式的哲学解构：架构思想的深度剖析.md                      # 专题1：MVC哲学（12000字）
│   ├── 三大框架与MVC：继承、重构与超越.md                            # 专题2：框架对比（5500字）
│   ├── Rust+WebAssembly前端渲染器实战：从理论到实践.md               # 专题3：Wasm基础（10000字）
│   ├── Rust企业级前端渲染器架构设计：从表格到甘特图的工程实践.md     # 专题4：混合架构理论（12000字）
│   ├── React与Rust职责边界的澄清：为什么Canvas API调用在Rust侧.md   # 专题5：技术澄清（6000字）
│   ├── React+Rust混合架构深度剖析：project_manager_fe实战实践.md     # 专题6：企业级案例（15000字）
│   └── Smalltalk简史：面向对象编程的理念实验室.md                    # 专题7：历史溯源（6000字）
│
├── CLAUDE.md                                         # AI协作规则（Claude）
├── AGENTS.md                                         # AI协作规则（OpenAI）
├── CODEX.md                                          # AI协作规则（Codex）
├── GEMINI.md                                         # AI协作规则（Gemini）
├── .gitignore                                        # Git忽略规则
└── README.md                                         # 本文件
```

---

## 🌟 核心内容

### 📖 前端开发的历史与哲学

**主文档**：[前端演进史完整版](./前端开发的历史与哲学：从混沌到秩序的技术演进史/README.md)（15000字）

一部将前端技术史提升到哲学史高度的深度叙事，涵盖：

**时间跨度**：1989-2024，三十年技术演进
**章节体系**：12章，从静态HTML到WebAssembly
**哲学深度**：融合柏拉图、康德、黑格尔、海德格尔等思想
**核心主题**：从命令式到声明式，从状态焦虑到时间切片的秩序重建。

**专题深化系列**：

#### 🏛️ 哲学与范式
1. **[MVC模式的哲学解构](./%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%9A%84%E5%8E%86%E5%8F%B2%E4%B8%8E%E5%93%B2%E5%AD%A6%EF%BC%9A%E4%BB%8E%E6%B7%B7%E6%B2%86%E5%88%B0%E7%A7%A9%E5%BA%8F%E7%9A%84%E6%8A%80%E6%9C%AF%E6%BC%94%E8%BF%9B%E5%8F%B2/MVC%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%93%B2%E5%AD%A6%E8%A7%A3%E6%9E%84%EF%BC%9A%E6%9E%B6%E6%9E%84%E6%80%9D%E6%83%B3%E7%9A%84%E6%B7%B1%E5%BA%A6%E5%89%96%E6%9E%90.md)**（12000字）
   - 从1979年Smalltalk到现代微前端，康德三大批判的代码映射。
2. **[三大框架与MVC：继承、重构与超越](./%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%9A%84%E5%8E%86%E5%8F%B2%E4%B8%8E%E5%93%B2%E5%AD%A6%EF%BC%9A%E4%BB%8E%E6%B7%B7%E6%B2%86%E5%88%B0%E7%A7%A9%E5%BA%8F%E7%9A%84%E6%8A%80%E6%9C%AF%E6%BC%94%E8%BF%9B%E5%8F%B2/%E4%B8%89%E5%A4%A7%E6%A1%86%E6%9E%B6%E4%B8%8EMVC%EF%BC%9A%E7%BB%A7%E6%89%BF%E3%80%81%E9%87%8D%E6%9E%84%E4%B8%8E%E8%B6%85%E8%B6%8A.md)**（5500字）
   - React、Vue、Angular 的哲学分野：自由主义 vs 中庸主义 vs 制度主义。
3. **[Smalltalk简史：理念实验室](./%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%9A%84%E5%8E%86%E5%8F%B2%E4%B8%8E%E5%93%B2%E5%AD%A6%EF%BC%9A%E4%BB%8E%E6%B7%B7%E6%B2%86%E5%88%B0%E7%A7%A9%E5%BA%8F%E7%9A%84%E6%8A%80%E6%9C%AF%E6%BC%94%E8%BF%9B%E5%8F%B2/Smalltalk%E7%AE%80%E5%8F%B2%EF%BC%9A%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%BC%96%E7%A8%8B%E7%9A%84%E7%90%86%E5%BF%B5%E5%AE%9E%E9%AA%8C%E5%AE%A4.md)**（6000字）
   - 溯源 1979 年 Xerox PARC 的“创世纪”时刻。

#### 🦀 Rust + Wasm 工业实践
4. **[Rust+WebAssembly渲染器实战](./%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%9A%84%E5%8E%86%E5%8F%B2%E4%B8%8E%E5%93%B2%E5%AD%A6%EF%BC%9A%E4%BB%8E%E6%B7%B7%E6%B2%86%E5%88%B0%E7%A7%A9%E5%BA%8F%E7%9A%84%E6%8A%80%E6%9C%AF%E6%BC%94%E8%BF%9B%E5%8F%B2/Rust+WebAssembly%E5%89%8D%E7%AB%AF%E6%B8%B2%E6%97%AB%E5%99%A8%E5%AE%9E%E6%88%98%EF%BC%9A%E4%BB%8E%E7%90%86%E8%AE%BA%E5%88%B0%E5%AE%9E%E8%B7%B5.md)**（10000字）
   - 纯 Rust 实现虚拟 DOM 的底层原理与 Diff 算法。
5. **[React+Rust混合架构深度剖析](./%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%9A%84%E5%8E%86%E5%8F%B2%E4%B8%8E%E5%93%B2%E5%AD%A6%EF%BC%9A%E4%BB%8E%E6%B7%B7%E6%B2%86%E5%88%B0%E7%A7%A9%E5%BA%8F%E7%9A%84%E6%8A%80%E6%9C%AF%E6%BC%94%E8%BF%9B%E5%8F%B2/React+Rust%E6%B7%B7%E5%90%88%E6%9E%B6%E6%9E%84%E6%B7%B1%E5%BA%A6%E5%89%96%E6%9E%90%EF%BC%9Aproject_manager_fe%E8%A1%A8%E6%A0%BC%E6%B8%B2%E6%97%AB%E7%9A%84%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E5%AE%9E%E8%B7%B5.md)**（15000字）⭐
   - 真实企业级案例：30 倍性能提升的实现路径，缓存比语言选择更重要。
6. **[企业级前端渲染器架构设计](./%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%9A%84%E5%8E%86%E5%8F%B2%E4%B8%8E%E5%93%B2%E5%AD%A6%EF%BC%9A%E4%BB%8E%E6%B7%B7%E6%B2%86%E5%88%B0%E7%A7%A9%E5%BA%8F%E7%9A%84%E6%8A%80%E6%9C%AF%E6%BC%94%E8%BF%9B%E5%8F%B2/Rust%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%89%8D%E7%AB%AF%E6%B8%B2%E6%97%AB%E5%99%A8%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%EF%BC%9A%E4%BB%8E%E8%A1%A8%E6%A0%BC%E5%88%B0%E7%94%98%E7%89%B9%E5%9B%BE%E7%9A%84%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5.md)**（12000字）
   - 扬长避短的哲学：React 管状态，Rust 管计算。
7. **[职责边界澄清：Canvas API 调用位置](./%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%9A%84%E5%8E%86%E5%8F%B2%E4%B8%8E%E5%93%B2%E5%AD%A6%EF%BC%9A%E4%BB%8E%E6%B7%B7%E6%B2%86%E5%88%B0%E7%A7%A9%E5%BA%8F%E7%9A%84%E6%8A%80%E6%9C%AF%E6%BC%94%E8%BF%9B%E5%8F%B2/React%E4%B8%8ERust%E8%81%8C%E8%60%A3%E8%BE%B9%E7%95%8C%E7%9A%84%E6%BE%84%E6%B8%85%EF%BC%9A%E4%B8%BA%E4%BB%80%E4%B9%88Canvas%20API%E8%B0%83%E7%94%A8%E5%9C%A8Rust%E4%BE%A7.md)**（6000字）
   - 揭秘 3500 倍数据传输优势的架构数学证明。

---

## 🚀 快速开始

### 在 Heptabase 中使用

**推荐工作流**：

1. **创建白板**：创建 "前端哲学"、"MVC架构"、"Rust混合架构" 三大主白板。
2. **导入文章**：将 README.md 导入为长文卡片，为关键概念（如 "Virtual DOM"、"脏区域"）创建独立卡片。
3. **建立连接**：用箭头连接技术演进的因果关系，用颜色标记不同哲学流派（如绿色代表现象学，蓝色代表结构主义）。

---

## 🧩 GEB 分形文档系统

本项目采用 **GEB（Gödel, Escher, Bach）分形文档系统**，实现代码与文档的同构。

- **L1 (`/CLAUDE.md`)**：项目宪法，定义全局规则与模块索引。
- **L2 (`/{module}/CLAUDE.md`)**：模块地图，定义局部职责与文件契约。
- **L3 (`文件头部`)**：文件契约，声明 `INPUT/OUTPUT/POS` 依赖关系。

**核心咒语**：我在修改代码时，文档在注视我。我在编写文档时，代码在审判我。

---

## 📊 项目统计

**知识厚度**：
- **总字数**：约 76,500 字（深度内容占比 > 90%）
- **专题文章**：7 篇（涵盖哲学、架构、实战、历史）
- **规范文档**：6 篇（全套 AI 协作规则）

**覆盖范围**：
- **时间跨度**：1979 - 2024（45 年技术演化）
- **技术栈**：Rust, WebAssembly, React, Vue, Angular, Smalltalk, Canvas, 虚拟滚动, RAF 限流, LRU 缓存。
- **哲学流派**：本体论、认识论、现象学、结构主义、康德批判哲学。

---

## 🗺 路线图

### 2024 Q1-Q2（已完成）✅
- [x] 建立项目结构与 GEB 分形协议。
- [x] 完成《前端演进史》主文档（15000字）。
- [x] 完成 MVC 哲学、三大框架对比专题。
- [x] 完成 Rust+Wasm 基础实战与企业级混合架构理论。
- [x] 完成 project_manager_fe 企业级案例剖析（15000字）。
- [x] 补完职责边界澄清与 Smalltalk 历史溯源。

### 2024 Q3-Q4（进行中）⏳
- [ ] Redux 与纯函数式状态管理哲学。
- [ ] React Hooks 的范式革命：从类到函数的认识论。
- [ ] TypeScript 类型系统的形式化与契约本质。
- [ ] 大模型（LLM）驱动的前端开发新范式研究。

---

## 📧 联系方式

**项目维护者**：[@exposir](https://github.com/exposir)

---

## 💭 结语

> "我的语言的边界就是我的世界的边界。" —— 维特根斯坦

这个知识库不仅记录技术的更迭，更记录我们对数字世界本质的理解。每一次提交，都是对边界的一次拓展。

Made with 🧠 and ❤️