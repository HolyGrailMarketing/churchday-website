# ChurchDay Design System

A comprehensive style guide for maintaining consistent design across ChurchDay web and mobile applications.

---

## Brand Values

**Connect • Worship • Grow**

The design system reinforces these core values through visual hierarchy, spiritual aesthetic, and accessible, welcoming interfaces.

---

## Color Palette

### Primary Color Family (Navy Blues)
The dominant brand color representing stability, trust, and spirituality.

| Name | Hex Code | Usage |
|------|----------|-------|
| Primary 50 | #f0f6f9 | Lightest backgrounds, disabled states |
| Primary 100 | #d9ecf3 | Light backgrounds, hover states |
| Primary 200 | #b3d9e7 | Secondary backgrounds |
| Primary 300 | #7db8a8 | Tertiary highlights |
| Primary 400 | #5a9a8f | Medium accents |
| Primary 500 | #4a7ba7 | Primary accents, links |
| Primary 600 | #3d6a95 | Darker accents |
| Primary 700 | #2c4d6f | Dark text, primary gradients |
| Primary 800 | #1f3448 | Very dark backgrounds, text |
| Primary 900 | #142535 | Darkest - hero sections, main background |

**Primary Usage:**
- Hero section backgrounds
- Navigation bars
- Primary text on light backgrounds
- Card backgrounds and borders
- Main layout backgrounds

---

### Gold Color Family (Warm Accents)
Premium accent color representing blessing, light, and divine presence.

| Name | Hex Code | Usage |
|------|----------|-------|
| Gold 50 | #fef9f3 | Lightest gold tints |
| Gold 100 | #fceee3 | Light gold backgrounds |
| Gold 200 | #f8d9c2 | Subtle gold tints |
| Gold 300 | #f5c9a5 | Medium-light accents |
| Gold 400 | #ecc869 | Bright accents |
| Gold 500 | #d4a85e | Primary gold - buttons, headings, glows |
| Gold 600 | #c09950 | Darker gold for hover states |
| Gold 700 | #a68343 | Dark gold accents |
| Gold 800 | #7f6335 | Very dark gold |
| Gold 900 | #5f4828 | Darkest gold |

**Primary Usage:**
- Call-to-action buttons
- Icon accents
- Text highlights
- Borders and dividers
- Golden glow effects
- Button hover shadows

---

### Green Color Family (Spiritual Growth)
Representing growth, renewal, and spiritual vitality.

| Name | Hex Code | Usage |
|------|----------|-------|
| Green 50 | #f0f5f3 | Lightest green backgrounds |
| Green 100 | #d9eae3 | Light green tints |
| Green 200 | #b3d9d0 | Soft green accents |
| Green 300 | #7db8a8 | Medium green |
| Green 400 | #6ba891 | Bright green accents |
| Green 500 | #6b9e7f | Primary green |
| Green 600 | #5f8f73 | Darker green |
| Green 700 | #4a7560 | Dark green text |
| Green 800 | #355849 | Very dark green |
| Green 900 | #234033 | Darkest green |

**Primary Usage:**
- Success states
- Growth-related sections
- Alternative accent color
- Feature highlight cards

---

### Accent Color Family (Lavender/Purple)
Subtle accent color for depth and visual interest.

| Name | Hex Code | Usage |
|------|----------|-------|
| Accent 50 | #faf6f0 | Lightest tints |
| Accent 100 | #f5e6dd | Light backgrounds |
| Accent 200 | #e8cdb8 | Soft accents |
| Accent 300 | #dab392 | Medium accents |
| Accent 400 | #c9a0b3 | Bright accents |
| Accent 500 | #b4a8d8 | Primary accent |
| Accent 600 | #9e91c1 | Darker accent |
| Accent 700 | #8779aa | Dark accent |
| Accent 800 | #695e87 | Very dark |
| Accent 900 | #4d4265 | Darkest |

**Primary Usage:**
- Secondary accent highlights
- Optional feature badges
- Subtle background tints

