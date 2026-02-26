import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Heptabase Mirror",
  description: "Heptabase 知识图谱的 Git 备份与归档",
  base: "/heptabase-learn/",
  ignoreDeadLinks: true, // 增加死链容错，确保构建必过
  lastUpdated: true,

  // 排除含有大量 Vue 模板语法的原始 changelog 文件，避免 Vue 编译器误解析
  srcExclude: [
    '**/更新日志/vue/CHANGELOG-3.0.md',
    '**/更新日志/vue/CHANGELOG-3.1.md',
    '**/更新日志/vue/CHANGELOG.md',
    '**/更新日志/react.md',
  ],

  head: [["link", { rel: "icon", href: "/heptabase-learn/favicon.ico" }]],

  themeConfig: {
    outline: "deep",
    logo: "/logo.svg",

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '语言',
    outlineTitle: '本页目录',
    nav: [
      {
        text: "🗂️ 归档浏览",
        items: [
          { text: "前端开发的历史与哲学", link: "/前端开发的历史与哲学/" },
          { text: "RDK 工业实战", link: "/RDK/CLAUDE" },
          { text: "故乡考察", link: "/故乡/CLAUDE" },
        ],
      },
      {
        text: "💻 编程与算法",
        items: [
          { text: "编程题", link: "/编程题/CLAUDE" },
          { text: "算法题", link: "/算法题/CLAUDE" },
          { text: "算法概念", link: "/算法概念/CLAUDE" },
        ],
      },
      {
        text: "💡 技能与提示词",
        items: [
          { text: "提示词 (Prompt)", link: "/提示词/CLAUDE" },
          { text: "AI 技能库 (SKILL)", link: "/SKILL/深入执行/深入执行" },
          { text: "AI 编程", link: "/AI编程技巧/CLAUDE" },
        ],
      },
      {
        text: "📝 碎片与沉淀",
        items: [{ text: "日常碎片 (TIL)", link: "/TIL/CLAUDE" }],
      },
      { text: "📈 股票实战", link: "/股票/CLAUDE" },
      {
        text: "📰 洞察与追踪",
        items: [
          { text: "新闻与洞察", link: "/新闻/CLAUDE" },
          { text: "系统更新日志", link: "/更新日志/CLAUDE" },
        ],
      },
      { text: "🧠 Heptabase", link: "https://heptabase.com" },
      { text: "GitHub", link: "https://github.com/exposir/heptabase-learn" },
    ],

    sidebar: {
      "/前端开发的历史与哲学/": [
        {
          text: "📖 前端哲学全景",
          items: [
            {
              text: "引言：代码背后的形而上学",
              link: "/前端开发的历史与哲学/",
            },
          ],
        },
        {
          text: "🏛️ 哲学与范式",
          items: [
            {
              text: "MVC 模式的哲学解构",
              link: "/前端开发的历史与哲学/MVC模式的哲学解构：架构思想的深度剖析",
            },
            {
              text: "三大框架与 MVC 的继承与超越",
              link: "/前端开发的历史与哲学/三大框架与MVC：继承、重构与超越",
            },
            {
              text: "Smalltalk 简史：面向对象实验室",
              link: "/前端开发的历史与哲学/Smalltalk简史：面向对象编程的理念实验室",
            },
          ],
        },
        {
          text: "🏢 顶级工业案例 (RDK)",
          items: [
            {
              text: "🗺️ rdk 模块地图",
              link: "/RDK/CLAUDE",
            },
            {
              text: "Layout-Box 渲染引擎深度剖析",
              link: "/RDK/Layout-Box渲染引擎深度剖析",
            },
          ],
        },
        {
          text: "🦀 Rust + Wasm 工业实战",
          items: [
            {
              text: "Wasm 渲染器基础实战",
              link: "/前端开发的历史与哲学/Rust+WebAssembly前端渲染器实战：从理论到实践",
            },
            {
              text: "企业级渲染器架构设计",
              link: "/前端开发的历史与哲学/Rust企业级前端渲染器架构设计：从表格到甘特图的工程实践",
            },
            {
              text: "React 与 Rust 职责边界澄清",
              link: "/前端开发的历史与哲学/React与Rust职责边界的澄清：为什么Canvas API调用在Rust侧",
            },
            {
              text: "架构权力划分：谁决定渲染什么",
              link: "/前端开发的历史与哲学/React与Rust的职责边界澄清：谁决定渲染什么",
            },
            {
              text: "技术反思：你在重新发明轮子",
              link: "/前端开发的历史与哲学/命令式+基础组件改造vs Preact：你在重新发明轮子",
            },
            {
              text: "实现路径：不一定要重新发明轮子",
              link: "/前端开发的历史与哲学/命令式渲染的多种实现路径：不一定要重新发明轮子",
            },
            {
              text: "最终闭环：性能优化核心问答总结",
              link: "/前端开发的历史与哲学/命令式渲染优化的本质与适用边界：核心问答总结",
            },
            {
              text: "Preact 替换的现实困境",
              link: "/前端开发的历史与哲学/Preact替换的现实困境：全局替换vs局部隔离的工程权衡",
            },
          ],
        },
        {
          text: "📊 深度决策与案例",
          items: [
            {
              text: "project_manager_fe 实战剖析",
              link: "/前端开发的历史与哲学/React+Rust混合架构深度剖析：project_manager_fe表格渲染的性能优化实践",
            },
            {
              text: "React Scheduler 架构抉择",
              link: "/前端开发的历史与哲学/React Scheduler的存在必然性：声明式vs命令式的架构抉择",
            },
          ],
        },
      ],
      "/股票/": [
        {
          text: "📈 资产本质与实战",
          items: [
            { text: "⭐ 核心认知地图", link: "/股票/核心认知地图" },
            {
              text: "🔥 A股散户生存指南",
              link: "/股票/A股散户生存指南：从认知到实操的完整框架",
            },
            { text: "🗺️ 模块地图", link: "/股票/CLAUDE" },
            { text: "股票的本质", link: "/股票/股票的本质" },
            { text: "A 股优质资产", link: "/股票/A股优质资产" },
            { text: "A 股只有大宗商品", link: "/股票/A股只有大宗商品" },
            { text: "A 股特种作战报告", link: "/股票/A股特种作战报告" },
            { text: "散户作战原则", link: "/股票/散户作战原则" },
            { text: "散户购买资产建议", link: "/股票/A股散户可以购买的资产" },
            { text: "普通人非线性财富跃迁指南", link: "/股票/普通人非线性财富跃迁指南" },
            { text: "穷人翻盘指南", link: "/股票/穷人翻盘指南" },
          ],
        },
        {
          text: "🪙 数字黄金与宏观",
          items: [
            { text: "比特币：共识与主权", link: "/股票/比特币" },
            { text: "美元与比特币", link: "/股票/美元与比特币" },
          ],
        },
        {
          text: "🧠 心理博弈",
          items: [
            { text: "散户的真相", link: "/股票/散户的真相" },
            { text: "散户顶级心理陷阱", link: "/股票/散户顶级心理陷阱" },
            { text: "行为：追涨杀跌", link: "/股票/追涨杀跌" },
          ],
        },
      ],
      "/编程题/": [
        {
          text: "🗺️ 总览",
          items: [
            { text: "模块地图", link: "/编程题/CLAUDE" },
            { text: "完整图谱", link: "/编程题/前端工程师场景题与编程题完整图谱" },
          ],
        },
        {
          text: "第一层：核心手写",
          items: [
            { text: "1.1 JavaScript 核心手写实战", link: "/编程题/1.1 JavaScript 核心手写实战" },
            { text: "1.2 异步编程专题", link: "/编程题/1.2 异步编程专题" },
            { text: "1.3 数据处理与工具函数", link: "/编程题/1.3 数据处理与工具函数" },
            { text: "1.4 设计模式实现", link: "/编程题/1.4 设计模式实现" },
            { text: "1.5 DOM 与事件", link: "/编程题/1.5 DOM 与事件" },
          ],
        },
        {
          text: "第二层：场景题",
          items: [
            { text: "2.2 状态与数据同步", link: "/编程题/2.2 状态与数据同步的核心挑战" },
            { text: "2.3 大数据与性能", link: "/编程题/2.3 大数据与性能场景" },
            { text: "2.4 文件处理", link: "/编程题/2.4 文件处理场景" },
            { text: "2.5 实时通信", link: "/编程题/2.5 实时通信场景" },
            { text: "2.6 安全与稳定性", link: "/编程题/2.6 安全与稳定性场景" },
          ],
        },
        {
          text: "第三层：专项深度",
          items: [
            { text: "3.1 复杂交互与动画", link: "/编程题/3.1 复杂交互与动画" },
            { text: "3.2 音视频与媒体", link: "/编程题/3.2 音视频与媒体" },
            { text: "3.3 编辑器场景", link: "/编程题/3.3 编辑器场景" },
            { text: "3.4 可视化与图形", link: "/编程题/3.4 可视化与图形" },
            { text: "3.5 工程架构", link: "/编程题/3.5 工程架构" },
            { text: "3.6 组件与 SDK 设计", link: "/编程题/3.6 组件与 SDK 设计" },
            { text: "3.7 监控与可观测性", link: "/编程题/3.7 监控与可观测性" },
            { text: "3.8 跨端场景", link: "/编程题/3.8 跨端场景" },
            { text: "3.9 Node.js BFF", link: "/编程题/3.9 Node.js BFF" },
            { text: "3.10 新技术方向", link: "/编程题/3.10 新技术方向" },
          ],
        },
        {
          text: "第四层：原理与进阶",
          items: [
            { text: "4.1 TypeScript 类型编程", link: "/编程题/4.1 TypeScript 类型编程" },
            { text: "4.2 框架原理深度", link: "/编程题/4.2 框架原理深度" },
            { text: "4.3 浏览器原理应用", link: "/编程题/4.3 浏览器原理应用" },
            { text: "4.4 调试与问题排查", link: "/编程题/4.4 调试与问题排查" },
            { text: "4.5 稳定性与质量", link: "/编程题/4.5 稳定性与质量" },
            { text: "4.6 移动端专项", link: "/编程题/4.6 移动端专项" },
            { text: "4.7 安全专项", link: "/编程题/4.7 安全专项" },
            { text: "4.8 算法在前端的实际应用", link: "/编程题/4.8 算法在前端的实际应用" },
            { text: "4.9 国际化与可访问性", link: "/编程题/4.9 国际化与可访问性" },
          ],
        },
      ],
      "/算法题/": [
        {
          text: "🧠 算法归档",
          items: [
            { text: "🗺️ 模块地图", link: "/算法题/CLAUDE" },
            { text: "前端面试必刷50题", link: "/算法题/前端面试必刷50题" },
            { text: "为什么二叉树占比高", link: "/算法题/为什么二叉树占比高" },
            { text: "1. 数组与双指针", link: "/算法题/1 数组与双指针（19题）" },
            { text: "2. 链表", link: "/算法题/2 链表（18题）" },
            { text: "3. 二叉树", link: "/算法题/3 二叉树（31题）" },
            { text: "4. 二分查找", link: "/算法题/4 二分查找（10题）" },
          ],
        },
      ],
      "/新闻/": [
        {
          text: "📰 新闻与洞察",
          items: [
            { text: "🗺️ 模块地图", link: "/新闻/CLAUDE" },
            { text: "2026-02-25", link: "/新闻/2026-02-25" },
            { text: "2026-02-23", link: "/新闻/2026-02-23" },
            { text: "2026-02-22", link: "/新闻/2026-02-22" },
            { text: "2026-02-18", link: "/新闻/2026-02-18" },
            { text: "2026-02-17", link: "/新闻/2026-02-17" },
            { text: "2026-02-15", link: "/新闻/2026-02-15" },
            { text: "AI 算力与军事推演", link: "/新闻/ai-military-projection" },
          ],
        },
      ],
      "/故乡/": [
        {
          text: "🌲 故乡考察与地理",
          items: [
            { text: "🗺️ 模块地图", link: "/故乡/CLAUDE" },
            {
              text: "沾河·五大连池·北安：对比",
              link: "/故乡/沾河·五大连池·北安：古代民族分布对比",
            },
            {
              text: "乌裕尔河与蒲峪路",
              link: "/故乡/乌裕尔河与蒲峪路：关联确信度分析",
            },
            { text: "小兴安岭腹地穿梭", link: "/故乡/小兴安岭林场腹地穿梭" },
            {
              text: "乌裕尔河：古代地位",
              link: "/故乡/乌裕尔河：古代地位为何高现在为何鲜为人知",
            },
            {
              text: "乌裕尔河在金代可能叫蒲峪河",
              link: "/故乡/乌裕尔河在金代可能叫做蒲峪河？",
            },
            {
              text: "索伦部与乌裕尔河沾河",
              link: "/故乡/索伦部与乌裕尔河沾河：东北民族地理深度探究",
            },
            { text: "沾河林场独特性", link: "/故乡/沾河林场独特性" },
            { text: "龙门山", link: "/故乡/龙门山" },
          ],
        },
      ],
      "/AI编程技巧/": [
        {
          text: "🤖 AI 编程",
          items: [
            { text: "🗺️ 模块地图", link: "/AI编程技巧/CLAUDE" },
            {
              text: "ClaudeCode 深度使用手册",
              link: "/AI编程技巧/ClaudeCode深度使用手册",
            },
          ],
        },
      ],
      "/RDK/": [
        {
          text: "🏢 顶级工业案例 (RDK)",
          items: [
            { text: "🗺️ rdk 模块地图", link: "/RDK/CLAUDE" },
            {
              text: "Layout-Box 渲染引擎深度剖析",
              link: "/RDK/Layout-Box渲染引擎深度剖析",
            },
          ],
        },
      ],
      "/算法概念/": [
        {
          text: "🧠 算法概念",
          items: [
            { text: "🗺️ 模块地图", link: "/算法概念/CLAUDE" },
            {
              text: "时间复杂度全景指南",
              link: "/算法概念/时间复杂度全景指南",
            },
            {
              text: "空间复杂度全景指南",
              link: "/算法概念/空间复杂度全景指南",
            },
            { text: "理解 O(log n)", link: "/算法概念/理解 O(log n)" },
          ],
        },
      ],
      "/提示词/": [
        {
          text: "💡 提示词与协作框架",
          items: [
            { text: "🗺️ 模块地图", link: "/提示词/CLAUDE" },
            { text: "技术合伙人协作框架", link: "/提示词/技术合伙人协作框架" },
          ],
        },
        {
          text: "⚙️ 系统级提示词",
          items: [
            {
              text: "System Prompt 深度分析报告",
              link: "/提示词/系统/System Prompt 深度分析报告",
            },
            {
              text: "完整系统提示词_中文",
              link: "/提示词/系统/完整系统提示词_中文",
            },
            {
              text: "完整系统提示词_英文",
              link: "/提示词/系统/完整系统提示词_英文",
            },
            {
              text: "ClaudeCode 工具深入分析",
              link: "/提示词/系统/ClaudeCode工具深入分析",
            },
            {
              text: "Antigravity 工具深入分析",
              link: "/提示词/系统/Antigravity工具深入分析",
            },
          ],
        },
      ],
      "/TIL/": [
        {
          text: "📝 日常碎片 (TIL)",
          items: [
            { text: "🗺️ 模块地图", link: "/TIL/CLAUDE" },
            {
              text: "从冬奥会U型场地到神经科学",
              link: "/TIL/从冬奥会U型场地到神经科学-早教的终极逻辑",
            },
            {
              text: "星巴克店员是否能免费喝咖啡",
              link: "/TIL/星巴克店员是否能免费喝咖啡",
            },
          ],
        },
        {
          text: "🤖 AI 时代思考专栏",
          items: [
            {
              text: "01-爱因斯坦测试与2015年测试",
              link: "/TIL/AI时代思考/01-爱因斯坦测试与2015年测试",
            },
            {
              text: "02-苦涩的教训与Scaling的命运",
              link: "/TIL/AI时代思考/02-苦涩的教训与Scaling的命运",
            },
            {
              text: "03-硅基智能的三大物理切面",
              link: "/TIL/AI时代思考/03-硅基智能的三大物理切面",
            },
            {
              text: "04-优化vs创造：AI能力的哲学分界线",
              link: "/TIL/AI时代思考/04-优化vs创造：AI能力的哲学分界线",
            },
            {
              text: "05-发现与发明难度天梯",
              link: "/TIL/AI时代思考/05-发现与发明难度天梯：AI与人类能力边界分析",
            },
            {
              text: "06-多米诺骨牌：AI发明AI之后的世界",
              link: "/TIL/AI时代思考/06-多米诺骨牌：AI发明AI之后的世界",
            },
            {
              text: "07-爱因斯坦的不可替代性",
              link: "/TIL/AI时代思考/07-爱因斯坦的不可替代性：天才与AI的边界",
            },
            {
              text: "08-高NFC与ADHD：AI时代稀缺素质",
              link: "/TIL/AI时代思考/08-高NFC与ADHD：AI时代真正稀缺的意义建构能力",
            },
            {
              text: "09-终局验证",
              link: "/TIL/AI时代思考/09-终局验证：如何向世界证明你属于AI时代",
            },
            {
              text: "10-AI时代认知与生存指南",
              link: "/TIL/AI时代思考/10-AI时代认知与生存指南(完整汇总)",
            },
          ],
        },
      ],
      "/SKILL/": [
        {
          text: "深入执行 (Deep Execution)",
          items: [
            { text: "深入执行", link: "/SKILL/深入执行/深入执行" },
            {
              text: "Deep Execution Protocol",
              link: "/SKILL/深入执行/Deep Execution Protocol",
            },
          ],
        },
        {
          text: "零幻觉分析 (Zero-Hallucination)",
          items: [
            { text: "零幻觉分析", link: "/SKILL/零幻觉分析/零幻觉分析" },
            {
              text: "Zero-Hallucination Analyst Skill",
              link: "/SKILL/零幻觉分析/Zero-Hallucination Analyst Skill",
            },
          ],
        },
        {
          text: "严格代码 (Iron-Clad Execution)",
          items: [
            { text: "严格代码", link: "/SKILL/严格代码/严格代码" },
            {
              text: "Iron-Clad Execution Skill",
              link: "/SKILL/严格代码/Iron-Clad Execution Skill",
            },
          ],
        },
        {
          text: "去AI前端风格 (High-Agency Frontend)",
          items: [
            { text: "去AI前端风格", link: "/SKILL/去AI前端风格/去AI前端风格" },
            {
              text: "High-Agency Frontend Skill",
              link: "/SKILL/去AI前端风格/High-Agency Frontend Skill",
            },
          ],
        },
      ],
      "/更新日志/": [
        {
          text: "🔄 系统更新日志",
          items: [
            { text: "🗺️ 模块地图", link: "/更新日志/CLAUDE" },
            { text: "React更新日志 (中文版)", link: "/更新日志/react-zh" },
            { text: "Antigravity 工具更新", link: "/更新日志/antigravity" },
            {
              text: "Antigravity更新 (中文版)",
              link: "/更新日志/antigravity-zh",
            },
            { text: "Gemini CLI更新日志", link: "/更新日志/gemini" },
            {
              text: "Gemini Agent Skill",
              link: "/更新日志/gemini-agent-skill",
            },
          ],
        },
        {
          text: "🟢 Vue 更新日志",
          items: [
            { text: "Vue CHANGELOG (中文版)", link: "/更新日志/vue/CHANGELOG-zh" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/exposir/heptabase-learn" },
    ],

    footer: {
      message: "Released under the CC-BY-NC-SA-4.0 License.",
      copyright: "Copyright © 2024-present exposir",
    },

    search: {
      provider: "local",
    },
  },
});
