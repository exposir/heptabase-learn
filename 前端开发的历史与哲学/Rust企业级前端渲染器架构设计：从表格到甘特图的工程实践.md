<!--
- [INPUT]: 依赖 README.md 第12.3章 WebAssembly 内容和 Rust+WebAssembly 实战文章的基础知识
- [OUTPUT]: 输出 React + Rust 混合架构的企业级渲染器设计，深度剖析职责划分与协作原理（约12000字）
- [POS]: 位于 前端开发的历史与哲学 目录下的专题实战文章，专题3/N
- [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->

# Rust 企业级前端渲染器架构设计：从表格到甘特图的工程实践

> React 管状态，Rust 管计算——扬长避短的混合架构哲学

## 引言：为什么是 React + Rust 混合架构？

### 问题的本质

企业级数据密集型应用面临两个矛盾需求：

**需求 1：极致性能**
- 10万+ 行表格需要 60fps 流畅滚动
- 复杂甘特图的拖拽零延迟
- 实时协作的毫秒级响应

**需求 2：开发效率**
- 快速迭代业务逻辑
- 状态管理的可维护性
- 丰富的生态系统支持

**DOM 的困境**：
```
10万行表格 → DOM 节点：200万+ → 内存：2GB+ → 卡死
```

**纯 Rust 的困境**：
- 重建整个 GUI 系统（状态、事件、文本编辑...）
- 开发周期：6-12 个月
- 代码量：30,000+ 行

### 混合架构的智慧

**核心思想**：让 JavaScript 和 Rust 各自做擅长的事。

```
┌─────────────────────────────────────────────────────────┐
│                    React (JavaScript)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  状态管理    │  │  用户交互    │  │  业务逻辑    │  │
│  │  (useState)  │  │  (onClick)   │  │  (过滤/排序) │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                 │          │
│         └─────────────────┼─────────────────┘          │
│                           ↓                            │
│                 调用 Rust WebAssembly                   │
└───────────────────────────┼─────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                 Rust (WebAssembly)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ 虚拟滚动计算 │  │  布局计算    │  │ Canvas 绘制  │  │
│  │ (可见范围)   │  │ (行列坐标)   │  │ (像素渲染)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**职责划分**：

| 层次 | React 负责 | Rust 负责 |
|------|-----------|-----------|
| **数据层** | 状态管理（Redux/Zustand）<br>数据获取（API 调用） | 数据结构优化<br>大规模数据处理 |
| **交互层** | 事件监听（onClick/onScroll）<br>拖拽逻辑（react-dnd） | 命中测试计算<br>碰撞检测 |
| **渲染层** | DOM 辅助元素（输入框、菜单）<br>Canvas 容器 | Canvas 绘制<br>虚拟滚动计算 |
| **性能层** | useMemo/useCallback 优化 | 计算密集型算法<br>并行计算（Web Worker） |

**关键洞察**：
- **不是"Rust 取代 React"**，而是"Rust 加速 React"
- **不是"重建浏览器"**，而是"优化性能热点"
- **不是"全部用 Rust"**，而是"在需要的地方用 Rust"

---

## 第一章：架构设计原则——分层与解耦

### 1.1 为什么分层？

**架构的本质**：管理复杂性的手段。

```
┌─────────────────────────────────────────┐
│         应用层 (React Components)         │  ← 业务逻辑
├─────────────────────────────────────────┤
│        接口层 (Hooks / API)              │  ← 稳定契约
├─────────────────────────────────────────┤
│     计算层 (Rust WebAssembly)            │  ← 性能热点
├─────────────────────────────────────────┤
│       渲染层 (Canvas API)                │  ← 底层 API
└─────────────────────────────────────────┘
```

**分层的好处**：
1. **关注点分离**：业务逻辑与性能优化解耦
2. **可替换性**：可以用 JavaScript 实现替换 Rust 实现（降级方案）
3. **可测试性**：每层可独立测试
4. **渐进式迁移**：可以逐步将性能瓶颈迁移到 Rust

### 1.2 接口设计哲学

**核心原则**：最小化跨语言边界的数据传输。

**反例（低效）**：
```javascript
// ❌ 每次渲染都传递整个数据集
const renderTable = (rows) => {
  const allCells = wasmRenderer.render(rows); // 传递 100MB 数据
  drawToCanvas(allCells);
};
```

**正例（高效）**：
```javascript
// ✅ 只传递必要的参数，数据保存在 Rust 侧
const renderTable = () => {
  wasmRenderer.render(scrollTop, viewportHeight); // 只传 2 个数字
};
```

**设计要点**：
1. **数据所有权**：大数据集存储在 Rust 侧（WebAssembly 线性内存）
2. **最小接口**：只传递必要的标量参数（数字、布尔值）
3. **批量操作**：批量更新而非逐个元素更新

### 1.3 数据流动方向

```
用户操作
   ↓
React 事件处理（onClick）
   ↓
更新 React State（setState）
   ↓
调用 Rust API（wasmRenderer.updateData）
   ↓
Rust 计算可见范围
   ↓
Rust 绘制到 Canvas
   ↓
用户看到更新
```

**单向数据流**：保证可预测性，避免循环依赖。

---

## 第二章：虚拟滚动原理——性能飞跃的核心

### 2.1 为什么需要虚拟滚动？

**问题场景**：渲染 10 万行 × 20 列的表格

**全量渲染的灾难**：
```
Canvas 绘制调用：10万行 × 20列 × 2次(背景+文本) = 400万次
首次渲染时间：~5 秒
内存占用：每行 200 字节 × 10万 = 20MB（持续增长）
```

**虚拟滚动的魔法**：
```
可见区域：20 行（1080p 屏幕）
绘制调用：20 × 20 × 2 = 800 次
首次渲染时间：&lt; 16ms（60fps）
内存占用：恒定 4KB（只存可见行）
```

**性能提升**：从 5 秒降至 16ms，提升 **300 倍**。

### 2.2 虚拟滚动的数学模型

**核心概念**：根据滚动位置，计算**可见范围**的行索引。

```
┌─────────────────────────────────┐
│  Viewport (可见区域)             │  ← 用户看到的部分
│  ┌─────────────────────────┐    │
│  │ 行 1005                 │    │
│  │ 行 1006                 │    │
│  │ 行 1007                 │    │
│  │ ...                     │    │
│  │ 行 1025                 │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
     ↑
总数据：100,000 行
实际渲染：21 行（1005-1025）
```

**计算公式**：

```rust
// 固定行高场景
start_index = floor(scroll_top / row_height)
visible_count = ceil(viewport_height / row_height)
end_index = start_index + visible_count

// 缓冲区（避免滚动时白屏）
start_index = max(0, start_index - buffer_size)
end_index = min(total_rows, end_index + buffer_size)
```

**变高场景**（复杂甘特图）：
```rust
// 需要维护累积高度数组
累积高度 = [0, 50, 120, 200, 250, ...]
             ↑   ↑    ↑    ↑    ↑
           行0  行1  行2  行3  行4

// 二分查找可见范围
start_index = binary_search(累积高度, scroll_top)
end_index = binary_search(累积高度, scroll_top + viewport_height)
```

### 2.3 React + Rust 协作实现

**React 侧（状态管理）**：

```javascript
import { useVirtualScroll } from './hooks/useVirtualScroll';

function TableComponent({ data }) {
  const {
    scrollTop,           // 当前滚动位置
    visibleRange,        // 可见范围 [start, end]
    handleScroll,        // 滚动事件处理
  } = useVirtualScroll({
    totalRows: data.length,
    rowHeight: 40,
    viewportHeight: 600,
  });

  // 只渲染可见行
  const visibleRows = data.slice(visibleRange[0], visibleRange[1]);

  return (
    <div onScroll={handleScroll}>
      <canvas ref={canvasRef} />
    </div>
  );
}
```

**Rust 侧（计算 + 绘制）**：

```rust
#[wasm_bindgen]
pub struct VirtualTable {
    total_rows: usize,
    row_height: f64,
    viewport_height: f64,
}

#[wasm_bindgen]
impl VirtualTable {
    /// 计算可见范围
    pub fn calculate_visible_range(&self, scroll_top: f64) -> Vec<usize> {
        let start = (scroll_top / self.row_height).floor() as usize;
        let count = (self.viewport_height / self.row_height).ceil() as usize;
        let end = (start + count).min(self.total_rows);

        vec![start, end]
    }

    /// 绘制可见行（调用 Canvas API）
    pub fn render(&self, ctx: &CanvasRenderingContext2d, scroll_top: f64) {
        let range = self.calculate_visible_range(scroll_top);
        let offset_y = range[0] as f64 * self.row_height - scroll_top;

        for row_idx in range[0]..range[1] {
            let y = offset_y + (row_idx - range[0]) as f64 * self.row_height;
            self.draw_row(ctx, row_idx, y);
        }
    }

    fn draw_row(&self, ctx: &CanvasRenderingContext2d, row_idx: usize, y: f64) {
        // 绘制行背景
        ctx.set_fill_style(&"#f9f9f9".into());
        ctx.fill_rect(0.0, y, 1920.0, self.row_height);

        // 绘制文本（简化）
        ctx.set_fill_style(&"#333".into());
        ctx.set_font("14px Arial");
        let _ = ctx.fill_text(&format!("Row {}", row_idx), 10.0, y + 25.0);
    }
}
```

**调用示例**：

```javascript
// 初始化
const table = new VirtualTable(100000, 40, 600);

// 滚动事件
const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  table.render(canvasCtx, scrollTop);
};
```

**关键点**：
1. **React** 管理滚动状态（scrollTop）
2. **Rust** 计算可见范围 + 绘制
3. **数据** 存储在 Rust 侧（避免跨语言传输）

---

## 第三章：Canvas 渲染优化——分层与脏区域

### 3.1 为什么需要分层？

**问题**：每次交互都全量重绘整个 Canvas 太浪费。

**场景分析**：

| 层级 | 变化频率 | 示例 |
|------|----------|------|
| **静态层** | 几乎不变 | 背景、网格线、表头 |
| **动态层** | 数据变化时 | 表格单元格内容 |
| **交互层** | 实时变化 | 拖拽预览、选区高亮、鼠标悬停 |

**分层策略**：

```
┌─────────────────────────────────┐
│    交互层 Canvas (最上层)        │  ← z-index: 3, 透明背景
├─────────────────────────────────┤
│    动态层 Canvas (中间层)        │  ← z-index: 2, 透明背景
├─────────────────────────────────┤
│    静态层 Canvas (底层)          │  ← z-index: 1, 不透明背景
└─────────────────────────────────┘
```

**React 组件实现**：

```javascript
function LayeredCanvas() {
  const staticRef = useRef();
  const dynamicRef = useRef();
  const interactiveRef = useRef();

  useEffect(() => {
    // 只渲染一次静态层
    renderStaticLayer(staticRef.current);
  }, []);

  useEffect(() => {
    // 数据变化时重绘动态层
    renderDynamicLayer(dynamicRef.current, data);
  }, [data]);

  const handleMouseMove = (e) => {
    // 实时更新交互层
    renderInteractiveLayer(interactiveRef.current, e);
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={staticRef} style={{ position: 'absolute', zIndex: 1 }} />
      <canvas ref={dynamicRef} style={{ position: 'absolute', zIndex: 2 }} />
      <canvas ref={interactiveRef} style={{ position: 'absolute', zIndex: 3 }}
              onMouseMove={handleMouseMove} />
    </div>
  );
}
```

**性能收益**：
- 鼠标移动时只重绘交互层（最轻量）
- 数据变化时只重绘动态层（避免重绘静态背景）
- 静态层永久缓存（零成本）

### 3.2 脏区域优化

**原理**：只重绘变化的矩形区域。

```
Canvas 全量重绘：fillRect(0, 0, 1920, 1080)  ← 207万像素
脏区域重绘：fillRect(500, 300, 200, 100)      ← 2万像素（快 100 倍）
```

**Rust 实现概念**：

```rust
pub struct DirtyRegion {
    rects: Vec<Rect>,
}