---

### Neutral Colors
Supporting colors for text, backgrounds, and borders.

| Name | Hex Code | Usage |
|------|----------|-------|
| Background | #fbfaf8 | Main page background |
| Text Primary | #2c2b2a | Primary body text |
| Text Secondary | #374151 | Secondary text, descriptions |
| Border Light | #e5e7eb | Light borders, dividers |
| Border Dark | #1f3448 | Strong borders |

---

## Typography

### Font Family
- **Primary Font:** Inter, system-ui, sans-serif
- **Fallback Stack:** system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue'

### Font Characteristics
- **Font Smoothing:**
  - `-webkit-font-smoothing: antialiased`
  - `-moz-osx-font-smoothing: grayscale`
- Ensures crisp, readable text on all platforms

### Heading Styles

| Type | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| H1 (Hero) | 48-56px | 700 (Bold) | 1.2 | Main page title |
| H2 (Section) | 36-42px | 700 (Bold) | 1.3 | Section headings |
| H3 (Subsection) | 28-32px | 600 (Semibold) | 1.4 | Feature titles, card headings |
| H4 | 24px | 600 (Semibold) | 1.4 | Secondary headings |

### Body Text

| Type | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Large Body | 18px | 400 (Regular) | 1.6 | Important descriptions |
| Body | 16px | 400 (Regular) | 1.6 | Standard text |
| Small Body | 14px | 400 (Regular) | 1.5 | Helper text, descriptions |
| Extra Small | 12px | 500 (Medium) | 1.5 | Labels, captions |

### Text Colors

- **Primary Text:** #2c2b2a (on light backgrounds)
- **Secondary Text:** #374151 (for descriptions, metadata)
- **On Dark:** #ffffff or #fbfaf8 (on navy backgrounds)
- **Accent Text:** #d4a85e (gold highlights)
- **Muted Text:** #6b7280 (disabled, subtle text)

---

## Spacing System

Based on 8px grid system for consistent spacing throughout the interface.

| Scale | Pixels | Usage |
|-------|--------|-------|
| xs | 4px | Micro spacing, icon padding |
| sm | 8px | Small gaps, padding |
| md | 16px | Standard padding, margins |
| lg | 24px | Large section padding |
| xl | 32px | Extra large spacing |
| 2xl | 48px | Section gaps |
| 3xl | 64px | Major section separation |

### Component Padding Standards
- **Button:** 12px (vertical) × 24px (horizontal) or 12px × 16px (small)
- **Card:** 24px padding on all sides
- **Section:** 48-64px (top and bottom)
- **Container:** Max-width 1200px with 24px-40px side padding

### Margin Patterns
- **Between sections:** 48-64px
- **Between cards in grid:** 24px gap
- **Between text blocks:** 16-24px

---

## Component Styles

### Buttons

#### Primary Button (CTA)
```
Background: Linear gradient from #d4a85e to #ecc869
Text Color: #142535 (Primary 900)
Padding: 12px 24px (can vary by size)
Border Radius: 8px
Font Weight: 600 (Semibold)
Text Transform: None
Hover State:
  - Shadow: 0 10px 25px rgba(212, 168, 94, 0.25)
  - Transform: translateY(-2px)
  - Shadow Color: rgba(212, 168, 94, 0.25)
Active State:
  - Transform: translateY(0px)
Transition: all 300ms ease
```

**Use Case:** Form submissions, main CTAs, "Get Started", "Request Demo", pricing actions

#### Secondary Button
```
Background: Transparent
Border: 2px solid #d4a85e
Text Color: #d4a85e
Padding: 12px 24px
Border Radius: 8px
Font Weight: 600 (Semibold)
Hover State:
  - Background: rgba(212, 168, 94, 0.1)
Transition: all 300ms ease
```

**Use Case:** Alternative actions, secondary CTAs, optional links

