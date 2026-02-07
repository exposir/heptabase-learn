<!--
- [INPUT]: 依赖 Rust企业级前端渲染器架构设计.md 的基础知识，回答核心疑问
- [OUTPUT]: 详细解析为何 Canvas 实现表格+看板+甘特图等同于重建浏览器 GUI
- [POS]: 前端开发的历史与哲学目录下的补充说明文档，解答读者核心困惑
- [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
-->

# Canvas 重建 GUI 本质解析：为什么三个组件需要 19000 行代码

> 深度剖析：Canvas 实现表格+看板+甘特图为何等同于重新实现浏览器 GUI

## 核心困惑

**问题**：使用 Rust+Canvas 只是实现看板+表格+甘特图渲染，为何就是重新实现浏览器 GUI 了？

**本文目标**：通过逐一拆解这三个组件的实际需求，揭示"简单渲染"背后隐藏的 GUI 系统复杂度。

---

## 表面需求 vs 实际需求的鸿沟

### 表面上看

```
表格 = 画矩形 + 填文字
看板 = 画卡片 + 摆位置
甘特图 = 画时间条 + 连线
```

这确实只需要几百行 Canvas 绘制代码。

### 企业级应用的实际需求

**关键洞察**：这三个组件不是静态图表，而是**高度交互的数据操作界面**。用户期望的不是"看到数据"，而是"操作数据"。

---

## 一、表格组件需要的 GUI 功能

### 1.1 单元格文本编辑（~2000 行代码）

#### 用户期望
双击单元格，进入编辑模式，输入内容，支持中文输入法

#### DOM 方案（免费）
```html
<td contenteditable="true">可直接编辑</td>
```

浏览器自动提供：
- ✅ 光标闪烁与定位
- ✅ 文本选区高亮
- ✅ 复制/粘贴/撤销/重做
- ✅ 中文输入法（IME）候选框
- ✅ 键盘导航（Home/End/方向键）

#### Canvas 方案（需完全重建）

```rust
/// 完整的文本编辑器实现
struct TextEditor {
    text: String,
    cursor_pos: usize,           // 光标位置
    selection: Option<(usize, usize)>, // 选区范围
    composition_text: String,    // IME候选文本
    composition_range: Option<(usize, usize)>,
    history: Vec<String>,        // 撤销栈
    redo_stack: Vec<String>,     // 重做栈
    blink_timer: f64,            // 光标闪烁定时器
}

impl TextEditor {
    /// 绘制光标（闪烁效果）
    fn render_cursor(&self, ctx: &CanvasRenderingContext2d, x: f64, y: f64, height: f64) {
        let time = performance.now();
        if (time % 1000.0) < 500.0 {
            ctx.set_stroke_style(&"#000".into());
            ctx.set_line_width(2.0);
            ctx.begin_path();
            ctx.move_to(x, y);
            ctx.line_to(x, y + height);
            let _ = ctx.stroke();
        }
    }

    /// 绘制文本选区高亮
    fn render_selection(&self, ctx: &CanvasRenderingContext2d) {
        if let Some((start, end)) = self.selection {
            let start_x = self.measure_text_width(&self.text[..start]);
            let end_x = self.measure_text_width(&self.text[..end]);

            ctx.set_fill_style(&"rgba(0, 120, 215, 0.3)".into());
            ctx.fill_rect(start_x, y, end_x - start_x, height);
        }
    }

    /// 处理键盘输入
    fn handle_keydown(&mut self, key: &str, modifiers: &KeyModifiers) {
        match (key, modifiers) {
            ("ArrowLeft", mod) if mod.shift => {
                // 向左扩展选区
                self.extend_selection_left();
            }
            ("ArrowLeft", _) => {
                // 光标左移
                self.cursor_pos = self.cursor_pos.saturating_sub(1);
                self.selection = None;
            }
            ("ArrowRight", mod) if mod.shift => {
                self.extend_selection_right();
            }
            ("Backspace", _) => {
                self.delete_char();
                self.push_history();
            }
            ("Delete", _) => {
                self.delete_next_char();
                self.push_history();
            }
            ("Home", _) => {
                self.cursor_pos = 0;
            }
            ("End", _) => {
                self.cursor_pos = self.text.len();
            }
            (key, mod) if mod.ctrl && key == "c" => {
                self.copy_to_clipboard();
            }
            (key, mod) if mod.ctrl && key == "v" => {
                self.paste_from_clipboard();
            }
            (key, mod) if mod.ctrl && key == "z" => {
                self.undo();
            }
            (key, mod) if mod.ctrl && key == "y" => {
                self.redo();
            }
            // ... 数十种按键组合
            _ => {}
        }
    }

    /// 处理中文输入法（IME）
    fn handle_composition_start(&mut self) {
        self.composition_range = Some((self.cursor_pos, self.cursor_pos));
    }

    fn handle_composition_update(&mut self, data: &str) {
        self.composition_text = data.to_string();
        // 需要在光标位置绘制虚线下划线标识候选文本
    }

    fn handle_composition_end(&mut self, data: &str) {
        self.insert_text(data);
        self.composition_text.clear();
        self.composition_range = None;
    }

    /// 复制到剪贴板（需要隐藏的 textarea 辅助）
    fn copy_to_clipboard(&self) {
        if let Some((start, end)) = self.selection {
            let text = &self.text[start..end];
            // 需要创建隐藏的 <textarea>，设置值，选中，执行 document.execCommand('copy')
            let textarea = document.create_element("textarea").unwrap();
            textarea.set_value(text);
            document.body().append_child(&textarea).unwrap();
            textarea.select();
            document.exec_command("copy").unwrap();
            document.body().remove_child(&textarea).unwrap();
        }
    }
}
```

**代码量对比**：
- DOM：0 行（浏览器原生）
- Canvas：~2000 行（完整的文本编辑器）

---

### 1.2 列宽拖拽调整（~300 行代码）

#### 用户期望
鼠标悬停在列边界，变成 ↔ 光标，拖拽调整宽度

#### DOM 方案（免费）
```css
.column-resizer:hover {
    cursor: col-resize; /* 浏览器自动切换光标 */
}
```

```javascript
element.addEventListener('mousedown', startResize); // 事件自动冒泡到正确元素
```

#### Canvas 方案（需重建）

```rust
impl TableComponent {
    /// 鼠标移动时检测是否在列边界附近
    fn handle_mousemove(&mut self, x: f64, y: f64) {
        // 1. 手动命中测试：鼠标是否在列边界附近？
        let near_border = self.columns.iter().enumerate().find(|(i, col)| {
            let col_right = self.get_column_right_edge(*i);
            (x - col_right).abs() < 5.0  // 5像素容差
        });

        // 2. 手动切换光标样式（需通过 CSS hack）
        if near_border.is_some() {
            self.canvas.style().set_property("cursor", "col-resize").unwrap();
        } else {
            self.canvas.style().set_property("cursor", "default").unwrap();
        }

        // 3. 如果正在拖拽，更新列宽
        if let DragState::ResizingColumn { col_index, start_x } = self.drag_state {
            let delta = x - start_x;
            self.columns[col_index].width = (self.columns[col_index].width + delta).max(50.0);
            self.render(); // 触发重绘
        }
    }

    fn handle_mousedown(&mut self, x: f64, y: f64) {
        // 判断是否点击在列边界上
        if let Some((col_index, _)) = self.find_column_border(x, y) {
            self.drag_state = DragState::ResizingColumn {
                col_index,
                start_x: x,
            };
        }
    }

    fn handle_mouseup(&mut self) {
        self.drag_state = DragState::Idle;
    }
}
```

**代码量对比**：
- DOM：~50 行
- Canvas：~300 行（拖拽状态机 + 命中测试 + 光标切换）

---

### 1.3 单元格框选（~500 行代码）

#### 用户期望
鼠标拖拽框选多个单元格（类似 Excel），支持 Shift+点击扩展选区

#### DOM 方案（部分免费）
```javascript
// 浏览器提供文本选择，但表格框选需要自定义
// 不过至少有 Selection API 辅助
const selection = window.getSelection();
```

#### Canvas 方案（完全重建）

```rust
struct CellSelection {
    start_cell: (usize, usize),  // (row, col)
    end_cell: (usize, usize),
}

impl TableComponent {
    fn handle_mousedown(&mut self, x: f64, y: f64, shift_key: bool) {
        let cell = self.hit_test_cell(x, y); // 手动命中测试

        if shift_key && self.selection.is_some() {
            // Shift+点击：扩展选区
            self.selection.end_cell = cell;
        } else {
            // 普通点击：开始新选区
            self.selection.start_cell = cell;
            self.selection.end_cell = cell;
        }
    }

    fn handle_mousemove(&mut self, x: f64, y: f64) {
        if self.is_mouse_down {
            let cell = self.hit_test_cell(x, y);
            self.selection.end_cell = cell;

            // 手动计算选区矩形
            let rect = self.calc_selection_rect();

            // 触发重绘（需要绘制选区高亮）
            self.render();
        }
    }

    fn render_selection(&self, ctx: &CanvasRenderingContext2d) {
        let (start_row, start_col) = self.selection.start_cell;
        let (end_row, end_col) = self.selection.end_cell;

        // 计算选区的矩形范围
        let min_row = start_row.min(end_row);
        let max_row = start_row.max(end_row);
        let min_col = start_col.min(end_col);
        let max_col = start_col.max(end_col);

        // 绘制选区背景
        ctx.set_fill_style(&"rgba(0, 120, 215, 0.2)".into());
        for row in min_row..=max_row {
            for col in min_col..=max_col {
                let rect = self.get_cell_rect(row, col);
                ctx.fill_rect(rect.x, rect.y, rect.width, rect.height);
            }
        }

        // 绘制选区边框
        ctx.set_stroke_style(&"#0078d7".into());
        ctx.set_line_width(2.0);
        let outer_rect = self.get_selection_outer_rect(min_row, max_row, min_col, max_col);
        ctx.stroke_rect(outer_rect.x, outer_rect.y, outer_rect.width, outer_rect.height);
    }
}
```

**代码量对比**：
- DOM：~100 行
- Canvas：~500 行（命中测试 + 选区计算 + 高亮绘制）

---

## 二、看板组件需要的 GUI 功能

### 2.1 卡片拖拽（~800 行代码）

#### 用户期望
鼠标按住卡片，拖动到另一列，释放后卡片移动

#### DOM 方案（免费）
```html
<div draggable="true" ondragstart="handleDragStart">卡片</div>
```

浏览器自动提供：
- ✅ 拖拽预览（半透明跟随鼠标）
- ✅ Drop Zone 检测
- ✅ 拖拽事件（dragstart/dragover/drop）

#### Canvas 方案（完全重建）

```rust
#[derive(Clone)]
enum DragState {
    Idle,
    Dragging {
        card_id: String,
        offset_x: f64,      // 鼠标点击位置相对卡片左上角的偏移
        offset_y: f64,
        ghost_x: f64,       // 拖拽预览的实时位置
        ghost_y: f64,
    },
}

impl KanbanComponent {
    fn handle_mousedown(&mut self, x: f64, y: f64) {
        // 1. 命中测试：点击的是哪张卡片？
        if let Some(card) = self.hit_test_card(x, y) {
            self.drag_state = DragState::Dragging {
                card_id: card.id.clone(),
                offset_x: x - card.x,
                offset_y: y - card.y,
                ghost_x: x,
                ghost_y: y,
            };
        }
    }

    fn handle_mousemove(&mut self, x: f64, y: f64) {
        if let DragState::Dragging { card_id, offset_x, offset_y, ghost_x, ghost_y } = &mut self.drag_state {
            *ghost_x = x;
            *ghost_y = y;

            // 2. 命中测试：鼠标当前悬停在哪个列上？
            self.hover_column = self.hit_test_column(x, y);

            // 3. 命中测试：鼠标当前悬停在哪张卡片之间？（用于插入位置提示）
            if let Some(col_id) = &self.hover_column {
                self.insert_index = self.hit_test_insert_position(col_id, y);
            }

            // 触发重绘
            self.render();
        }
    }

    fn render(&self, ctx: &CanvasRenderingContext2d) {
        // 绘制所有列和卡片
        self.render_columns(ctx);

        // 绘制拖拽预览
        if let DragState::Dragging { card_id, ghost_x, ghost_y, offset_x, offset_y } = &self.drag_state {
            let card = self.find_card(card_id);

            // 绘制半透明卡片跟随鼠标
            ctx.save();
            ctx.set_global_alpha(0.5);
            self.draw_card_at(card, *ghost_x - *offset_x, *ghost_y - *offset_y);
            ctx.restore();

            // 绘制目标列高亮
            if let Some(col_id) = &self.hover_column {
                let col = self.find_column(col_id);
                ctx.set_fill_style(&"rgba(0, 120, 215, 0.1)".into());
                ctx.fill_rect(col.x, col.y, col.width, col.height);
            }

            // 绘制插入位置指示线
            if let Some(insert_index) = self.insert_index {
                let y = self.calc_insert_line_y(insert_index);
                ctx.set_stroke_style(&"#0078d7".into());
                ctx.set_line_width(3.0);
                ctx.begin_path();
                ctx.move_to(col.x, y);
                ctx.line_to(col.x + col.width, y);
                let _ = ctx.stroke();
            }
        }
    }

    fn handle_mouseup(&mut self) {
        // 判断是否 drop 在有效列上
        if let DragState::Dragging { card_id, .. } = &self.drag_state {
            if let Some(target_col) = &self.hover_column {
                let insert_index = self.insert_index.unwrap_or(0);
                self.move_card_to_column(card_id, target_col, insert_index);
            }
        }
        self.drag_state = DragState::Idle;
        self.hover_column = None;
        self.insert_index = None;
    }

    /// 命中测试：判断点击的是哪张卡片
    fn hit_test_card(&self, x: f64, y: f64) -> Option<&Card> {
        for col in &self.columns {
            for card in &col.cards {
                if x >= card.x && x <= card.x + card.width
                    && y >= card.y && y <= card.y + card.height {
                    return Some(card);
                }
            }
        }
        None
    }

    /// 命中测试：判断鼠标在哪个列上
    fn hit_test_column(&self, x: f64, y: f64) -> Option<String> {
        for col in &self.columns {
            if x >= col.x && x <= col.x + col.width {
                return Some(col.id.clone());
            }
        }
        None
    }

    /// 命中测试：判断应该插入到哪个位置
    fn hit_test_insert_position(&self, col_id: &str, y: f64) -> Option<usize> {
        let col = self.find_column(col_id);
        for (i, card) in col.cards.iter().enumerate() {
            if y < card.y + card.height / 2.0 {
                return Some(i);
            }
        }
        Some(col.cards.len())
    }
}
```

**代码量对比**：
- DOM：~100 行（HTML5 Drag & Drop API）
- Canvas：~800 行（拖拽状态机 + 三重命中测试 + 预览绘制 + 插入位置计算）

---

### 2.2 卡片位置动画（~400 行代码）

#### 用户期望
拖拽释放后，卡片平滑移动到目标位置（不是瞬移）

#### DOM 方案（免费）
```css
.card {
    transition: transform 0.3s ease-out; /* 浏览器自动补间动画 */
}
```

#### Canvas 方案（完全重建）

```rust
struct Animation {
    card_id: String,
    start_pos: (f64, f64),
    end_pos: (f64, f64),
    start_time: f64,
    duration: f64,
    easing: EasingFunction,
}

enum EasingFunction {
    Linear,
    EaseOut,
    EaseInOut,
}

impl KanbanComponent {
    fn animate_card(&mut self, card_id: String, target_x: f64, target_y: f64) {
        let card = self.find_card(&card_id);
        self.animations.push(Animation {
            card_id: card_id.clone(),
            start_pos: (card.x, card.y),
            end_pos: (target_x, target_y),
            start_time: self.performance.now(),
            duration: 300.0,
            easing: EasingFunction::EaseOut,
        });

        // 启动 requestAnimationFrame 循环
        self.start_animation_loop();
    }

    fn update_animations(&mut self, current_time: f64) {
        let mut finished_animations = Vec::new();

        for (i, anim) in self.animations.iter_mut().enumerate() {
            let elapsed = current_time - anim.start_time;
            let progress = (elapsed / anim.duration).min(1.0);

            // 应用缓动函数
            let eased = match anim.easing {
                EasingFunction::Linear => progress,
                EasingFunction::EaseOut => 1.0 - (1.0 - progress).powi(3),
                EasingFunction::EaseInOut => {
                    if progress < 0.5 {
                        4.0 * progress.powi(3)
                    } else {
                        1.0 - (-2.0 * progress + 2.0).powi(3) / 2.0
                    }
                }
            };

            // 计算当前位置
            let x = anim.start_pos.0 + (anim.end_pos.0 - anim.start_pos.0) * eased;
            let y = anim.start_pos.1 + (anim.end_pos.1 - anim.start_pos.1) * eased;

            // 更新卡片位置
            if let Some(card) = self.find_card_mut(&anim.card_id) {
                card.x = x;
                card.y = y;
            }

            // 检查动画是否完成
            if progress >= 1.0 {
                finished_animations.push(i);
            }
        }

        // 移除已完成的动画
        for i in finished_animations.iter().rev() {
            self.animations.remove(*i);
        }

        // 重绘
        self.render();

        // 如果还有动画，继续下一帧
        if !self.animations.is_empty() {
            self.request_animation_frame();
        }
    }

    fn request_animation_frame(&self) {
        let closure = Closure::wrap(Box::new(move |time: f64| {
            self.update_animations(time);
        }) as Box<dyn FnMut(f64)>);

        window()
            .request_animation_frame(closure.as_ref().unchecked_ref())
            .unwrap();

        closure.forget();
    }
}
```

**代码量对比**：
- DOM：~10 行（CSS transitions）
- Canvas：~400 行（动画系统 + 缓动函数 + 帧循环管理）

---

## 三、甘特图组件需要的 GUI 功能

### 3.1 任务条拖拽调整时长（~600 行代码）

#### 用户期望
鼠标悬停任务条边缘，拖拽左边缘调整开始时间，拖拽右边缘调整结束时间

#### DOM/SVG 方案（部分免费）
```html
<rect class="task-bar" />
<rect class="left-handle" />  <!-- 左边缘拖拽把手 -->
<rect class="right-handle" /> <!-- 右边缘拖拽把手 -->
```

浏览器提供：
- ✅ 事件 target 自动识别点击的是哪个元素
- ✅ `:hover` 伪类自动切换光标

#### Canvas 方案（完全重建）

```rust
enum HitZone {
    None,
    TaskBody(String),
    LeftEdge(String),
    RightEdge(String),
}

impl GanttComponent {
    fn hit_test_task(&self, x: f64, y: f64) -> HitZone {
        for task in &self.tasks {
            let bar_x = self.time_axis.date_to_pixel(task.start);
            let bar_width = self.time_axis.date_to_pixel(task.end) - bar_x;
            let bar_y = self.get_task_y(task);

            // 判断是否在任务条范围内
            if y < bar_y || y > bar_y + self.row_height {
                continue;
            }

            // 精细判断点击位置
            if (x - bar_x).abs() < 5.0 {
                return HitZone::LeftEdge(task.id.clone());
            } else if (x - (bar_x + bar_width)).abs() < 5.0 {
                return HitZone::RightEdge(task.id.clone());
            } else if x >= bar_x && x <= bar_x + bar_width {
                return HitZone::TaskBody(task.id.clone());
            }
        }
        HitZone::None
    }

    fn handle_mousemove(&mut self, x: f64, y: f64) {
        let zone = self.hit_test_task(x, y);

        // 根据命中区域切换光标样式
        match zone {
            HitZone::LeftEdge(_) | HitZone::RightEdge(_) => {
                self.set_cursor("ew-resize");
            }
            HitZone::TaskBody(_) => {
                self.set_cursor("move");
            }
            HitZone::None => {
                self.set_cursor("default");
            }
        }

        // 处理拖拽
        if let DragState::ResizingLeft(task_id) = &self.drag_state {
            let new_start = self.time_axis.pixel_to_date(x);
            if let Some(task) = self.find_task_mut(task_id) {
                task.start = new_start;
                self.render();
            }
        } else if let DragState::ResizingRight(task_id) = &self.drag_state {
            let new_end = self.time_axis.pixel_to_date(x);
            if let Some(task) = self.find_task_mut(task_id) {
                task.end = new_end;
                self.render();
            }
        } else if let DragState::MovingTask { task_id, offset } = &self.drag_state {
            let new_start = self.time_axis.pixel_to_date(x - offset);
            let duration = self.get_task_duration(task_id);
            if let Some(task) = self.find_task_mut(task_id) {
                task.start = new_start;
                task.end = new_start + duration;
                self.render();
            }
        }
    }

    fn handle_mousedown(&mut self, x: f64, y: f64) {
        match self.hit_test_task(x, y) {
            HitZone::LeftEdge(task_id) => {
                self.drag_state = DragState::ResizingLeft(task_id);
            }
            HitZone::RightEdge(task_id) => {
                self.drag_state = DragState::ResizingRight(task_id);
            }
            HitZone::TaskBody(task_id) => {
                let task = self.find_task(&task_id);
                let task_start_x = self.time_axis.date_to_pixel(task.start);
                self.drag_state = DragState::MovingTask {
                    task_id,
                    offset: x - task_start_x,
                };
            }
            HitZone::None => {
                self.drag_state = DragState::Idle;
            }
        }
    }
}
```

**代码量对比**：
- SVG：~200 行（元素分离 + 事件委托）
- Canvas：~600 行（精细命中测试 + 状态机 + 坐标转换 + 实时更新）

---

### 3.2 时间轴缩放（~300 行代码）

#### 用户期望
滚轮缩放时间刻度，任务条宽度同步变化

#### SVG 方案（部分免费）
```javascript
svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`); // SVG 自动缩放内部元素
```

#### Canvas 方案（完全重建）

```rust
impl GanttComponent {
    fn handle_wheel(&mut self, delta_y: f64, mouse_x: f64) {
        // 1. 计算缩放比例
        let zoom_factor = if delta_y < 0.0 { 1.1 } else { 0.9 };

        // 2. 计算缩放中心点对应的日期（保持鼠标位置不变）
        let center_date = self.time_axis.pixel_to_date(mouse_x);

        // 3. 更新时间轴范围
        let old_duration = self.time_axis.duration();
        let new_duration = old_duration / zoom_factor;

        // 4. 调整时间轴起点，使 center_date 保持在 mouse_x 位置
        let ratio = mouse_x / self.canvas_width;
        let new_start = center_date - new_duration * ratio;
        let new_end = new_start + new_duration;

        self.time_axis.update_range(new_start, new_end);

        // 5. 重新计算所有任务的像素位置
        for task in &mut self.tasks {
            task.render_x = self.time_axis.date_to_pixel(task.start);
            task.render_width = self.time_axis.date_to_pixel(task.end) - task.render_x;
        }

        // 6. 重新计算时间刻度
        self.update_time_scale();

        // 7. 全量重绘
        self.render();
    }

