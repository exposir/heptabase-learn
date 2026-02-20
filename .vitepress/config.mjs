import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Heptabase Mirror",
  description: "Heptabase 知识图谱的 Git 备份与归档",
  base: "/heptabase-learn/",
  ignoreDeadLinks: true, // 增加死链容错，确保构建必过
  lastUpdated: true, // 开启最后更新时间，作为常青思维证明

  head: [["link", { rel: "icon", href: "/heptabase-learn/favicon.ico" }]],

  themeConfig: {
    outline: "deep", // 大纲支持深化，右侧提供更深层的锚点导航
    logo: "/logo.svg",
    nav: [
      { text: "🗂️ 归档浏览", link: "/前端开发的历史与哲学/" },
      { text: "💻 编程与算法", link: "/编程题/CLAUDE" },
      { text: "📈 股票实战", link: "/股票/CLAUDE" },
      { text: "📰 新闻与洞察", link: "/新闻/CLAUDE" },
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
              link: "/前端开发的历史与哲学/rdk/CLAUDE",
            },
            {
              text: "Layout-Box 渲染引擎深度剖析",
              link: "/前端开发的历史与哲学/rdk/Layout-Box渲染引擎深度剖析",
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
            { text: "A 股优质资产", link: "/股票/A股优质资产" },
            { text: "A 股只有大宗商品", link: "/股票/A股只有大宗商品" },
            { text: "A 股特种作战报告", link: "/股票/A股特种作战报告" },
            { text: "散户作战原则", link: "/股票/散户作战原则" },
            { text: "散户购买资产建议", link: "/股票/A股散户可以购买的资产" },
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
          text: "💻 编程题库",
          items: [
            { text: "🗺️ 模块地图", link: "/编程题/CLAUDE" },
            { text: "1.1 JavaScript 核心手写实战", link: "/编程题/1.1 JavaScript 核心手写实战" },
            { text: "1.2 异步编程专题", link: "/编程题/1.2 异步编程专题" },
            { text: "2.2 状态与数据同步的核心挑战", link: "/编程题/2.2 状态与数据同步的核心挑战" },
            { text: "3.5 工程架构", link: "/编程题/3.5 工程架构" },
            { text: "全部目录请见左侧地图导航", link: "/编程题/CLAUDE" }
          ]
        }
      ],
      "/算法题/": [
        {
          text: "🧠 算法归档",
          items: [
            { text: "🗺️ 模块地图", link: "/算法题/CLAUDE" },
            { text: "前端面试必刷50题", link: "/算法题/前端面试必刷50题" },
            { text: "1. 数组与双指针", link: "/算法题/1 数组与双指针（19题）" },
            { text: "2. 链表", link: "/算法题/2 链表（18题）" },
            { text: "3. 二叉树", link: "/算法题/3 二叉树（31题）" },
            { text: "4. 二分查找", link: "/算法题/4 二分查找（10题）" }
          ]
        }
      ],
      "/新闻/": [
        {
          text: "📰 新闻与洞察",
          items: [
            { text: "🗺️ 模块地图", link: "/新闻/CLAUDE" },
            { text: "2026-02-18", link: "/新闻/2026-02-18" },
            { text: "2026-02-17", link: "/新闻/2026-02-17" },
            { text: "2026-02-15", link: "/新闻/2026-02-15" },
            { text: "AI 算力与军事推演", link: "/新闻/ai-military-projection" }
          ]
        }
      ],
      "/北安/": [
        {
          text: "🌲 北安考察与地理",
          items: [
            { text: "🗺️ 模块地图", link: "/北安/CLAUDE" },
            { text: "沾河·五大连池·北安：对比", link: "/北安/沾河·五大连池·北安：古代民族分布对比" },
            { text: "乌裕尔河与蒲峪路", link: "/北安/乌裕尔河与蒲峪路：关联确信度分析" },
            { text: "小兴安岭腹地穿梭", link: "/北安/小兴安岭林场腹地穿梭" }
          ]
        }
      ],
      "/AI编程技巧/": [
        {
          text: "🤖 AI 编程",
          items: [
            { text: "🗺️ 模块地图", link: "/AI编程技巧/CLAUDE" },
            { text: "ClaudeCode 深度使用手册", link: "/AI编程技巧/ClaudeCode深度使用手册" },
          ]
        }
      ]
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