#### Text Button/Link
```
Background: Transparent
Text Color: #4a7ba7 (Primary 500)
Text Decoration: None
Hover State:
  - Text Decoration: Underline
  - Color: #3d6a95 (Primary 600)
Transition: color 300ms ease
```

**Use Case:** Navigation links, inline actions, footer links

### Cards

#### Feature Card
```
Background: #ffffff
Border: 1px solid #e5e7eb
Border Radius: 12px
Padding: 24px
Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
Hover State:
  - Box Shadow: 0 10px 25px rgba(0, 0, 0, 0.08)
  - Transform: translateY(-4px)
Transition: all 300ms ease
```

#### Dark Card (on primary backgrounds)
```
Background: rgba(255, 255, 255, 0.08)
Border: 1px solid rgba(255, 255, 255, 0.12)
Border Radius: 12px
Padding: 24px
Backdrop Filter: blur(10px)
Text Color: #ffffff
```

### Forms

#### Input Fields
```
Background: #ffffff
Border: 2px solid #e5e7eb
Border Radius: 8px
Padding: 12px 16px
Font Size: 16px
Focus State:
  - Border Color: #d4a85e
  - Box Shadow: 0 0 0 3px rgba(212, 168, 94, 0.1)
  - Outline: None
Placeholder Color: #9ca3af
Disabled State:
  - Background: #f3f4f6
  - Color: #d1d5db
  - Cursor: not-allowed
Transition: border-color 300ms ease, box-shadow 300ms ease
```

#### Labels
```
Font Size: 14px
Font Weight: 600 (Semibold)
Color: #2c2b2a (Primary text)
Margin Bottom: 8px
Display: block
```

#### Error States
```
Border Color: #ef4444 (red)
Box Shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)
Error Text Color: #ef4444
Error Text Size: 12px
Error Text Weight: 500
Margin Top: 4px
```

### Navigation

