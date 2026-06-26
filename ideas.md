# NAZ Parfume - Design Brainstorm

## Three Stylistic Approaches

### 1. **Minimalist Elegance**
A refined, spacious aesthetic that lets the product breathe. Clean typography, generous whitespace, and subtle gold accents on a cream background. Probability: 0.03

### 2. **Dark Luxury Cinema**
A cinematic, dramatic approach with deep blacks, bold gold, and rich textures. Inspired by high-end fragrance advertising with video-first storytelling. Probability: 0.07

### 3. **Art Deco Revival**
Geometric patterns, symmetrical layouts, and vintage-modern fusion. Gold lines, ornamental details, and structured grids evoke 1920s glamour with contemporary polish. Probability: 0.02

---

## Selected Approach: **Dark Luxury Cinema**

### Design Movement
**Cinematic Luxury** — inspired by high-end fragrance campaigns (Dior, Tom Ford, Creed). The design treats the website as a film experience: dramatic lighting, hero video as the centerpiece, and a narrative flow that builds emotional connection.

### Core Principles
1. **Video-First Storytelling**: The hero section is a full-screen video, not a static image. This immediately signals premium positioning.
2. **Dramatic Contrast**: Deep blacks (#0d0b08) paired with warm gold (#BB9530) create visual tension and luxury perception.
3. **Layered Depth**: Multiple visual layers (overlays, shadows, textures) create dimensional sophistication rather than flatness.
4. **Restrained Motion**: Animations are smooth and intentional—scroll-triggered reveals, subtle parallax, fade-ins. No gratuitous movement.

### Color Philosophy
- **Primary Black (#0d0b08)**: Evokes exclusivity, sophistication, and timelessness. Used for backgrounds and text.
- **Accent Gold (#BB9530)**: Warm, approachable luxury. Used for highlights, CTAs, and interactive elements. Signals premium without being cold.
- **Cream (#f0e8d8)**: Soft, readable contrast against black. Used for body text and secondary backgrounds. Feels natural and refined.
- **Rationale**: This palette mirrors high-end fragrance packaging—minimal, intentional, and instantly recognizable.

### Layout Paradigm
**Asymmetric Vertical Flow** — rather than centered grids, sections use off-axis layouts with staggered content. The hero video dominates; subsequent sections alternate between left-aligned text + right image, then full-width, then right-aligned text + left image. This creates visual rhythm and prevents monotony.

### Signature Elements
1. **Gold Divider Lines**: Thin, horizontal gold lines separate sections. They're decorative but also functional—they guide the eye downward.
2. **Scroll-Triggered Reveals**: Product images, text blocks, and counters fade in and slide as the user scrolls. This rewards engagement and creates a sense of discovery.
3. **Floating WhatsApp Icon**: A persistent, glowing gold WhatsApp button in the bottom-right corner. Subtle but always accessible.

### Interaction Philosophy
Every interaction should feel **responsive and intentional**. Buttons scale slightly on click (0.97), hover states use gold highlights, and transitions are 150–250ms. The site should feel like a luxury product—refined, not rushed.

### Animation Guidelines
- **Entrance Animations**: Elements fade in with a slight upward slide (translate-y: 20px → 0) over 600ms when scrolling into view.
- **Hover Effects**: Buttons and product cards brighten their gold accents and lift slightly (box-shadow increase).
- **Scroll Parallax**: Hero video stays fixed while content scrolls over it, creating depth.
- **Counter Animation**: Numbers in the "success" section animate from 0 to their target value over 2 seconds when visible.
- **Respect Motion Preferences**: All animations respect `prefers-reduced-motion`.

### Typography System
- **Display Font**: Tajawal Bold (700) for headlines. Arabic-first, modern, and commanding. Used for h1, h2, and section titles.
- **Body Font**: Tajawal Regular (400) for body text and descriptions. Highly readable, elegant, and supports Arabic seamlessly.
- **Hierarchy**:
  - h1: 48px (desktop), 32px (mobile), bold, all-caps for hero
  - h2: 36px (desktop), 24px (mobile), bold, for section titles
  - Body: 16px (desktop), 14px (mobile), regular, for descriptions
  - Small: 12px for captions and metadata
- **Rationale**: Tajawal is purpose-built for Arabic and feels contemporary without sacrificing legibility.

### Brand Essence
**One-line Positioning**: "NAZ Parfume — where ancient oud traditions meet modern luxury, crafted for those who refuse compromise."

**Personality Adjectives**: Sophisticated, Timeless, Exclusive

### Brand Voice
- **Headlines**: Evocative, not salesy. "Discover the Art of Scent" instead of "Shop Now."
- **CTAs**: Action-oriented but elegant. "Explore Our Collection" instead of "Buy."
- **Microcopy**: Conversational but refined. "Each bottle tells a story" instead of "Premium quality guaranteed."

**Example Lines**:
- "Crafted in silence, worn with confidence."
- "Your scent, your signature."

### Wordmark & Logo
A bold, geometric symbol: a stylized oud leaf or perfume bottle silhouette in gold on a transparent background. The word "NAZ" appears below in Tajawal Bold. The mark is timeless and works at any size.

### Signature Brand Color
**Gold (#BB9530)** — warm, approachable, and unmistakably NAZ. This color appears in buttons, dividers, accents, and the logo. It's the visual anchor that ties the brand together.

---

## Design Decisions for Development
- **Video**: A 30–60 second looped video of perfume bottles, oud flowers, or spray mist. High production value is essential.
- **Product Cards**: Minimal, with just image, name, category, rating, and price. No unnecessary details.
- **FAQ Section**: Accordion-style with gold highlights on active items.
- **Footer**: Four-column layout on desktop, stacked on mobile. Includes social icons that glow on hover.
- **Responsive**: Mobile-first approach. Hamburger menu on screens < 768px. Product grid becomes single-column on mobile.