impl DirtyRegion {
    pub fn mark_dirty(&mut self, rect: Rect) {
        self.rects.push(rect);

        // 合并重叠矩形（避免过多小区域）
        if self.rects.len() > 10 {
            self.merge_overlapping();
        }
    }

    pub fn render(&self, ctx: &CanvasRenderingContext2d) {
        for rect in &self.rects {
            ctx.save();
            ctx.begin_path();
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.clip(); // 裁剪到脏区域

            // 只重绘这个区域
            self.render_region(ctx, rect);

            ctx.restore();
        }

        self.rects.clear(); // 清空脏标记
    }
}
```

**React 触发脏区域更新**：

```javascript
const updateCell = (rowIdx, colIdx, newValue) => {
  // 更新数据
  setData(prev => {
    const newData = [...prev];
    newData[rowIdx][colIdx] = newValue;
    return newData;
  });

  // 标记脏区域
  const rect = calculateCellRect(rowIdx, colIdx);
  wasmRenderer.markDirty(rect.x, rect.y, rect.width, rect.height);
  wasmRenderer.renderDirty();
};
```

---

## 第四章：React-Rust 通信机制

### 4.1 数据传递策略

**原则**：最小化序列化开销。

**类型映射**：

| JavaScript | Rust | 性能 | 适用场景 |
|------------|------|------|----------|
| Number | f64/i32 | ⭐⭐⭐⭐⭐ | 标量参数（滚动位置、索引） |
| String | String | ⭐⭐⭐ | 短字符串（ID、标题） |
| Array | `Vec<T>` | ⭐⭐ | 小数组（可见范围 [start, end]） |
| Object | 自定义 Struct | ⭐⭐ | 配置对象 |
| 大数组 | TypedArray | ⭐⭐⭐⭐ | 大规模数据（共享内存） |

**高效传递大数据**：

```javascript
// ❌ 低效：每次都序列化整个数组
wasmRenderer.setData(rows); // 传递 100MB 数据