#### Header/Nav Bar
```
Background: #142535 (Primary 900)
Height: 64px (desktop) / 56px (mobile)
Padding: 12px 24px
Sticky: Yes (position: sticky, top: 0)
Z-index: 50
Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

#### Mobile Menu
```
Background: #142535 (Primary 900)
Position: Fixed, full screen overlay
Animation: slideDown 300ms ease
Padding: 16px
Border Radius: 0
```

---

## Effects and Animations

### Gradients

#### Hero Gradient (Main Background)
```css
background: linear-gradient(180deg, #3a6a8f 0%, #2c4d6f 30%, #1f3448 70%, #142535 100%);
```

#### Golden Glow Effect
```
Type: Radial gradient overlay
Center: Top-center of hero section (35% from top)
Size: 500px diameter circle
Inner Color: rgba(212, 168, 94, 0.3) - gold with 30% opacity
Middle Color: rgba(236, 200, 105, 0.15) - lighter gold at 30%
Outer Color: rgba(74, 123, 167, 0.05) - blue fade at 60%
Fade: Transparent at 80%
Position: Pseudo-element (::before)
Pointer Events: None (doesn't interfere with interactions)
```

#### Warm Subtle Gradient
```css
background: linear-gradient(135deg, rgba(44, 77, 111, 0.04) 0%, rgba(31, 52, 72, 0.04) 100%);
```

### Animations

#### Fade In
```css
Animation Name: fade-in
Duration: 0.6s
Easing: ease-in
Keyframes:
  0%: opacity: 0
  100%: opacity: 1
```

**Use Case:** Section introductions, lazy-loaded content

#### Slide Up
```css
Animation Name: slide-up
Duration: 0.6s
Easing: ease-out
Keyframes:
  0%: opacity: 0, transform: translateY(20px)
  100%: opacity: 1, transform: translateY(0)
```

**Use Case:** Section reveals, element entrances, card appears

### Transitions

#### Default Transition
```
Timing Function: ease-out
Duration: 300ms
Properties: all (or specific: background-color, color, transform, box-shadow)
```

#### Button Transitions
- Hover/Active: transform 300ms ease, box-shadow 300ms ease
- Color changes: color 300ms ease

#### Scroll Behavior
```css
html {
  scroll-behavior: smooth;
}
```

### Shadows

#### Light Shadow (Cards)
```
0 1px 3px rgba(0, 0, 0, 0.1)
```

#### Medium Shadow (Hover)
```
0 10px 25px rgba(0, 0, 0, 0.08)
```

#### Gold Button Shadow (Hover)
```
0 10px 25px rgba(212, 168, 94, 0.25)
```

#### Large Shadow (Modals)
```
0 20px 40px rgba(0, 0, 0, 0.15)
```

---

## Border and Radius System

### Border Styles
- **Light Borders:** 1px solid #e5e7eb (on light backgrounds)
- **Dark Borders:** 1px solid #1f3448 (on dark backgrounds)
- **Accent Borders:** 2px solid #d4a85e (focus states, active)
- **Subtle Borders:** 1px solid rgba(255, 255, 255, 0.12) (on dark/transparent backgrounds)

### Border Radius
| Size | Pixels | Usage |
|------|--------|-------|
| Small | 4px | Small elements, subtle rounding |
| Medium | 8px | Buttons, input fields |
| Large | 12px | Cards, larger components |
| Round | 50% | Avatars, circular elements |

---

## Layout Patterns

### Hero Section
```
Height: 100vh or 600px minimum
Background: Gradient hero with golden glow
Padding: 64px horizontal, 80px-120px vertical
Content Alignment: Center
Text Color: White (#ffffff, #fbfaf8)
Display: Flex, center alignment
Gap: 24-32px between elements
```

### Feature Grid
```
Grid Columns: 3 (desktop), 2 (tablet), 1 (mobile)
Gap: 24px between cards
Card Height: Auto or min-height: 200px
Card Width: 100% within column
Padding: 24px
```

### Section Container
```
Max-width: 1200px
Margin: 0 auto
Padding: 48-64px horizontal
Background: Optional light tint or white
```

### Pricing Cards
```
Grid: 3 columns (desktop), 1 (mobile)
Card Height: 400px+
Highlight Card: Scale transform 1.05 on desktop
Gap: 24px
Pricing Emphasis: Largest, bold, gold color
Features List: 16px body text, check icons

Pricing Format (Jamaica):
$XXXX JMD
Display: Large, #142535, font-size: 32-36px, font-weight: 700
```

---

## Dark Mode (On Primary Background)

When placing content on Primary 900 (#142535) backgrounds:

- **Text:** #ffffff or #fbfaf8 (cream white)
- **Secondary Text:** #e5e7eb (light gray)
- **Cards:** rgba(255, 255, 255, 0.08) with rgba(255, 255, 255, 0.12) border
- **Buttons:** Gold gradient remains the same
- **Accents:** Gold (#d4a85e) stands out well
- **Dividers:** rgba(255, 255, 255, 0.1)

---

## Accessibility Standards

### Color Contrast
- **Primary Text on Light:** 12.5:1 contrast ratio (#2c2b2a on #fbfaf8)
- **White Text on Dark:** 15:1+ contrast ratio (#ffffff on #142535)
- **Gold Accents on Dark:** 4.5:1+ contrast ratio (WCAG AA compliant)

### Interactive Elements
- **Minimum Touch Size:** 48px × 48px (mobile buttons)
- **Focus Indicators:** Visible outline or shadow
- **Focus Color:** #d4a85e (gold) or primary-500

### Typography
- **Minimum Font Size:** 14px for body text
- **Maximum Line Length:** 70-80 characters for readability
- **Line Height:** 1.5-1.6 for body text, 1.2-1.3 for headings

---

## Usage Guidelines

### Color Application

1. **Dark Content on Light Backgrounds**
   - Use Primary 900 or text primary (#2c2b2a)
   - Ensure 4.5:1 contrast minimum

2. **Light Content on Dark Backgrounds**
   - Use #ffffff or #fbfaf8
   - Consider semi-transparent whites for secondary content

3. **Accent Colors**
   - Gold (#d4a85e): Primary CTAs, highlights, important interactive elements
   - Green (#6b9e7f): Success states, growth messaging
   - Primary Blues: Navigation, primary content blocks

4. **Opacity and Layering**
   - Use rgba with opacity for overlays
   - Primary overlay: rgba(20, 37, 53, 0.7) for dark backgrounds
   - Gold overlay: rgba(212, 168, 94, 0.08) for subtle backgrounds

### Best Practices

✅ **DO:**
- Use gold buttons for primary CTAs (Request Demo, Get Started, Sign Up)
- Apply fade-in animations to lazy-loaded content
- Use consistent 24px gaps between major sections
- Maintain 12-24px padding within cards
- Use gold accents to guide user attention
- Apply hover states to all interactive elements
- Use semantic HTML with proper ARIA labels

❌ **DON'T:**
- Use multiple different button styles in the same section
- Make text smaller than 14px for body content
- Apply animations to more than 3-4 elements per screen
- Mix gold and green accents excessively
- Use primary navy for body text on light backgrounds (too dark)
- Forget focus states on form inputs and buttons
- Make button heights less than 44px (mobile touch target)

### Typography Hierarchy

1. **Largest:** H1 headings (48-56px, bold, primary text)
2. **Large:** H2 section headings (36-42px, semibold)
3. **Medium:** H3 card titles (28-32px, semibold)
4. **Standard:** Body text (16px, regular, primary text)
5. **Small:** Descriptions, metadata (14px, regular, secondary text)
6. **Smallest:** Labels, captions (12px, medium, muted text)

---

## Examples

### Getting Started Button
```
Background: Linear gradient #d4a85e to #ecc869
Text: "Get Started" (semibold, 16px)
Padding: 12px 24px
Radius: 8px
Hover: Add shadow 0 10px 25px rgba(212, 168, 94, 0.25), lift -2px
```

### Feature Card
```
Background: White
Padding: 24px
Radius: 12px
Icon: 48px, gold color
Title: 20px semibold, primary text
Description: 16px regular, secondary text
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover: Scale 1.02, shadow grows
```

### Price Tag
```
"$4,500 JMD" or "$8,500 JMD"
Font Size: 32-36px
Font Weight: 700
Color: #d4a85e (gold)
Bottom Border: 2px solid #d4a85e
```

### Form Input (Focus)
```
Border: 2px solid #d4a85e
Shadow: 0 0 0 3px rgba(212, 168, 94, 0.1)
Background: #ffffff
Text: #2c2b2a
Placeholder: #9ca3af
```

---

## Implementation Notes

### For Flutter Implementation
When implementing this design system in Flutter:

1. **Colors:** Create a custom color palette in your theme
   ```dart
   const primaryColor = Color(0xFF142535);
   const goldColor = Color(0xFFd4a85e);
   const greenColor = Color(0xFF6b9e7f);
   ```

2. **Typography:** Define text styles with specified font families and weights
   ```dart
   heading1: TextStyle(fontSize: 48, fontWeight: FontWeight.bold, ...)
   body: TextStyle(fontSize: 16, fontWeight: FontWeight.normal, ...)
   ```

3. **Spacing:** Use consistent padding/margin values (8px units)
   ```dart
   const double spacing = 8.0;
   const double standardPadding = spacing * 3; // 24px
   ```

4. **Animations:** Implement duration: Duration(milliseconds: 300) for transitions, 600ms for main animations

5. **Shadows:** Replicate shadow values in Flutter's BoxShadow
   ```dart
   BoxShadow(
     color: Color(0x1a000000),
     blurRadius: 8,
     offset: Offset(0, 2),
   )
   ```

---

## Updates and Maintenance

This design system document should be updated whenever:
- Colors are adjusted or new colors are added
- Typography rules change
- New components are created
- Animation patterns evolve
- Spacing or sizing standards change

Version: 1.0
Last Updated: February 2026
Maintained by: ChurchDay Design Team
