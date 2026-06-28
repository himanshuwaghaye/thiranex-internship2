# CSS Implementation Patterns & Code Examples
## Advanced CSS3 in Practice

---

## 📑 Table of Contents

1. [CSS Grid Patterns](#css-grid-patterns)
2. [Flexbox Patterns](#flexbox-patterns)
3. [Responsive Grid Layouts](#responsive-grid-layouts)
4. [Variable System Usage](#variable-system-usage)
5. [Animation Patterns](#animation-patterns)
6. [Component Examples](#component-examples)

---

## 🎯 CSS Grid Patterns

### Pattern 1: Basic Grid with Auto-fit

Perfect for displaying items that should wrap responsively.

**Use Case:** Projects grid, skills display

```css
.auto-fit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--gap-lg);
}

/* Mobile: 1 column (300px + 32px gap = 332px < 768px) */
/* Tablet: 2 columns */
/* Desktop: 3+ columns */
```

**HTML:**
```html
<div class="auto-fit-grid">
    <article>Item 1</article>
    <article>Item 2</article>
    <article>Item 3</article>
    <article>Item 4</article>
    <article>Item 5</article>
    <article>Item 6</article>
</div>
```

### Pattern 2: Responsive Multi-Column Layout

Explicit breakpoints for precise control.

**Use Case:** Contact form with sidebar

```css
.responsive-grid {
    display: grid;
    gap: var(--gap-xl);
    
    /* Mobile: 1 column */
    grid-template-columns: 1fr;
    
    /* Tablet: 1fr + 1fr */
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    
    /* Desktop: Adjust ratio */
    @media (min-width: 1024px) {
        grid-template-columns: 1fr 1.2fr;
    }
}
```

**HTML:**
```html
<div class="responsive-grid">
    <aside><!-- Sidebar content --></aside>
    <main><!-- Main content --></main>
</div>
```

### Pattern 3: Complex Grid with Named Areas

Advanced layout with semantic naming.

**Use Case:** Hero section with overlay content

```css
.named-grid {
    display: grid;
    grid-template-areas:
        "hero"
        "content";
    gap: var(--gap-lg);
    
    @media (min-width: 768px) {
        grid-template-areas:
            "hero hero"
            "content sidebar";
        grid-template-columns: 2fr 1fr;
    }
}

.named-grid-hero {
    grid-area: hero;
    background: var(--gradient-primary);
    padding: var(--space-12);
    border-radius: var(--radius-xl);
}

.named-grid-content {
    grid-area: content;
}

.named-grid-sidebar {
    grid-area: sidebar;
    position: sticky;
    top: 100px;
}
```

**HTML:**
```html
<div class="named-grid">
    <section class="named-grid-hero">Hero</section>
    <main class="named-grid-content">Content</main>
    <aside class="named-grid-sidebar">Sidebar</aside>
</div>
```

### Pattern 4: Masonry-like Grid

Varied height items with responsive columns.

**Use Case:** Mixed content blocks

```css
.masonry-grid {
    display: grid;
    gap: var(--gap-lg);
    
    grid-template-columns: 1fr;
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
}

.masonry-item {
    background: var(--color-bg-secondary);
    padding: var(--space-6);
    border-radius: var(--radius-lg);
    min-height: 300px;
}

/* Make some items span multiple columns */
.masonry-item.featured {
    @media (min-width: 768px) {
        grid-column: span 2;
    }
}
```

---

## 🎨 Flexbox Patterns

### Pattern 1: Flex Navigation

Flexible navigation that wraps on smaller screens.

```css
.flex-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-4);
    padding: var(--space-4);
}

.flex-nav-list {
    display: flex;
    gap: var(--space-6);
    flex-wrap: wrap;
    list-style: none;
}

.flex-nav-list a {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
}

.flex-nav-list a:hover {
    background: var(--color-bg-secondary);
    color: var(--color-secondary);
}
```

**HTML:**
```html
<nav class="flex-nav">
    <div class="logo">Brand</div>
    <ul class="flex-nav-list">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>
```

### Pattern 2: Flex Card

Flexible card layout with content-aware heights.

```css
.flex-card {
    display: flex;
    flex-direction: column;
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    transition: all var(--transition-base);
}

.flex-card-header {
    margin-bottom: var(--space-4);
}

.flex-card-body {
    flex: 1;  /* Grows to fill available space */
    margin-bottom: var(--space-4);
}

.flex-card-footer {
    display: flex;
    gap: var(--space-4);
    margin-top: auto;  /* Push to bottom */
}

.flex-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
}
```

**HTML:**
```html
<article class="flex-card">
    <div class="flex-card-header">
        <h3>Card Title</h3>
    </div>
    <div class="flex-card-body">
        <p>Card content goes here.</p>
    </div>
    <div class="flex-card-footer">
        <button>Action</button>
        <a href="#">Learn More</a>
    </div>
</article>
```

### Pattern 3: Flex Layout with Space-Between

Perfect distribution of elements.

```css
.flex-space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
}

.flex-space-around {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: var(--space-4);
}

.flex-space-evenly {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: var(--space-4);
}
```

---

## 📱 Responsive Grid Layouts

### Layout 1: Mobile-First Two-Column

Converts from 1 column on mobile to 2 on desktop.

```css
.two-col-responsive {
    display: grid;
    gap: var(--gap-lg);
    
    /* Mobile: 1 column */
    grid-template-columns: 1fr;
    
    /* Tablet+: 2 columns */
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
}
```

### Layout 2: Sidebar + Main Content

Main content on left, sidebar on right (or stacked on mobile).

```css
.sidebar-layout {
    display: grid;
    gap: var(--gap-xl);
    
    /* Mobile: single column */
    grid-template-columns: 1fr;
    
    /* Desktop: main (2fr) + sidebar (1fr) */
    @media (min-width: 1024px) {
        grid-template-columns: 2fr 1fr;
    }
}

.sidebar {
    @media (min-width: 1024px) {
        position: sticky;
        top: 20px;
        height: fit-content;
    }
}
```

### Layout 3: Hero + Content + Footer

Full-page layout with header, main, footer.

```css
body {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

header {
    grid-row: 1;
}

main {
    grid-row: 2;
    max-width: var(--container-6xl);
    margin: 0 auto;
    width: 100%;
    padding: var(--space-8);
}

footer {
    grid-row: 3;
    background: var(--color-primary);
}
```

---

## 🎨 Variable System Usage

### Pattern 1: Theme Variables

Using variables for consistent theming.

```css
/* Define variables at root */
:root {
    --color-primary: #2c3e50;
    --color-secondary: #3498db;
    --color-success: #27ae60;
    
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
}

/* Use variables throughout */
.button {
    background: var(--color-primary);
    padding: var(--space-4) var(--space-6);
}

.success {
    background: var(--color-success);
}

/* Override in dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --color-primary: #34495e;
    }
}
```

### Pattern 2: Responsive Variables (CSS Custom Properties with Media Queries)

Different values at different breakpoints.

```css
:root {
    /* Mobile-first sizing */
    --hero-padding: var(--space-8);
    --heading-size: var(--fs-3xl);
    --gap-main: var(--gap-md);
}

@media (min-width: 768px) {
    :root {
        --hero-padding: var(--space-12);
        --heading-size: var(--fs-4xl);
        --gap-main: var(--gap-lg);
    }
}

@media (min-width: 1024px) {
    :root {
        --hero-padding: var(--space-16);
        --heading-size: var(--fs-5xl);
        --gap-main: var(--gap-xl);
    }
}

/* Use variables - automatically responsive! */
.hero {
    padding: var(--hero-padding);
}

.hero h1 {
    font-size: var(--heading-size);
}

.grid {
    gap: var(--gap-main);
}
```

### Pattern 3: CSS Variable Fallbacks

Safe defaults if variable not supported.

```css
.element {
    /* Fallback first, then variable */
    background: #ffffff var(--color-bg-primary);
    padding: 1rem var(--space-4);
}

/* Better pattern with calc() */
.flexible-element {
    width: calc(100% - var(--padding, 2rem));
    padding: var(--padding, 1rem);
}
```

---

## 🎬 Animation Patterns

### Pattern 1: Fade In Animation

Subtle entrance animation.

```css
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

/* Stagger multiple elements */
.fade-in-stagger {
    animation: fadeIn 0.3s ease-in-out;
}

.fade-in-stagger:nth-child(1) { animation-delay: 0s; }
.fade-in-stagger:nth-child(2) { animation-delay: 0.1s; }
.fade-in-stagger:nth-child(3) { animation-delay: 0.2s; }
.fade-in-stagger:nth-child(4) { animation-delay: 0.3s; }
```

### Pattern 2: Slide and Scale

More dramatic entrance.

```css
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.slide-up {
    animation: slideInUp 0.5s ease-out;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
    .slide-up {
        animation: none;
        opacity: 1;
    }
}
```

### Pattern 3: Hover Transitions

Interactive element feedback.

```css
.interactive {
    transition: all 250ms ease-in-out;
}

.interactive:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    background: var(--color-secondary);
    color: white;
}
```

---

## 🧩 Component Examples

### Example 1: Complete Card Component

```css
.card {
    display: flex;
    flex-direction: column;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    transition: all var(--transition-base);
    overflow: hidden;
    position: relative;
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,0.1),
        transparent
    );
    transition: left var(--transition-slow);
    z-index: 1;
}

.card:hover::before {
    left: 100%;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-secondary);
}

.card-image {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-4);
    position: relative;
    z-index: 0;
}

.card-header {
    position: relative;
    z-index: 2;
}

.card-title {
    font-size: var(--fs-xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-2);
    color: var(--color-primary);
}

.card-description {
    flex: 1;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-4);
    line-height: var(--lh-relaxed);
}

.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
}

.card-tag {
    background: var(--color-bg-tertiary);
    color: var(--color-primary);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: var(--fs-xs);
    font-weight: var(--font-weight-medium);
}

.card-footer {
    display: flex;
    gap: var(--space-4);
    margin-top: auto;
}

.card-link {
    display: inline-block;
    position: relative;
    z-index: 2;
}
```

**HTML:**
```html
<article class="card">
    <img src="image.jpg" alt="Card image" class="card-image">
    <div class="card-header">
        <h3 class="card-title">Card Title</h3>
    </div>
    <p class="card-description">
        This is the card description with details about the content.
    </p>
    <div class="card-tags">
        <span class="card-tag">Tag 1</span>
        <span class="card-tag">Tag 2</span>
        <span class="card-tag">Tag 3</span>
    </div>
    <div class="card-footer">
        <a href="#" class="card-link">Learn More</a>
    </div>
</article>
```

### Example 2: Complete Form Component

```css
.form {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.form-label {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    font-size: var(--fs-sm);
}

.form-control {
    padding: var(--space-3) var(--space-4);
    border: 2px solid var(--color-border-light);
    border-radius: var(--radius-md);
    font-family: inherit;
    font-size: var(--fs-base);
    color: var(--color-text-primary);
    background: var(--color-bg-primary);
    transition: all var(--transition-fast);
}

.form-control:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-control:disabled {
    background: var(--color-bg-secondary);
    color: var(--color-text-tertiary);
    cursor: not-allowed;
}

.form-hint {
    font-size: var(--fs-xs);
    color: var(--color-text-tertiary);
    margin-top: -var(--space-1);
}

.form-error {
    color: var(--color-error);
    font-size: var(--fs-sm);
    font-weight: var(--font-weight-medium);
}

.form-checkbox {
    display: flex;
    align-items: center;
    gap: var(--space-3);
}

.form-checkbox input {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.form-submit {
    padding: var(--space-3) var(--space-6);
    background: var(--gradient-accent);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
}

.form-submit:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.form-submit:focus {
    outline: var(--focus-outline);
    outline-offset: var(--focus-offset);
}
```

**HTML:**
```html
<form class="form">
    <div class="form-group">
        <label for="name" class="form-label">Full Name</label>
        <input type="text" id="name" class="form-control" required>
        <span class="form-hint">Enter your first and last name</span>
    </div>
    
    <div class="form-group">
        <label for="email" class="form-label">Email Address</label>
        <input type="email" id="email" class="form-control" required>
        <span class="form-hint">We'll never share your email</span>
    </div>
    
    <div class="form-group">
        <label for="message" class="form-label">Message</label>
        <textarea id="message" class="form-control" rows="5"></textarea>
    </div>
    
    <div class="form-checkbox">
        <input type="checkbox" id="agree" required>
        <label for="agree">I agree to the terms and conditions</label>
    </div>
    
    <button type="submit" class="form-submit">Send Message</button>
</form>
```

---

## 📈 Performance Tips

### Tip 1: Minimize Reflows

```css
/* ❌ Bad: Multiple transitions trigger reflows */
.element {
    transition: width, height, transform;
}

/* ✅ Good: Use transform only (no reflow) */
.element {
    transition: transform;
}

.element:hover {
    transform: scale(1.1);  /* GPU accelerated */
}
```

### Tip 2: Use will-change Sparingly

```css
/* ✅ Good: Prepare for animation */
.animated {
    will-change: transform;
    animation: slideIn 0.5s ease-out;
}

/* Remove after animation */
.animated:animation-end {
    will-change: auto;
}
```

### Tip 3: Contain Complex Layouts

```css
/* ✅ Good: Contain paint area */
.complex-section {
    contain: layout style paint;
}
```

---

**Last Updated:** March 2024  
**CSS Level:** CSS3 (Advanced)  
**Browser Support:** All modern browsers