// ✅ 高效：一次性加载，后续只传索引
wasmRenderer.loadData(rows); // 仅在初始化时调用
wasmRenderer.updateRow(1005, newRowData); // 只传变化的行
```

**共享内存模式**（高级）：

```rust
#[wasm_bindgen]
pub struct SharedTable {
    data_ptr: *mut u8,
    row_count: usize,
}

#[wasm_bindgen]
impl SharedTable {
    pub fn init(buffer: &mut [u8]) -> Self {
        Self {
            data_ptr: buffer.as_mut_ptr(),
            row_count: buffer.len() / ROW_SIZE,
        }
    }

    pub fn render(&self, ctx: &CanvasRenderingContext2d) {
        unsafe {
            let data = std::slice::from_raw_parts(self.data_ptr, self.row_count * ROW_SIZE);
            // 直接访问共享内存，零拷贝
        }
    }
}
```

### 4.2 异步调用模式

**场景**：复杂计算可能阻塞主线程。

**解决方案**：Web Worker + SharedArrayBuffer

```javascript
// React 主线程
const worker = new Worker('table-worker.js');

worker.postMessage({ type: 'INIT', data: tableData });

worker.onmessage = (e) => {
  if (e.data.type === 'RENDER_COMPLETE') {
    // Rust 在 Worker 中完成计算
    // 将结果写入 SharedArrayBuffer
    // 主线程直接读取并绘制到 Canvas
    drawFromSharedBuffer(canvasCtx);
  }
};
```

**Worker 内部**：

```javascript
// table-worker.js
import init, { VirtualTable } from './pkg/table_wasm.js';