    fn update_time_scale(&mut self) {
        // 根据缩放级别决定刻度粒度
        let duration_days = self.time_axis.duration().num_days();

        self.scale_unit = if duration_days > 365 {
            TimeScaleUnit::Month
        } else if duration_days > 90 {
            TimeScaleUnit::Week
        } else if duration_days > 30 {
            TimeScaleUnit::Day
        } else {
            TimeScaleUnit::Hour
        };

        // 重新计算刻度位置
        self.calculate_scale_ticks();
    }
}
```

**代码量对比**：
- SVG：~50 行（viewBox 变换）
- Canvas：~300 行（坐标系重算 + 刻度自适应 + 全量重绘）

---

## 四、共同需要的底层 GUI 功能

这三个组件虽然业务不同，但都依赖相同的底层 GUI 能力：

| 功能 | DOM 成本 | Canvas 成本 | 实现细节 |
|------|----------|-------------|----------|
| **命中测试** | 0 行（浏览器原生） | ~500 行 | 需要遍历所有元素，判断点击坐标是否在范围内；优化需要 R-tree 空间索引；处理层叠顺序（z-index）；处理嵌套元素 |
| **事件系统** | ~50 行（addEventListener） | ~800 行 | 需要模拟事件冒泡、事件委托、焦点管理、事件优先级、preventDefault/stopPropagation |
| **文本渲染** | 0 行（浏览器原生） | ~1000 行 | 需要处理文本测量、换行、对齐、字体回退、Emoji 渲染、双向文本（RTL） |
| **无障碍支持** | 0 行（原生 ARIA） | ~1500 行 | 需要维护隐藏的 DOM 镜像层，与 Canvas 同步；提供 ARIA 属性；支持键盘导航；支持屏幕阅读器 |
| **右键菜单** | ~100 行 | ~600 行 | 需要绘制浮动菜单、处理边界溢出、键盘导航、子菜单展开 |
| **Tooltip** | ~50 行 | ~400 行 | 需要命中测试 + 浮动定位 + 延迟显示/隐藏 + 边界检测 |
| **滚动条** | 0 行（原生） | ~800 行 | 需要绘制滚动条、处理拖拽、计算可见区域、虚拟滚动同步 |
| **焦点管理** | 0 行（原生） | ~400 行 | 需要维护焦点状态、Tab 键导航、焦点环绘制、焦点事件分发 |

---

## 五、为什么等同于"重新实现浏览器 GUI"？

### 功能覆盖对比

将上述所有功能累加：

| 模块 | 代码量 | 对应的浏览器能力 |
|------|--------|------------------|
| **文本编辑系统** | ~5000 行 | `<input>`, `<textarea>`, `contenteditable` |
| **布局引擎** | ~4000 行 | Flexbox, Grid, 文本换行 |
| **事件系统** | ~3000 行 | 事件冒泡、委托、焦点管理 |
| **渲染优化** | ~3000 行 | 分层、脏区域、虚拟滚动 |
| **无障碍层** | ~2000 行 | ARIA、键盘导航 |
| **动画系统** | ~2000 行 | CSS transitions/animations |

**总计**：~19,000 行代码

这覆盖了浏览器 GUI 的核心功能集：

```
浏览器 GUI 核心能力 = {
    文本编辑,
    布局计算,
    事件分发,
    渲染优化,
    无障碍支持,
    动画系统,
    光标管理,
    拖拽系统,
    焦点管理,
    滚动条
}

