# MinerU Agent Skills 页面设计构思

<response>
<idea>

## 方案一：「Terminal Noir」— 终端美学 + 暗黑科技感

**Design Movement**: Cyberpunk Terminal Aesthetic / 赛博终端美学
受 Vercel、Linear、Raycast 等开发者工具的暗色系设计启发，将命令行终端的视觉语言提升为高级品牌体验。

**Core Principles**:
1. 以深色背景为基底，营造沉浸式"终端"氛围
2. 用精确的光效和渐变打破暗色的沉闷，制造层次
3. 代码即内容 — 代码块是页面的一等公民，而非附属品
4. 信息密度高但不拥挤，通过留白和分组实现呼吸感

**Color Philosophy**:
- 主背景：近乎纯黑的深灰 (#0A0A0F → #12121A)，模拟终端环境
- 强调色：冷调青蓝 (#00D4FF) 与暖调琥珀 (#FFB800) 的对撞，分别代表"极速版"和"高精度版"
- 卡片表面：半透明毛玻璃效果 (rgba(255,255,255,0.04))
- 文字层级：纯白 > 灰白 (#A0A0B0) > 深灰 (#505060)

**Layout Paradigm**: 
垂直叙事流 + 水平卡片阵列。Hero 区采用左文右代码的不对称布局；框架卡片采用横向滚动或等宽网格；代码示例区全宽沉浸。

**Signature Elements**:
1. 终端风格的闪烁光标和打字机动画
2. 卡片边缘的微光描边 (1px gradient border)
3. 安装命令区域模拟真实终端窗口（带窗口控制按钮）

**Interaction Philosophy**: 
一切交互都应有即时反馈 — 复制按钮点击后变为勾号、卡片 hover 时边缘发光、Tab 切换带有滑动指示器。

**Animation**:
- 页面滚动时元素从下方淡入 (fade-up)
- 代码块逐行出现的打字机效果
- 徽章和标签的微弹跳入场
- 光标闪烁 CSS 动画

**Typography System**:
- 标题：JetBrains Mono 或 Space Grotesk — 等宽/几何无衬线，技术感强
- 正文：Inter 或 DM Sans — 高可读性
- 代码：Fira Code — 带连字的等宽字体

</idea>
<text>深色终端美学，适合开发者工具品牌，但可能对非技术用户不够友好</text>
<probability>0.08</probability>
</response>

<response>
<idea>

## 方案二：「Luminous Craft」— 明亮精工 + 文档级专业感

**Design Movement**: Swiss Design Modernism + Apple Human Interface
受 Stripe、Notion、Apple Developer 文档的启发，以极致的排版和留白传递专业与信任。

**Core Principles**:
1. 光洁的白色/浅灰基底，传递开放与可信赖感
2. 精密的网格系统和严格的间距规范
3. 色彩克制但精准 — 仅在关键节点使用品牌色
4. 内容优先，装饰服务于信息传达

**Color Philosophy**:
- 主背景：纯净白 (#FAFBFC) 到微暖灰 (#F5F5F7)
- 品牌主色：MinerU 蓝 (#2563EB) — 专业、科技、可信
- 成功/官方标记：翡翠绿 (#10B981)
- 卡片：纯白 + 精细阴影，悬浮时阴影加深
- 代码区：深色反转 (#1E1E2E)，形成视觉锚点

**Layout Paradigm**:
经典的居中内容列 (max-width 1200px) + 模块化分区。每个 Section 之间用大量留白分隔。卡片采用 2-3 列自适应网格。

**Signature Elements**:
1. 精致的圆角卡片 + 多层阴影系统
2. 绿色"官方支持"徽章 — 小巧但醒目
3. 终端命令区域带有品牌色的复制按钮

**Interaction Philosophy**:
优雅而克制。Hover 效果是阴影的微妙变化和轻微上移，而非夸张的变形。复制操作有简洁的 toast 反馈。

**Animation**:
- 滚动触发的渐显动画 (opacity + translateY)
- 卡片 hover 的平滑上浮 (transform: translateY(-4px))
- Tab 切换的交叉淡入淡出
- 复制成功的勾号动画

**Typography System**:
- 标题：Space Grotesk — 几何感强，现代而不冰冷
- 正文：DM Sans — 温和的无衬线，阅读舒适
- 代码：JetBrains Mono — 专业等宽

</idea>
<text>明亮专业风格，适合官方文档和企业级产品，传递信任感</text>
<probability>0.06</probability>
</response>

<response>
<idea>

## 方案三：「Obsidian Gradient」— 深邃渐变 + 高端品牌感

**Design Movement**: Premium Dark Gradient / 高端暗色渐变
受 Linear、Framer、Resend 等新一代开发者工具的启发，将深色基底与精致的渐变、光效结合，打造高端品牌页面。

**Core Principles**:
1. 深色背景上的渐变色彩叙事 — 从深邃到明亮的视觉旅程
2. 精致的玻璃态效果 (Glassmorphism) 与微妙的噪点纹理
3. 大胆的排版层级 — 超大标题与精细正文的对比
4. 每个区块都是一个独立的视觉舞台

**Color Philosophy**:
- 主背景：深邃的蓝黑渐变 (#050510 → #0C1222 → #0F172A)
- 品牌渐变：从深蓝到青色 (#3B82F6 → #06B6D4)，代表技术深度与创新
- 强调色：翡翠绿 (#34D399) 用于成功状态和"官方支持"标记
- 卡片：半透明深色 (rgba(15,23,42,0.6)) + 1px 渐变边框
- 文字：纯白 (#F8FAFC) > 银灰 (#94A3B8) > 暗灰 (#475569)

**Layout Paradigm**:
全宽沉浸式布局。Hero 区占据视口高度的 80%，使用居中对称的大标题。框架卡片采用错落有致的网格。代码区全宽深色沉浸。FAQ 区回归简洁的单列布局。

**Signature Elements**:
1. 渐变光晕 (Gradient Orbs) — 页面背景中漂浮的模糊色彩球体
2. 卡片的渐变边框 — hover 时边框亮度增加
3. 代码区域顶部的渐变色 Tab 指示器

**Interaction Philosophy**:
戏剧性但不过度。鼠标移入卡片时，背景光晕跟随移动；复制按钮有满足感的动画反馈；滚动时背景渐变色微妙变化。

**Animation**:
- Hero 区标题的逐词渐显
- 背景光晕的缓慢漂移动画
- 卡片入场的交错延迟动画 (stagger)
- 代码块的语法高亮渐显效果
- FAQ 展开/收起的弹簧动画

**Typography System**:
- 标题：Sora 或 Plus Jakarta Sans — 圆润几何，现代高端
- 正文：Inter — 中性高可读
- 代码：Fira Code — 连字等宽

</idea>
<text>高端暗色渐变风格，视觉冲击力强，适合打造品牌记忆点</text>
<probability>0.07</probability>
</response>