let table;

self.onmessage = async (e) => {
  if (e.data.type === 'INIT') {
    await init();
    table = VirtualTable.new(e.data.data);
  }

  if (e.data.type === 'SCROLL') {
    table.calculate_visible(e.data.scrollTop);
    self.postMessage({ type: 'RENDER_COMPLETE' });
  }
};
```

---

## 第五章：看板拖拽系统——命中测试与状态机

### 5.1 拖拽的职责划分

**React 负责**：
- 监听鼠标事件（onMouseDown/Move/Up）
- 管理拖拽状态（isDragging, draggedCardId）
- 更新业务数据（移动卡片到新列）

**Rust 负责**：
- 命中测试（鼠标点击的是哪张卡片？）
- 碰撞检测（拖拽时悬停在哪个列上？）
- 绘制拖拽预览（半透明卡片跟随鼠标）

### 5.2 命中测试原理

**问题**：Canvas 是一整块像素，如何知道点击的是哪个元素？

**解决方案**：遍历所有元素，判断点击坐标是否在范围内。

```rust
#[wasm_bindgen]
pub struct Kanban {
    cards: `Vec<Card>`,
}

#[derive(Clone)]
pub struct Card {
    pub id: String,
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}

#[wasm_bindgen]
impl Kanban {
    /// 命中测试：返回被点击卡片的 ID
    pub fn hit_test(&self, x: f64, y: f64) -> Option<String> {
        // 从上到下遍历（后绘制的在上层）
        for card in self.cards.iter().rev() {
            if x >= card.x && x <= card.x + card.width
                && y >= card.y && y <= card.y + card.height {
                return Some(card.id.clone());
            }
        }
        None
    }
}
```

**React 调用**：

```javascript
const handleMouseDown = (e) => {
  const rect = canvasRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const cardId = kanban.hit_test(x, y);
  if (cardId) {
    setDraggingCard(cardId);
  }
};
```

**性能优化**：空间索引（R-tree）

```rust
// 将 O(n) 优化为 O(log n)
pub struct SpatialIndex {
    rtree: `RTree<Card>`,
}