表格+看板+甘特图需要的能力 ⊇ 80% 的浏览器 GUI 核心能力
```

---

## 六、核心洞察

### 不是"三个组件"的问题

**关键认知**：不是"三个组件"需要重建 GUI，而是**"这三个组件需要的交互特性，恰好覆盖了浏览器 GUI 的大部分功能"**。

#### 能力需求分解

- **表格**需要：
  - ✅ 文本编辑（光标、选区、IME）
  - ✅ 拖拽（列宽调整）
  - ✅ 选区（框选单元格）
  - ✅ 排序（点击表头）
  - ✅ 虚拟滚动（10万行数据）

- **看板**需要：
  - ✅ 拖拽（卡片移动）
  - ✅ 动画（平滑移动）
  - ✅ 碰撞检测（drop zone）
  - ✅ 命中测试（多层元素）

- **甘特图**需要：
  - ✅ 拖拽（调整时长）
  - ✅ 缩放（时间轴）
  - ✅ 路径绘制（依赖箭头）
  - ✅ 坐标变换（时间→像素）

#### 交集分析

```
文本编辑 ∩ 拖拽 ∩ 命中测试 ∩ 动画 ∩ 事件系统 ∩ 布局计算 ∩ 无障碍
= 浏览器 GUI 的核心功能集
```

这不是巧合，而是**企业级交互组件的本质需求**。

---

### 为什么是 19,000 行而不是 1,000 行？

#### 简单绘制 vs 完整交互

**如果只是静态渲染**：
```rust
// 绘制表格（静态）
for row in rows {
    for cell in row.cells {
        ctx.fill_rect(x, y, width, height);
        ctx.fill_text(&cell.text, x + 5, y + 15);
    }
}
// 约 100 行
```

**但企业级应用需要的是**：
```rust
// 完整的交互系统
impl TableComponent {
    fn handle_double_click() { /* 进入编辑模式 */ }
    fn handle_input() { /* 文本输入 */ }
    fn handle_composition() { /* IME 支持 */ }
    fn handle_selection() { /* 框选 */ }
    fn handle_drag() { /* 列宽调整 */ }
    fn handle_scroll() { /* 虚拟滚动 */ }
    fn handle_keyboard() { /* 键盘导航 */ }
    fn handle_copy_paste() { /* 剪贴板 */ }
    fn handle_undo_redo() { /* 历史管理 */ }
    fn render_cursor() { /* 光标闪烁 */ }
    fn render_selection() { /* 选区高亮 */ }
    fn render_tooltip() { /* 悬停提示 */ }
    fn update_accessibility() { /* 同步 ARIA */ }
    // ... 数十个功能
}
// 约 5,000 行
```

**代码量爆炸的原因**：
1. **状态管理复杂度**：编辑状态、拖拽状态、选区状态、焦点状态...
2. **边界情况处理**：空数据、超长文本、非法输入、极端缩放...
3. **性能优化**：虚拟滚动、脏区域、分层渲染、对象池...
4. **无障碍支持**：双系统同步、ARIA、键盘导航...
5. **跨浏览器兼容**：IME 实现差异、事件模型差异...

---

### Figma 的印证

**Figma 团队的选择**：
- 技术栈：C++ + WebAssembly + Canvas
- 代码规模：**数十万行** C++ 代码
- 开发周期：数年
- 团队规模：数十人

Figma 做的是设计工具，核心功能包括：
- 画布（Canvas 渲染）
- 图形编辑（拖拽、变换、路径编辑）
- 文本编辑（富文本）
- 图层管理
- 协作（实时同步）

**与表格+看板+甘特图的相似性**：
- ✅ 都需要文本编辑
- ✅ 都需要拖拽系统
- ✅ 都需要命中测试
- ✅ 都需要高性能渲染
- ✅ 都需要无障碍支持

Figma 的数十万行代码，验证了"用 Canvas 构建交互式 GUI 需要重建浏览器能力"这个结论。

---

## 七、难度真相总结

### 5 星难度的构成

| 挑战 | 难度 | 代码量 | 为什么难 |
|------|------|--------|----------|
| **文本编辑** | ⭐⭐⭐⭐⭐ | 5000 | 重新发明 `<input>`：光标、选区、IME、复制粘贴、撤销重做 |
| **布局引擎** | ⭐⭐⭐⭐ | 4000 | 重新发明 Flexbox：文本测量、换行、对齐、响应式 |
| **事件系统** | ⭐⭐⭐⭐ | 3000 | 重新发明事件委托：命中测试、冒泡、焦点管理 |
| **无障碍支持** | ⭐⭐⭐⭐⭐ | 2000 | 维护双系统（Canvas + DOM）完美同步 |
| **性能优化** | ⭐⭐⭐⭐ | 3000 | 接近浏览器原生性能：虚拟滚动、脏区域、分层 |
| **动画系统** | ⭐⭐⭐ | 2000 | 缓动函数、帧循环、状态插值 |

**总计**：~19,000 行代码

### 不是 Rust 难，是任务本身难

**核心结论**：
1. **Canvas API 本身很简单**：`ctx.fill_rect(x, y, width, height);` 这一行不难
2. **难的是围绕 Canvas 构建完整 GUI 系统**：文本编辑器、布局引擎、事件系统、无障碍层...
3. **类比**：
   - 用 Rust 调用 `fillRect` = 1 星难度
   - 用 Rust 重新发明浏览器 = 5 星难度

**如果用 C++ 做同样的事情**（参考 Figma），难度同样是 5 星。

这不是语言的问题，而是**任务范围**的问题。

---

## 八、最终答案

### 回答核心问题

**问题**：使用 rust+canvas 只是实现看板+表格+甘特甘渲染，为何就是重新实现浏览器 GUI 了？

**答案**：

1. **表面需求**："三个组件的渲染" → 看似简单
2. **实际需求**："三个高度交互的数据操作界面" → 需要完整 GUI 系统
3. **能力交集**：这三个组件的交互需求，恰好覆盖了浏览器 GUI 的核心功能
4. **代码规模**：
   - 静态绘制：~300 行
   - 完整交互：~19,000 行
5. **成功案例**：Figma（C++ + Canvas，数十万行代码）印证了这个复杂度

### 不可避免的复杂度

这不是"过度设计"，而是**企业级交互组件的必要投资**：

- ❌ 不能砍掉文本编辑（用户需要输入数据）
- ❌ 不能砍掉拖拽（看板的核心交互）
- ❌ 不能砍掉无障碍（法律合规要求）
- ❌ 不能砍掉性能优化（10万行数据的刚需）

每一个功能都是**必需的**，每一行代码都是**有价值的**。

### 为什么仍然值得做？

**性能收益**：
- DOM 渲染 10 万行表格：❌ 卡死
- Canvas 渲染 10 万行表格：✅ 60fps

**成功案例**：
- **Figma**：百万用户的设计工具
- **Google Earth**：全球地图流畅渲染
- **AutoCAD Web**：CAD 软件 Web 化

**投资回报**：
- 开发成本：6-12 个月
- 性能提升：10-100 倍
- 用户体验：从"卡顿"到"丝滑"
- 竞争壁垒：技术护城河

---

## 结语

**最后的认知统一**：

> "三个组件"只是冰山一角，水面下是整个浏览器 GUI 系统的冰山主体。

> 当我们说"重新实现浏览器 GUI"，不是夸张，而是对工作量的准确描述。

> 这是 5 星难度，但也是必要的投资——性能是企业级应用的生死线。

**记住**：
- 渲染本身是简单的（2 星）
- 重建 GUI 系统是困难的（5 星）
- 但对于 10 万+ 行数据的企业应用，这是唯一的选择

---

**参考文献**：
1. [Figma 技术博客](https://www.figma.com/blog/) - C++ + WebAssembly + Canvas 架构
2. [Google Earth Web](https://earth.google.com/web/) - Canvas 渲染案例
3. [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
4. [WCAG 2.1 无障碍指南](https://www.w3.org/WAI/WCAG21/quickref/)

---

> 写作日期：2024年2月
> 字数统计：约10000字
> 技术深度：极高（⭐⭐⭐⭐⭐）

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
