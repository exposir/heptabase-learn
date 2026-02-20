<!--
- [INPUT]: 依赖 system/CLAUDE.md 的模块定位与索引
- [OUTPUT]: 本文档提供 Antigravity工具深入分析.md 的内容与知识
- [POS]: system/ 的知识文档 (L3)
- [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->

# Antigravity 工具深入分析

> 分析时间：2026-01-27
> 数据来源：Antigravity AI 运行时注入的工具定义

---

## 一、工具分类概览

Antigravity 提供了 22 个工具，按功能可分为以下类别：

| 类别          | 工具数 | 核心能力             |
| ------------- | ------ | -------------------- |
| **文件操作**  | 7      | 读取、编辑、创建文件 |
| **命令执行**  | 4      | 终端命令、交互式输入 |
| **搜索/导航** | 4      | 文件查找、内容搜索   |
| **网络/检索** | 2      | URL 获取、Web 搜索   |
| **任务管理**  | 2      | 任务边界、用户通知   |
| **AI 创作** ★ | 2      | 图像生成、浏览器代理 |
| **MCP/扩展**  | 2      | 资源读取             |

---

## 二、工具详细接口定义

### 2.1 文件操作类

#### `view_file`

**职责**：查看文件内容（支持部分文件和二进制文件）

| 参数           | 类型    | 必填 | 说明                |
| -------------- | ------- | ---- | ------------------- |
| `AbsolutePath` | string  | ✓    | 文件绝对路径        |
| `StartLine`    | integer | -    | 起始行（1-indexed） |
| `EndLine`      | integer | -    | 结束行（1-indexed） |

**设计特点**：

- 首次读取强制显示 800 行以理解文件全貌
- 支持图片/视频等二进制文件
- 输出带行号，便于后续编辑精确定位

---

#### `view_file_outline`

**职责**：查看文件大纲（函数、类结构）

| 参数           | 类型    | 必填 | 说明             |
| -------------- | ------- | ---- | ---------------- |
| `AbsolutePath` | string  | ✓    | 文件绝对路径     |
| `ItemOffset`   | integer | -    | 分页偏移，默认 0 |

**设计特点**：

- 探索文件的首选工具（优先于 view_file）
- 返回函数签名、行号范围
- 适合大型文件快速导航

---

#### `view_code_item`

**职责**：查看特定代码节点（类、函数）

| 参数        | 类型     | 必填 | 说明                              |
| ----------- | -------- | ---- | --------------------------------- |
| `File`      | string   | ✓    | 文件绝对路径                      |
| `NodePaths` | string[] | ✓    | 节点路径，如 `["Foo.bar", "baz"]` |

**设计特点**：

- 使用全限定名定位（如 `ClassName.methodName`）
- 可一次查看多个节点
- 避免重复读取整个文件

---

#### `replace_file_content`

**职责**：替换文件中的单个连续代码块

| 参数                 | 类型    | 必填 | 说明                       |
| -------------------- | ------- | ---- | -------------------------- |
| `TargetFile`         | string  | ✓    | 目标文件（必须第一个指定） |
| `TargetContent`      | string  | ✓    | 要替换的精确内容（含空白） |
| `ReplacementContent` | string  | ✓    | 替换后的内容               |
| `StartLine`          | integer | ✓    | 搜索范围起始行             |
| `EndLine`            | integer | ✓    | 搜索范围结束行             |
| `AllowMultiple`      | boolean | ✓    | 是否允许多处替换           |
| `Description`        | string  | ✓    | 变更说明（用户可见）       |
| `Complexity`         | integer | ✓    | 重要性评分（1-10）         |

**设计特点**：

- **精确匹配**：目标内容必须与文件完全一致（含空白）
- **行号约束**：在指定范围内搜索，避免误替换
- **元数据**：包含 Description 和 Complexity，支持变更审计

---

#### `multi_replace_file_content`

**职责**：替换文件中的多个非连续代码块

| 参数                | 类型    | 必填 | 说明                                                                  |
| ------------------- | ------- | ---- | --------------------------------------------------------------------- |
| `TargetFile`        | string  | ✓    | 目标文件                                                              |
| `ReplacementChunks` | array   | ✓    | 替换块数组，每块含 StartLine/EndLine/TargetContent/ReplacementContent |
| `Description`       | string  | ✓    | 变更说明                                                              |
| `Complexity`        | integer | ✓    | 重要性评分                                                            |

**设计特点**：

- 单次调用处理多处非连续编辑
- 避免多次调用 replace_file_content 的竞态问题
- 每个 chunk 独立验证

---

#### `write_to_file`

**职责**：创建新文件或覆盖已有文件

| 参数          | 类型    | 必填 | 说明                           |
| ------------- | ------- | ---- | ------------------------------ |
| `TargetFile`  | string  | ✓    | 目标文件路径（必须第一个指定） |
| `Overwrite`   | boolean | ✓    | 是否覆盖已有文件               |
| `CodeContent` | string  | ✓    | 文件内容                       |
| `EmptyFile`   | boolean | ✓    | 是否创建空文件                 |
| `IsArtifact`  | boolean | ✓    | 是否为 Artifact 文件           |
| `Description` | string  | ✓    | 变更说明                       |
| `Complexity`  | integer | ✓    | 重要性评分                     |

**设计特点**：

- 自动创建父目录
- 默认拒绝覆盖已有文件（需显式设置 Overwrite）
- 支持 Artifact 元数据（Type + Summary）

---

### 2.2 命令执行类

#### `run_command`

**职责**：执行终端命令

| 参数                | 类型    | 必填 | 说明                         |
| ------------------- | ------- | ---- | ---------------------------- |
| `CommandLine`       | string  | ✓    | 要执行的命令                 |
| `Cwd`               | string  | ✓    | 工作目录                     |
| `SafeToAutoRun`     | boolean | ✓    | 是否安全自动执行             |
| `WaitMsBeforeAsync` | integer | ✓    | 同步等待毫秒数（最大 10000） |

**设计特点**：

- **禁止 cd 命令**：必须通过 Cwd 参数指定目录
- **安全审批**：SafeToAutoRun=false 需用户确认
- **异步执行**：超时后转入后台，返回 CommandId

---

#### `command_status`

**职责**：获取后台命令状态

| 参数                   | 类型    | 必填 | 说明                       |
| ---------------------- | ------- | ---- | -------------------------- |
| `CommandId`            | string  | ✓    | 命令 ID                    |
| `WaitDurationSeconds`  | integer | ✓    | 等待完成的秒数（最大 300） |
| `OutputCharacterCount` | integer | -    | 输出字符数限制             |

---

#### `send_command_input`

**职责**：向运行中的命令发送输入或终止

| 参数            | 类型    | 必填 | 说明                          |
| --------------- | ------- | ---- | ----------------------------- |
| `CommandId`     | string  | ✓    | 命令 ID                       |
| `Input`         | string  | -    | 要发送的输入（含换行符）      |
| `Terminate`     | boolean | -    | 是否终止命令                  |
| `SafeToAutoRun` | boolean | ✓    | 是否安全自动执行              |
| `WaitMs`        | integer | ✓    | 等待输出的毫秒数（500-10000） |

**设计特点**：

- 支持交互式命令（REPL、vim 等）
- Input 和 Terminate 二选一

---

### 2.3 搜索/导航类

#### `find_by_name`

**职责**：按名称/模式查找文件

| 参数              | 类型     | 必填 | 说明                     |
| ----------------- | -------- | ---- | ------------------------ |
| `SearchDirectory` | string   | ✓    | 搜索目录                 |
| `Pattern`         | string   | ✓    | glob 模式                |
| `Type`            | string   | -    | 类型：file/directory/any |
| `Extensions`      | string[] | -    | 扩展名过滤               |
| `MaxDepth`        | integer  | -    | 最大搜索深度             |
| `Excludes`        | string[] | -    | 排除模式                 |
| `FullPath`        | boolean  | -    | 是否匹配完整路径         |

**设计特点**：

- 基于 fd 工具
- 智能大小写、自动忽略 .gitignore
- 结果上限 50 条

---

#### `grep_search`

**职责**：内容搜索

| 参数              | 类型     | 必填 | 说明                   |
| ----------------- | -------- | ---- | ---------------------- |
| `SearchPath`      | string   | ✓    | 搜索路径（文件或目录） |
| `Query`           | string   | ✓    | 搜索内容               |
| `IsRegex`         | boolean  | -    | 是否正则               |
| `CaseInsensitive` | boolean  | -    | 是否忽略大小写         |
| `MatchPerLine`    | boolean  | -    | 是否返回行内容         |
| `Includes`        | string[] | -    | 文件过滤 glob          |

**设计特点**：

- 基于 ripgrep
- 结果上限 50 条
- 返回 JSON 格式（文件名、行号、内容）

---

#### `list_dir`

**职责**：列出目录内容

| 参数            | 类型   | 必填 | 说明         |
| --------------- | ------ | ---- | ------------ |
| `DirectoryPath` | string | ✓    | 目录绝对路径 |

**设计特点**：

- 返回子项类型、大小、子项数量
- 适合目录探索

---

### 2.4 AI 创作类 ★

#### `generate_image` ★

**职责**：基于文本生成或编辑图像

| 参数         | 类型     | 必填 | 说明                                    |
| ------------ | -------- | ---- | --------------------------------------- |
| `Prompt`     | string   | ✓    | 图像生成提示词                          |
| `ImageName`  | string   | ✓    | 保存的图像名称（全小写下划线，最多 3 词） |
| `ImagePaths` | string[] | -    | 输入图像路径（用于编辑/组合，最多 3 张）  |

**设计特点**：

- **Antigravity 独有**
- 支持从零生成或基于现有图像编辑
- 输出保存为 Artifact

**用例**：

- UI Mockup 快速原型
- 图标/素材生成
- 设计迭代

---

#### `browser_subagent` ★

**职责**：控制浏览器进行 UI 自动化

| 参数            | 类型   | 必填 | 说明                                |
| --------------- | ------ | ---- | ----------------------------------- |
| `Task`          | string | ✓    | 详细的任务描述（给子代理的 prompt） |
| `TaskName`      | string | ✓    | 任务名称（人类可读）                |
| `RecordingName` | string | ✓    | 录制视频名称                        |

**设计特点**：

- **Antigravity 独有**
- 启动独立的浏览器子代理
- 自动录制为 WebP 视频
- 支持点击、输入、导航等操作

**用例**：

- 前端自动化测试
- 竞品分析
- 网页内容抓取

---

### 2.5 网络/检索类

#### `search_web`

**职责**：执行网络搜索

| 参数     | 类型   | 必填 | 说明           |
| -------- | ------ | ---- | -------------- |
| `query`  | string | ✓    | 搜索查询       |
| `domain` | string | -    | 优先搜索的域名 |

**设计特点**：

- 返回摘要 + URL 引用
- 弥补模型知识截止日期限制

---

#### `read_url_content`

**职责**：获取 URL 内容

| 参数  | 类型   | 必填 | 说明     |
| ----- | ------ | ---- | -------- |
| `Url` | string | ✓    | 目标 URL |

**设计特点**：

- HTML 转 Markdown
- 无 JavaScript 执行
- 不支持认证

---

### 2.6 任务管理类

#### `task_boundary`

**职责**：任务边界管理（进入/更新/退出任务模式）

| 参数                | 类型    | 必填 | 说明                            |
| ------------------- | ------- | ---- | ------------------------------- |
| `TaskName`          | string  | ✓    | 任务名称（UI 显示）             |
| `Mode`              | string  | ✓    | PLANNING/EXECUTION/VERIFICATION |
| `TaskSummary`       | string  | ✓    | 任务进展摘要                    |
| `TaskStatus`        | string  | ✓    | 当前状态（描述下一步）          |
| `PredictedTaskSize` | integer | ✓    | 预估剩余工具调用数              |

**设计特点**：

- 与 Artifact 系统（task.md/implementation_plan.md）联动
- 支持 `%SAME%` 复用上次值
- 类比 Claude Code 的 TodoWrite，但更强大

---

#### `notify_user`

**职责**：通知用户/请求审批

| 参数                | 类型     | 必填 | 说明                   |
| ------------------- | -------- | ---- | ---------------------- |
| `Message`           | string   | ✓    | 消息内容               |
| `PathsToReview`     | string[] | ✓    | 需要用户审阅的文件路径 |
| `BlockedOnUser`     | boolean  | ✓    | 是否阻塞等待用户反馈   |
| `ShouldAutoProceed` | boolean  | ✓    | 是否可自动继续         |

**设计特点**：

- 任务模式中与用户通信的唯一方式
- 支持文件审阅请求

---

## 三、设计哲学对比

### Claude Code vs Antigravity

| 维度         | Claude Code            | Antigravity                                                    |
| ------------ | ---------------------- | -------------------------------------------------------------- |
| **文件编辑** | 单一 `Edit` 工具       | 拆分为 `replace_file_content` + `multi_replace_file_content`   |
| **文件读取** | 单一 `Read` 工具       | 拆分为 `view_file` + `view_file_outline` + `view_code_item`    |
| **命令执行** | 单一 `Bash` 工具       | 拆分为 `run_command` + `command_status` + `send_command_input` |
| **任务管理** | `TodoWrite` + 规划模式 | `task_boundary` + Artifact 系统                                |
| **AI 创作**  | 无                     | `generate_image` + `browser_subagent`                          |

**Antigravity 的设计理念**：

1. **更细粒度**：将 Claude Code 的大工具拆分为多个专用工具
2. **异步优先**：命令执行支持后台运行和状态查询
3. **变更审计**：编辑工具要求 Description + Complexity
4. **AI 增强**：增加了图像生成和浏览器自动化能力

---

## 四、工具使用建议

### 文件操作最佳实践

1. **先 outline 后 view**：用 `view_file_outline` 快速定位，再用 `view_file`
   读取具体内容
2. **精确目标内容**：替换时确保 TargetContent 完全匹配（含空白）
3. **非连续编辑用 multi**：多处修改使用 `multi_replace_file_content`

### 命令执行最佳实践

1. **永远用 Cwd**：不要尝试 cd 命令
2. **合理设置 WaitMs**：预期快速完成的命令设置足够的等待时间
3. **长命令转后台**：使用 `command_status` 轮询结果

### AI 创作工具使用

1. **generate_image**：适合快速原型、UI Mockup、素材生成
2. **browser_subagent**：适合需要可视化验证的场景

---

## 五、技术局限性

1. **无源码访问**：工具实现代码不可见，只能通过接口定义推断行为
2. **无跨系统调用**：Antigravity 工具和 Claude Code 工具互相独立
3. **部分工具受限**：如 jupyter notebook (.ipynb) 不可编辑
4. **搜索结果上限**：find_by_name 和 grep_search 最多返回 50 条
