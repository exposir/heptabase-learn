import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Heptabase Learn",
  description: "前端与大模型知识库 - 用 Heptabase + Markdown + Git 构建的思想实验室",
  
  themeConfig: {
    logo: 'https://heptabase.com/favicon.ico',
    nav: [
      { text: '首页', link: '/' },
      { text: '前端哲学史', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/README' },
      { text: '关于', link: 'https://github.com/exposir' }
    ],

    sidebar: {
      '/前端开发的历史与哲学：从混沌到秩序的技术演进史/': [
        {
          text: '📖 前端哲学全景',
          items: [
            { text: '引言：代码背后的形而上学', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/README' },
          ]
        },
        {
          text: '🏛️ 哲学与范式',
          items: [
            { text: 'MVC 模式的哲学解构', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/MVC模式的哲学解构：架构思想的深度剖析' },
            { text: '三大框架与 MVC 的继承与超越', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/三大框架与MVC：继承、重构与超越' },
            { text: 'Smalltalk 简史：面向对象实验室', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/Smalltalk简史：面向对象编程的理念实验室' },
          ]
        },
        {
          text: '🦀 Rust + Wasm 工业实战',
          items: [
            { text: 'Wasm 渲染器基础实战', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/Rust+WebAssembly前端渲染器实战：从理论到实践' },
            { text: '企业级渲染器架构设计', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/Rust企业级前端渲染器架构设计：从表格到甘特图的工程实践' },
            { text: 'React 与 Rust 职责边界澄清', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/React与Rust职责边界的澄清：为什么Canvas API调用在Rust侧' },
            { text: '架构权力划分：谁决定渲染什么', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/React与Rust的职责边界澄清：谁决定渲染什么' },
            { text: '技术反思：你在重新发明轮子', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/命令式+基础组件改造vs Preact：你在重新发明轮子' },
            { text: '实现路径：不一定要重新发明轮子', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/命令式渲染的多种实现路径：不一定要重新发明轮子' },
          ]
        },
        {
          text: '📊 深度决策与案例',
          items: [
            { text: 'project_manager_fe 实战剖析', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/React+Rust混合架构深度剖析：project_manager_fe表格渲染的性能优化实践' },
            { text: 'React Scheduler 架构抉择', link: '/前端开发的历史与哲学：从混沌到秩序的技术演进史/React Scheduler的存在必然性：声明式vs命令式的架构抉择' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/exposir/heptabase-learn' }
    ],

    footer: {
      message: 'Released under the CC-BY-NC-SA-4.0 License.',
      copyright: 'Copyright © 2024-present exposir'
    },

    search: {
      provider: 'local'
    }
  }
})