impl SpatialIndex {
    pub fn hit_test(&self, x: f64, y: f64) -> Option<String> {
        self.rtree.locate_at_point(&[x, y])
            .map(|card| card.id.clone())
    }
}
```

### 5.3 拖拽状态机

**React 状态管理**：

```javascript
const [dragState, setDragState] = useState({
  type: 'IDLE', // 'IDLE' | 'DRAGGING' | 'DROP_PREVIEW'
  cardId: null,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  targetColumnId: null,
});

const handleMouseMove = (e) => {
  if (dragState.type === 'DRAGGING') {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDragState(prev => ({
      ...prev,
      currentX: x,
      currentY: y,
      targetColumnId: kanban.hit_test_column(x, y), // Rust 计算悬停列
    }));

    kanban.render_drag_preview(x, y, dragState.cardId); // Rust 绘制预览
  }
};

const handleMouseUp = () => {
  if (dragState.type === 'DRAGGING' && dragState.targetColumnId) {
    // 更新业务数据
    moveCard(dragState.cardId, dragState.targetColumnId);
  }
  setDragState({ type: 'IDLE', cardId: null });
};
```

**Rust 绘制拖拽预览**：

```rust
pub fn render_drag_preview(&self, ctx: &CanvasRenderingContext2d, x: f64, y: f64, card_id: &str) {
    let card = self.find_card(card_id);

    // 绘制半透明卡片
    ctx.save();
    ctx.set_global_alpha(0.5);
    ctx.set_fill_style(&"#fff".into());
    ctx.fill_rect(x, y, card.width, card.height);
    ctx.set_fill_style(&"#333".into());
    ctx.fill_text(&card.title, x + 10.0, y + 30.0);
    ctx.restore();

    // 绘制目标列高亮
    if let Some(target_col) = self.find_column_at(x, y) {
        ctx.set_fill_style(&"rgba(0, 120, 215, 0.1)".into());
        ctx.fill_rect(target_col.x, target_col.y, target_col.width, target_col.height);
    }
}
```

---

## 第六章：甘特图时间轴——坐标变换的艺术

### 6.1 时间轴的数学模型

**核心**：时间域 ↔ 像素域的双向映射。

```
时间域：[2024-01-01, 2024-12-31]  (365 天)
像素域：[0, 1920]                 (Canvas 宽度)

映射函数：
pixel_x = (date - start_date) / (end_date - start_date) * canvas_width
date = start_date + (pixel_x / canvas_width) * (end_date - start_date)
```

**Rust 实现**：

```rust
use chrono::{DateTime, Utc, Duration};

pub struct TimeAxis {
    start_date: `DateTime<Utc>`,
    end_date: `DateTime<Utc>`,
    canvas_width: f64,
}

impl TimeAxis {
    /// 时间 → 像素
    pub fn date_to_pixel(&self, date: `DateTime<Utc>`) -> f64 {
        let total_seconds = (self.end_date - self.start_date).num_seconds() as f64;
        let offset_seconds = (date - self.start_date).num_seconds() as f64;
        (offset_seconds / total_seconds) * self.canvas_width
    }

    /// 像素 → 时间
    pub fn pixel_to_date(&self, pixel_x: f64) -> `DateTime<Utc>` {
        let total_seconds = (self.end_date - self.start_date).num_seconds() as f64;
        let ratio = pixel_x / self.canvas_width;
        let offset_seconds = (total_seconds * ratio) as i64;
        self.start_date + Duration::seconds(offset_seconds)
    }
}
```

### 6.2 缩放功能

**React 处理滚轮事件**：

```javascript
const handleWheel = (e) => {
  e.preventDefault();
  const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;

  // 计算鼠标位置对应的日期（保持不变）
  const mouseX = e.clientX - rect.left;
  const anchorDate = gantt.pixel_to_date(mouseX);

  // 调用 Rust 更新时间轴
  gantt.zoom(zoomFactor, anchorDate);
  gantt.render();
};
```

**Rust 更新时间轴**：

```rust
pub fn zoom(&mut self, factor: f64, anchor_date: `DateTime<Utc>`) {
    let old_duration = self.end_date - self.start_date;
    let new_duration = old_duration / factor as i32;

    // 保持 anchor_date 在相同的像素位置
    let anchor_pixel = self.date_to_pixel(anchor_date);
    let ratio = anchor_pixel / self.canvas_width;

    self.start_date = anchor_date - new_duration * ratio as i32;
    self.end_date = self.start_date + new_duration;
}
```

### 6.3 依赖关系绘制

**React 提供依赖数据**：

```javascript
const dependencies = [
  { from: 'task-1', to: 'task-2' },
  { from: 'task-2', to: 'task-3' },
];

