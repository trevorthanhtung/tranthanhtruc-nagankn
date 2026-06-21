<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: Tran Thanh Truc Portfolio
description: Multilingual professional portfolio combining modern Japanese minimalism with traditional craft aesthetics.
colors:
  primary: "#182630"      # Deep Aizome Indigo
  accent: "#BC4639"       # Hinomaru Crimson/Vermilion
  neutral-bg: "#0F161C"   # Deep Charcoal Ink (Sumi-e Dark Mode)
  neutral-fg: "#E4E8EB"   # Cool Washi Off-white Text
typography:
  display:
    fontFamily: "Noto Serif JP, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Noto Sans JP, Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
---

# Design System: Tran Thanh Truc Portfolio

## 1. Overview

**Creative North Star: "The Aizome Dyehouse"**

A premium, immersive dark theme inspired by traditional Japanese indigo dyeing (Aizome) and lacquerware. Rather than using safe white or generic warm beige backgrounds, this design is "Drenched" in a rich, deep indigo color that serves as the canvas. 

The aesthetic focuses on wabi-sabi (beauty in simplicity and imperfection), combining clean Japanese serif typography for headlines (representing traditional print) with precise sans-serif layouts for multi-language body text. The motion is choreographed and scroll-driven, mimicking the slow, respectful unfolding of a Japanese scroll.

**Key Characteristics:**
- Deep, drenched indigo-slate backgrounds with high contrast white-slate text.
- Elegant Serif titles paired with highly legible, clean Sans-serif body text.
- Choreographed reveal animations that feel smooth, deliberate, and premium.
- Single, rare Crimson (Hinomaru) accent used sparingly for focal points.

## 2. Colors

A drenched, high-contrast palette consisting of deep indigo-gray tones and a single historic crimson accent.

### Primary
- **Aizome Indigo** (#182630 / oklch(25% 0.03 240)): The primary brand color. It serves as the main surface tone for large sections and key visual anchors.

### Neutral
- **Sumi-e Dark Background** (#0F161C / oklch(16% 0.01 240)): The main body background color. A deep charcoal-indigo tone with very low chroma.
- **Washi Off-white** (#E4E8EB / oklch(92% 0.005 240)): The primary text color. High legibility and zero warmth default to prevent "AI cream" vibes.
- **Faded Ink** (#8896A0 / oklch(65% 0.01 240)): Muted text for labels, captions, and secondary information.

### Accent
- **Hinomaru Crimson** (#BC4639 / oklch(50% 0.16 25)): A historic Japanese crimson/vermilion. Used strictly for highlighting active links, primary actions, and language select states.

### Named Rules
**The 5% Crimson Rule.** Hinomaru Crimson (#BC4639) must never cover more than 5% of any viewport. Its power comes from its rarity; using it too much ruins the editorial restraint.

**The Anti-Beige Rule.** Saturated cream, biscuit, linen, or warm-beige backgrounds are prohibited. The background must remain deep, cool, and ink-like.

## 3. Typography

**Display Font:** Noto Serif JP (Mincho style) paired with Georgia fallback for Latin text.
**Body Font:** Noto Sans JP (Gothic style) paired with Inter fallback for Latin text.

**Character:** A high-contrast pairing of a formal, elegant serif for headers and a clean, neutral sans-serif for multi-language descriptions (Vietnamese, English, Japanese).

### Hierarchy
- **Display** (Regular 400, clamp(2rem, 5vw, 3.5rem), 1.2): Used for hero titles, section headings, and large numbers. 
- **Body** (Regular 400, 1rem (16px), 1.6): Used for description prose, work descriptions, and multilingual details. Maximum line length capped at 75ch.
- **Label** (Medium 500, 0.875rem (14px), 1.2): Used for tags, translation language switchers, and dates.

### Named Rules
**The Balance & Pretty Rule.** All headings (H1-H3) must use `text-wrap: balance` to prevent awkward line breaks in different languages. All body text must use `text-wrap: pretty` to reduce orphan words.

## 4. Elevation

The visual system is flat-by-default, emphasizing the paper-like or lacquer-like quality of the screen. Depth is achieved via tonal contrast (layering a slightly lighter Aizome card against the Sumi background) and subtle border lines rather than shadows.

### Named Rules
**The Wabi-Sabi Flatness Rule.** Drop shadows and blur-based glassmorphism are forbidden. Sections and cards are demarcated by thin, clean borders (1px) in a faded ink color, or by solid tonal shifts.

## 5. Components

*(Pre-implementation seed. Components will be dynamically generated once code is created.)*

## 6. Do's and Don'ts

### Do:
- **Do** use generous negative space (Ma) to give content breathing room.
- **Do** wrap all multilingual labels in proper `lang` attributes (e.g., `lang="ja"`, `lang="vi"`) to ensure correct browser font rendering.
- **Do** keep animations smooth and scroll-driven using exponential easing.
- **Do** ensure contrast meets WCAG AA (minimum 4.5:1) for body text against dark indigo.

### Don't:
- **Don't** use neon purple or blue glow effects that look like generic tech-bro portfolios.
- **Don't** use card borders with a side-stripe accent color (e.g., a left red border on cards).
- **Don't** animate images on hover. Animate the card container border or background tint instead.
- **Don't** add arbitrary numbered eyebrows (e.g., "01. KINH NGHIỆM") to sections.
