---
name: CareCircle
colors:
  surface: '#fff8f1'
  surface-dim: '#dfd9d2'
  surface-bright: '#fff8f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3eb'
  surface-container: '#f3ede6'
  surface-container-high: '#ede7e0'
  surface-container-highest: '#e8e2db'
  on-surface: '#1d1b17'
  on-surface-variant: '#424844'
  inverse-surface: '#33302b'
  inverse-on-surface: '#f6f0e9'
  outline: '#727974'
  outline-variant: '#c1c8c3'
  surface-tint: '#466556'
  primary: '#274437'
  on-primary: '#ffffff'
  primary-container: '#3e5c4e'
  on-primary-container: '#b2d3c1'
  inverse-primary: '#adcebc'
  secondary: '#5f5e5a'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2dc'
  on-secondary-container: '#656460'
  tertiary: '#174454'
  on-tertiary: '#ffffff'
  tertiary-container: '#325b6c'
  on-tertiary-container: '#a8d2e5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c8ead8'
  primary-fixed-dim: '#adcebc'
  on-primary-fixed: '#022015'
  on-primary-fixed-variant: '#2f4d3f'
  secondary-fixed: '#e5e2dc'
  secondary-fixed-dim: '#c9c6c1'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#bfe9fd'
  tertiary-fixed-dim: '#a3cde1'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#214c5c'
  background: '#fff8f1'
  on-background: '#1d1b17'
  surface-variant: '#e8e2db'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 48px
  touch-target: 56px
  container-max: 1200px
---

## Brand & Style
The design system is anchored in the concept of "The Digital Hearth"—a space that feels safe, warm, and communal rather than clinical or institutional. It serves families navigating the complexities of caregiving, prioritizing emotional reassurance and extreme ease of use.

The visual style is a blend of **Soft Modernism** and **Tactile Minimalism**. It utilizes high-contrast ratios for accessibility while maintaining a gentle aesthetic through organic shapes and a "human" color palette. The UI should evoke the feeling of a well-lit home: open, breathable, and organized without being rigid.

**Core Tenets:**
- **Calm over Clinical:** Avoid high-vibrancy "tech" blues; use muted, nature-inspired tones.
- **Supportive Clarity:** Every action is obvious. Visual noise is minimized to reduce cognitive load for stressed caregivers.
- **Inclusive Comfort:** Designing for varying levels of digital literacy and visual acuity.

## Colors
The palette is inspired by nature and domestic warmth. We move away from the "sterile hospital" aesthetic by utilizing earth-based tones.

- **Primary (Sage Green):** Used for primary actions and brand presence. It signifies growth and stability.
- **Secondary (Warm Cream):** The foundational surface color. It is softer on the eyes than pure white and creates a "paper-like" warmth.
- **Tertiary (Sky Blue):** Used for supportive info and secondary accents.
- **Neutrals (Muted Earth):** Used for text and borders to maintain high legibility without the harshness of pure black.

**Accessibility Note:** All color pairings for text must meet WCAG AAA standards. Backgrounds should primarily use the Warm Cream to reduce glare.

## Typography
The typography is the backbone of the system's accessibility. We utilize **Plus Jakarta Sans** for its friendly, open counters and modern clarity. 

**Multilingual Support:**
For Devanagari script (Hindi and Marathi), the system defaults to **Noto Sans**, ensuring that the vertical metrics align as closely as possible with the Latin characters to prevent layout shifting.

**Key Rules:**
- **Base Size:** The default body text is 20px (body-lg) to accommodate older users or those with visual impairments.
- **Line Height:** Generous leading (minimum 1.5x) is applied to all body text to aid readability.
- **Weights:** Use SemiBold (600) or Bold (700) for headers to create a clear visual hierarchy against the lighter body text.

## Layout & Spacing
The layout follows a **Fluid Content Model** designed to handle the variable lengths of Hindi and Marathi text strings, which can often be 20-30% longer than English.

- **The Grid:** A 12-column grid on desktop, 8-column on tablet, and 4-column on mobile.
- **Touch Targets:** All interactive elements (buttons, toggles, links) have a minimum height of 56px to accommodate users with limited fine motor control.
- **Padding:** We use "breathable" padding (minimum 20px in cards) to ensure that the UI never feels cramped or overwhelming.
- **Reflow:** Components are built with Flexbox/Grid to allow labels to wrap onto a second line without breaking the container's visual integrity.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Ambient Shadows** rather than harsh outlines.

- **Surfaces:** The main background is the secondary cream color. Primary content cards sit one level above this in pure white or a slightly lighter cream.
- **Shadows:** Use extremely soft, diffused shadows with a slight tint of the primary sage green. This prevents the "gray/dirty" look of standard shadows and keeps the UI feeling warm.
- **Focus States:** High-visibility outlines (3px width) in primary sage green are used for keyboard navigation to ensure the design system meets AAA accessibility standards.

## Shapes
The shape language is defined by large, inviting radii. Sharp corners are entirely avoided as they evoke a sense of precision and coldness that contradicts the brand mission.

- **Cards & Modals:** Use `rounded-xl` (1.5rem) to `rounded-2xl` (2rem) to create a soft, container-like feel.
- **Buttons:** Use a fully rounded pill-shape or `rounded-lg` (1rem) for a friendly, "clickable" appearance.
- **Icons:** Icons should be drawn with rounded caps and joins, maintaining a 2px or 3px stroke width for visibility.

## Components
Consistent component behavior is vital for building trust.

- **Large Buttons:** Buttons include both a clear icon and a text label. The icon is placed on the left to provide an immediate visual cue before the user reads the label.
- **Soft Cards:** Cards use a combination of 1.5rem rounded corners and a 1px soft border in a slightly darker cream to define boundaries without adding visual weight.
- **Status Badges:** Use a "Pastel-Semantic" approach. For example, 'Taken' is a soft sage background with dark green text. Language is kept simple (e.g., "Done" instead of "Completed").
- **Language Switcher:** A prominent, easily accessible toggle at the top level of the navigation. It uses native scripts (English, हिन्दी, मराठी) to ensure users can find their language even if they cannot read the current UI language.
- **Input Fields:** Large 56px height with labels that never disappear (floating labels or top-aligned) to help caregivers maintain context.