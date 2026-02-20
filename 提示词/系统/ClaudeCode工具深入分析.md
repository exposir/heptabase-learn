<!--
- [INPUT]: 依赖 system/CLAUDE.md 的模块定位与索引
- [OUTPUT]: 本文档提供 ClaudeCode工具深入分析.md 的内容与知识
- [POS]: system/ 的知识文档 (L3)
- [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->

# Claude Code 工具深入分析

> 分析时间：2026-01-27
> 数据来源：Claude Code 插件系统提示词

---

## 一、工具分类概览

Claude Code 提供了 17 个工具，按功能可分为以下类别：

| 类别          | 工具数 | 核心能力             |
| ------------- | ------ | -------------------- |
| **代理调度**  | 2      | 子代理启动与输出     |
| **命令执行**  | 2      | Shell 命令、进程终止 |
| **文件操作**  | 4      | 读取、编辑、创建     |
| **搜索/导航** | 2      | 文件匹配、内容搜索   |
| **网络/检索** | 2      | URL 获取、Web 搜索   |
| **任务管理**  | 3      | 待办事项、规划模式   |
| **交互工具**  | 2      | 用户提问、技能调用   |

---

## 二、核心工具详细分析

### 2.1 代理调度类

#### `Task`

**职责**：启动专门的子代理处理复杂多步骤任务

**可用的子代理类型**：

| 子代理类型          | 用途                                 | 可用工具                                     |
| ------------------- | ------------------------------------ | -------------------------------------------- |
| `Bash`              | Git 操作、命令执行、终端任务         | Bash                                         |
| `general-purpose`   | 复杂问题研究、代码搜索、多步骤任务   | 全部工具 (\*)                                |
| `statusline-setup`  | 配置 Claude Code 状态栏设置          | Read, Edit                                   |
| `Explore`           | 代码库快速探索、文件查找、关键词搜索 | 除 Task/Edit/Write/NotebookEdit 外的所有工具 |
| `Plan`              | 实施方案设计、架构权衡分析           | 除 Task/Edit/Write/NotebookEdit 外的所有工具 |
| `claude-code-guide` | Claude Code 使用指南、API 帮助       | Glob, Grep, Read, WebFetch, WebSearch        |

**设计特点**：

- **减少上下文占用**：文件搜索时优先使用 Task 代理
- **专业化分工**：不同子代理有不同的工具权限
- **Explore 代理支持彻底程度**：quick / medium / very thorough
- **resume 参数**：可恢复已完成的 claude-code-guide 代理

---

#### `TaskOutput`

**职责**：子代理返回结果

**设计特点**：

- 接收子代理的执行结果
- 与 Task 工具配合使用

---

### 2.2 命令执行类

#### `Bash`

**职责**：Shell 命令执行

**设计原则**（来自系统提示词）：

- 优先使用专用工具（Read/Edit/Write）而非 bash 命令
- **禁止用 bash 与用户交流**：不能用 echo 输出说明
- 仅用于真正需要 shell 执行的系统命令

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | | 单一
`Bash` 工具 | 拆分为 `run_command` + `command_status` + `send_command_input` |
| 同步执行 | 支持异步执行和状态轮询 | | 无安全审批参数 | 有 `SafeToAutoRun`
参数 |

---

#### `KillShell`

**职责**：终止 Shell 进程

**设计特点**：

- 用于停止长时间运行的命令
- 与 Bash 工具配合使用

---

### 2.3 文件操作类

#### `Read`

**职责**：读取文件内容

**设计原则**：

- **先读后改**：绝不对未读代码提出修改建议
- 优先于 cat/head/tail 等 bash 命令

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | | 单一
`Read` 工具 | 拆分为 `view_file` + `view_file_outline` + `view_code_item` |
| 无大纲功能 | 有专门的大纲查看工具 |

---

#### `Edit`

**职责**：编辑文件内容

**设计原则**：

- 优先于 sed/awk 等 bash 命令
- 保持简洁，避免过度设计

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | | 单一
`Edit` 工具 | 拆分为 `replace_file_content` + `multi_replace_file_content` |
| 无变更元数据 | 需要 Description + Complexity | | 无行号约束 | 需要 StartLine +
EndLine |

---

#### `Write`

**职责**：创建/写入文件

**设计原则**：

- 优先于 echo/heredoc 等 bash 命令
- **禁止滥用**：绝不创建不必要的文件，优先编辑现有文件

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | | 单一
`Write` 工具 | `write_to_file`（功能类似） |
| 无 Artifact 元数据 | 支持 IsArtifact + ArtifactMetadata |

---

#### `NotebookEdit`

**职责**：Jupyter Notebook 编辑

**设计特点**：

- 专用于 .ipynb 文件
- 普通 Edit 工具不支持 Notebook

---

### 2.4 搜索/导航类

#### `Glob`

**职责**：文件模式匹配

**设计原则**：

- 用于快速查找文件
- 推荐使用 Task(Explore) 代理进行更全面的搜索

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | | `Glob`
| `find_by_name` | | 基础 glob 匹配 | 基于 fd，支持更多过滤选项 |

---

#### `Grep`

**职责**：内容搜索

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | | `Grep`
| `grep_search` | | 基础内容搜索 | 基于 ripgrep，JSON 格式输出 |

---

### 2.5 网络/检索类

#### `WebFetch`

**职责**：获取 URL 内容

**设计原则**：

- 遇到重定向时立即使用新 URL 发起请求
- **禁止猜测 URL**：只能使用用户提供或文件中的 URL

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | |
`WebFetch` | `read_url_content` | | 功能类似 | 功能类似 |

---

#### `WebSearch`

**职责**：网络搜索

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | |
`WebSearch` | `search_web` | | 功能类似 | 功能类似 |

---

### 2.6 任务管理类

#### `TodoWrite`

**职责**：待办事项管理

**设计原则**（系统提示词强调）：

- **VERY frequently 使用**：确保跟踪任务和进度可见性
- **立即标记完成**：完成任务后立即标记，不要批量处理
- 用于规划大型复杂任务
- **不用就会忘记重要任务**

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | |
`TodoWrite` | `task_boundary` + Artifact 系统 |
| 简单待办列表 | 完整的任务模式（PLANNING/EXECUTION/VERIFICATION） |
| 无 UI 状态 | 有 TaskName/TaskStatus/TaskSummary 显示 |

---

#### `EnterPlanMode`

**职责**：进入规划模式

**设计特点**：

- 与 Plan 子代理配合
- 进入后无法使用编辑类工具

---

#### `ExitPlanMode`

**职责**：退出规划模式

---

### 2.7 交互工具类

#### `AskUserQuestion`

**职责**：向用户提问

**设计原则**：

- 需要澄清、验证假设或做不确定决策时使用
- **禁止包含时间预估**

**与 Antigravity 的对比**：| Claude Code | Antigravity | | --- | --- | |
`AskUserQuestion` | `notify_user` | | 纯提问 | 支持文件审阅请求、阻塞状态控制 |

---

#### `Skill`

**职责**：调用技能

**设计特点**：

- 扩展能力调用
- 类似于 Antigravity 中可能存在的技能系统

---

## 三、设计哲学总结

### Claude Code 的核心设计理念

1. **专用工具优先**
   - Read > cat/head/tail
   - Edit > sed/awk
   - Write > echo/heredoc
   - 避免用 Bash 做文件操作

2. **代理分层架构**
   - 主代理负责决策
   - Task 子代理处理专门任务
   - 减少主上下文占用

3. **极简主义**
   - 不创建不必要的文件
   - 不添加不必要的功能
   - 避免过度设计

4. **任务跟踪强制**
   - TodoWrite 频繁使用
   - 立即标记完成
   - 防止遗漏

---

## 四、Claude Code vs Antigravity 工具对照表

| Claude Code 工具  | Antigravity 对应工具                                 | 差异说明                       |
| ----------------- | ---------------------------------------------------- | ------------------------------ |
| `Task`            | `browser_subagent`, `task_boundary`                  | Antigravity 无 Task 子代理架构 |
| `TaskOutput`      | —                                                    | Antigravity 无对应             |
| `Bash`            | `run_command`                                        | Antigravity 拆分更细           |
| `KillShell`       | `send_command_input(Terminate)`                      | 功能合并                       |
| `Glob`            | `find_by_name`                                       | 接口重构                       |
| `Grep`            | `grep_search`                                        | 接口重构                       |
| `Read`            | `view_file`, `view_file_outline`, `view_code_item`   | Antigravity 拆分更细           |
| `Edit`            | `replace_file_content`, `multi_replace_file_content` | Antigravity 有变更元数据       |
| `Write`           | `write_to_file`                                      | Antigravity 有 Artifact 支持   |
| `NotebookEdit`    | —                                                    | Antigravity 不支持 Notebook    |
| `WebFetch`        | `read_url_content`                                   | 功能类似                       |
| `WebSearch`       | `search_web`                                         | 功能类似                       |
| `TodoWrite`       | `task_boundary`                                      | Antigravity 更强大的任务系统   |
| `EnterPlanMode`   | task_boundary(Mode=PLANNING)                         | 概念映射                       |
| `ExitPlanMode`    | task_boundary(Mode 切换)                             | 概念映射                       |
| `AskUserQuestion` | `notify_user`                                        | Antigravity 功能更丰富         |
| `Skill`           | —                                                    | 可能有对应但未明确             |
| —                 | `generate_image`                                     | **Antigravity 独有**           |
| —                 | `browser_subagent`                                   | **Antigravity 独有**           |

---

## 五、技术局限性

1. **接口定义不完整**：Claude
   Code 系统提示词只描述了工具名称和用途，没有详细的参数定义
2. **无源码访问**：无法看到具体实现
3. **信息来源单一**：完全基于系统提示词推断，可能不完整