gantt.render_dependencies(dependencies);
```

**Rust 绘制箭头**：

```rust
pub fn render_dependencies(&self, ctx: &CanvasRenderingContext2d, deps: `Vec<Dependency>`) {
    for dep in deps {
        let from_task = self.find_task(&dep.from);
        let to_task = self.find_task(&dep.to);

        let from_x = self.time_axis.date_to_pixel(from_task.end);
        let to_x = self.time_axis.date_to_pixel(to_task.start);

        // 绘制贝塞尔曲线箭头
        ctx.begin_path();
        ctx.set_stroke_style(&"#999".into());
        ctx.move_to(from_x, from_task.y);
        ctx.bezier_curve_to(
            from_x + 50.0, from_task.y,
            to_x - 50.0, to_task.y,
            to_x, to_task.y
        );
        ctx.stroke();

        // 绘制箭头头部
        self.draw_arrow_head(ctx, to_x, to_task.y);
    }
}
```

---

## 第七章：性能监控与调优

### 7.1 性能指标采集

**React 侧（FPS 监控）**：

```javascript
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

function TableComponent() {
  const { fps, renderTime } = usePerformanceMonitor();

  return (
    <div>
      <div>FPS: {fps} | Render: {renderTime}ms</div>
      {/* 演示用的 React 容器 */}
      <div className="canvas-container">
        <canvas id="main-canvas" />
      </div>
    </div>
  );
}
```

**Rust 侧（精确计时）**：

```rust
use web_sys::Performance;

pub struct PerformanceMonitor {
    perf: Performance,
}

impl PerformanceMonitor {
    pub fn measure<F, R>(&self, name: &str, f: F) -> R
    where
        F: FnOnce() -> R,
    {
        let start = self.perf.now();
        let result = f();
        let end = self.perf.now();

        web_sys::console::log_1(&format!("{}: {:.2}ms", name, end - start).into());
        result
    }
}
```

### 7.2 性能优化清单

| 优化项 | React 职责 | Rust 职责 | 预期收益 |
|--------|-----------|-----------|----------|
| **虚拟滚动** | 管理滚动状态 | 计算可见范围 + 绘制 | 100-1000x |
| **分层渲染** | 管理多个 Canvas | 按层绘制 | 5-10x |
| **脏区域** | 标记变化区域 | 只重绘脏区域 | 10-50x |
| **对象池** | - | 复用绘制对象 | 2-3x |
| **批量更新** | 批量 setState | 批量绘制 | 2-5x |
| **Web Worker** | 主线程协调 | Worker 中计算 | 1.5-2x |

---

## 第八章：工程实践——项目结构与构建

### 8.1 项目结构

```
project/
├── rust-renderer/              # Rust WebAssembly 模块
│   ├── Cargo.toml
│   ├── src/
│   │   ├── lib.rs              # wasm-bindgen 入口
│   │   ├── table.rs            # 表格渲染逻辑
│   │   ├── kanban.rs           # 看板渲染逻辑
│   │   ├── gantt.rs            # 甘特图渲染逻辑
│   │   └── utils/
│   │       ├── virtual_scroll.rs
│   │       └── hit_test.rs
│   └── pkg/                    # 编译产物（wasm-pack）
│
├── src/                        # React 应用
│   ├── components/
│   │   ├── Table.jsx           # React 表格组件
│   │   ├── Kanban.jsx          # React 看板组件
│   │   └── Gantt.jsx           # React 甘特图组件
│   ├── hooks/
│   │   ├── useVirtualScroll.js
│   │   ├── useCanvasRenderer.js
│   │   └── usePerformanceMonitor.js
│   └── wasm/
│       └── index.js            # Wasm 模块加载器
│
└── package.json
```

### 8.2 构建配置

**Rust 侧（Cargo.toml）**：

```toml
[package]
name = "rust-renderer"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
web-sys = { version = "0.3", features = [
    "CanvasRenderingContext2d",
    "HtmlCanvasElement",
    "Performance",
] }
chrono = { version = "0.4", features = ["wasmbind"] }

[profile.release]
opt-level = "z"        # 优化体积
lto = true             # 链接时优化
codegen-units = 1      # 单编译单元
panic = "abort"        # 减少 panic 代码
```

**构建脚本**：

```bash
# 构建 Wasm
cd rust-renderer
wasm-pack build --target web --release

# 体积优化
wasm-opt -Oz -o pkg/rust_renderer_bg.wasm pkg/rust_renderer_bg.wasm
```

**React 集成**：

```javascript
// src/wasm/index.js
import init, { VirtualTable, Kanban, Gantt } from '../../rust-renderer/pkg';

let wasmInitialized = false;

export async function initWasm() {
  if (!wasmInitialized) {
    await init();
    wasmInitialized = true;
  }
}

export { VirtualTable, Kanban, Gantt };
```

### 8.3 开发周期评估

**混合架构（React + Rust）**：

| 阶段 | 工作内容 | 周期 | 人力 |
|------|---------|------|------|
| **阶段 1** | 基础架构 + 虚拟滚动 | 4 周 | 2 人 |
| **阶段 2** | 表格组件 + 基础交互 | 4 周 | 2 人 |
| **阶段 3** | 看板 + 拖拽系统 | 4 周 | 2 人 |
| **阶段 4** | 甘特图 + 时间轴 | 4 周 | 2 人 |
| **阶段 5** | 性能优化 + 测试 | 4 周 | 3 人 |

**总计**：20 周（5 个月），2-3 人团队

**代码量估算**：
- Rust：~5,000 行（计算 + 渲染核心）
- React：~8,000 行（状态 + 交互 + 业务）
- 总计：~13,000 行

**难度评级**：⭐⭐⭐（三星，合理难度）

---

## 第九章：难度真相——为什么是三星而非五星？

### 9.1 混合架构的降维打击

**纯 Rust 方案（五星）**：
- 重建文本编辑器：5,000 行
- 重建事件系统：3,000 行
- 重建布局引擎：4,000 行
- 重建无障碍层：2,000 行
- **总计**：~30,000 行 Rust

**React + Rust 方案（三星）**：
- Rust 只做计算 + 绘制：~5,000 行
- React 复用生态：状态管理（Redux）、拖拽（react-dnd）、表单（浏览器原生）
- **总计**：~5,000 行 Rust + ~8,000 行 React

**降维原因**：
1. **不需要重建 GUI**：React 提供完整的状态管理和事件系统
2. **不需要文本编辑器**：表格编辑用 React `<input>`，Rust 只画结果
3. **不需要拖拽系统**：用 `react-dnd` 管理拖拽逻辑，Rust 只画预览
4. **不需要无障碍层**：React DOM 天然支持 ARIA

### 9.2 Rust 的真正价值

**不是"取代 React"，而是"加速 React"**。

Rust 专注于：
1. **计算密集**：虚拟滚动的范围计算（O(log n) 二分查找）
2. **渲染密集**：Canvas 绘制（每秒数千次 fillRect/fillText）
3. **内存优化**：大数据集存储（100万行 × 20列 = 2000万单元格）

React 专注于：
1. **状态管理**：Redux/Zustand 管理应用状态
2. **用户交互**：onClick/onChange 等事件处理
3. **业务逻辑**：过滤、排序、验证

**哲学洞察**：
> 复杂度不会消失，只会转移。混合架构不是"降低复杂度"，而是"将复杂度分配到最擅长的工具"。

### 9.3 成功案例

**Figma**：
- 技术栈：C++ + WebAssembly + React
- C++ 负责：Canvas 渲染引擎
- React 负责：UI 框架、状态管理

**Google Earth**：
- 技术栈：C++ + WebAssembly + JavaScript
- C++ 负责：3D 渲染、地形计算
- JavaScript 负责：UI 交互、地图控制

**AutoCAD Web**：
- 技术栈：C++ + WebAssembly + Angular
- C++ 负责：CAD 几何计算、渲染
- Angular 负责：工具栏、属性面板

**共同模式**：
- ✅ 高性能语言（C++/Rust）负责计算 + 渲染
- ✅ JavaScript 框架负责状态 + 交互
- ✅ 混合而非替代

---

## 第十章：哲学反思——扬长避短的架构智慧

### 10.1 没有银弹

**DOM 的优势**：
- 免费的事件系统
- 免费的文本编辑
- 免费的无障碍支持
- **代价**：10万行数据时卡死

**Canvas 的优势**：
- 100万行数据流畅
- 完全控制渲染逻辑
- 可做极致优化
- **代价**：需要手动实现 GUI 功能

**混合架构的智慧**：
- 用 React DOM 处理交互（免费的 GUI）
- 用 Rust Canvas 处理渲染（极致的性能）
- **结果**：两全其美

### 10.2 复杂度守恒定律

> 软件的复杂度是守恒的，不会凭空消失，只会在不同层次之间转移。

**纯 DOM 方案**：
- 简单：直接用 React 组件
- **复杂度在运行时**：10万行数据 → 200万 DOM 节点 → 浏览器卡死

**纯 Rust 方案**：
- 简单：无需考虑 React 集成
- **复杂度在开发时**：重建整个 GUI 系统 → 30,000 行代码

**混合方案**：
- 简单：各自做擅长的事
- **复杂度在边界**：React-Rust 通信 → 需要精心设计接口

**选择的标准**：
- 如果数据量 &lt; 1万行：DOM 方案（最简单）
- 如果数据量 1-10万行：混合方案（平衡）
- 如果数据量 > 10万行：必须 Canvas（性能刚需）

### 10.3 抽象的层次

**好的架构是分层的**：

```
┌─────────────────────────────────────┐
│   业务逻辑层 (React Components)      │  ← 变化最快
├─────────────────────────────────────┤
│   抽象接口层 (Hooks / Context)       │  ← 稳定契约
├─────────────────────────────────────┤
│   计算渲染层 (Rust WebAssembly)      │  ← 性能核心
├─────────────────────────────────────┤
│   平台 API 层 (Canvas / WebGL)       │  ← 变化最慢
└─────────────────────────────────────┘
```

**分层的价值**：
1. **隔离变化**：业务逻辑变化不影响渲染引擎
2. **可替换性**：可以用 JavaScript 实现替换 Rust 实现
3. **可测试性**：每层可独立测试
4. **可演进性**：可以逐步迁移到 Rust

### 10.4 最后的建议

**何时选择混合架构**？

符合以下条件时，混合架构是最优解：
1. ✅ 数据量巨大（10万+ 行）
2. ✅ 性能是核心竞争力（60fps 不可妥协）
3. ✅ 团队有 Rust 经验（至少 1 人）
4. ✅ 开发周期可接受（5-6 个月）
5. ✅ 愿意投资换取长期优势

**何时不选择**？

以下情况下，纯 React 方案更务实：
1. ❌ 数据量 &lt; 1万行（DOM 性能足够）
2. ❌ 快速原型阶段（优先验证需求）
3. ❌ 团队无 Rust 经验（学习成本高）
4. ❌ 交付压力大（React 更快）

---

## 结语：架构即权衡

从纯 DOM 到纯 Rust，再到 React + Rust 混合，我们经历了一次**权衡的艺术**：

**DOM 的便利**：
- 免费的 GUI 系统
- 丰富的生态
- **代价**：性能天花板

**Rust 的性能**：
- 极致的速度
- 完全的控制
- **代价**：高开发成本

**混合的智慧**：
- React 管状态，Rust 管计算
- 扬长避短，两全其美
- **代价**：需要精心设计边界

**哲学启示**：

> 没有完美的架构，只有合适的权衡。技术选型不是追求最新、最酷，而是在约束条件下寻找最优解。

> 复杂度不会消失，只会转移。好的架构不是消除复杂度，而是将复杂度分配到最合适的地方。

> Rust 不是万能药，React 也不是过时的工具。真正的智慧是知道何时用何种工具。

**记住**：
- 性能是企业级应用的生死线
- 混合架构是务实的选择
- 扬长避短胜过孤注一掷

当你的应用需要处理 10万+ 行数据，当用户期望 60fps 的丝滑体验，当性能成为核心竞争力——React + Rust 混合架构就在那里，等你探索。

---

## 附录：参考资源

**混合架构案例**：
- [Figma 技术博客](https://www.figma.com/blog/) - C++ + WebAssembly + React
- [Google Earth](https://earth.google.com/web/) - C++ + JavaScript
- [AutoCAD Web](https://web.autocad.com/) - C++ + Angular

**技术文档**：
- [wasm-bindgen Guide](https://rustwasm.github.io/wasm-bindgen/)
- [Canvas API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [React Performance](https://react.dev/learn/render-and-commit)

**性能优化**：
- [Canvas Performance Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)
- [WebAssembly Performance](https://v8.dev/blog/emscripten-llvm-wasm)

---

> 写作日期：2024年2月
> 字数统计：约12000字
> 技术深度：高（⭐⭐⭐⭐）
> 适合读者：需要极致性能的企业级项目开发者

---

**下一步探索**：
- [ ] 实现完整的混合架构 Demo
- [ ] 性能对比测试（DOM vs Canvas vs 混合）
- [ ] Web Worker 并行计算实践
- [ ] SharedArrayBuffer 零拷贝优化
- [ ] 与纯 React 方案的成本收益分析

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md