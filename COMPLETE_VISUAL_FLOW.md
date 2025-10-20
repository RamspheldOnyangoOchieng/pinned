# Visual Flow: Complete User Journey

## Step 0: Choose Style ⭐ NEW

```
┌──────────────────────────────────────────────────────────────────┐
│  🎨 Create my AI                                                 │
│                                                                   │
│  ●─○─○─○─○─○─○─○─○─○─○                                          │
│  1 2 3 4 5 6 7 8 9 10 11                                         │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                     Choose Style                                  │
│            Select your preferred visual style                     │
│                                                                   │
│    ┌─────────────────────┐      ┌─────────────────────┐         │
│    │         ✓           │      │                     │         │
│    │                     │      │                     │         │
│    │    [PHOTO OF A      │      │    [ANIME STYLE     │         │
│    │   REALISTIC WOMAN   │      │   CHARACTER ART]    │         │
│    │    IN OUTDOOR       │      │                     │         │
│    │    SETTING]         │      │                     │         │
│    │                     │      │                     │         │
│    │                     │      │                     │         │
│    │  Realistic          │      │  Anime              │         │
│    │  Lifelike and       │      │  Stylized anime     │         │
│    │  photorealistic     │      │  and manga          │         │
│    │  AI companions      │      │  aesthetics         │         │
│    └─────────────────────┘      └─────────────────────┘         │
│       PINK BORDER                   GRAY BORDER                  │
│       SELECTED                      NOT SELECTED                 │
│                                                                   │
│                                                                   │
│  [◄ Previous]                               [Next ►]             │
│   (disabled)                                (enabled)             │
└──────────────────────────────────────────────────────────────────┘
```

## Step 1: Select Model (Updated heading)

```
┌──────────────────────────────────────────────────────────────────┐
│  🎨 Create my AI                                                 │
│                                                                   │
│  ●─●─○─○─○─○─○─○─○─○─○                                          │
│  1 2 3 4 5 6 7 8 9 10 11                                         │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│               Choose Your Base Model                              │
│   Select a starting template from our realistic collection        │
│                                                                   │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│    │   PINK   │  │   GRAY   │  │   GRAY   │                    │
│    │  BORDER  │  │  BORDER  │  │  BORDER  │                    │
│    │    ✓     │  │          │  │          │                    │
│    │  [Photo] │  │  [Photo] │  │  [Photo] │                    │
│    │          │  │          │  │          │                    │
│    │  Anna    │  │  Sonia   │  │  Maze    │                    │
│    │Caucasian │  │ African  │  │Colombian │                    │
│    └──────────┘  └──────────┘  └──────────┘                    │
│                                                                   │
│                    [Show More ▼]                                  │
│                                                                   │
│  [◄ Previous]                               [Next ►]             │
└──────────────────────────────────────────────────────────────────┘
```

## Step 2: Age

```
┌──────────────────────────────────────────────────────────────────┐
│  🎨 Create my AI                                                 │
│                                                                   │
│  ●─●─●─○─○─○─○─○─○─○─○                                          │
│  1 2 3 4 5 6 7 8 9 10 11                                         │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│                  Choose Age Range                                 │
│             What age range appeals to you?                        │
│                                                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │    ✓    │ │         │ │         │ │         │ │         │  │
│  │   🌸    │ │   ✨    │ │   💫    │ │   🌟    │ │   👑    │  │
│  │         │ │         │ │         │ │         │ │         │  │
│  │  Young  │ │   Mid   │ │  Late   │ │  Early  │ │ Mature  │  │
│  │  Adult  │ │ Twenties│ │Twenties │ │Thirties │ │   38+   │  │
│  │  18-22  │ │  23-27  │ │  28-32  │ │  33-37  │ │         │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│   SELECTED     GRAY       GRAY        GRAY        GRAY          │
│                                                                   │
│  [◄ Previous]                               [Next ►]             │
└──────────────────────────────────────────────────────────────────┘
```

## Design Details

### Card Styles

**Selected Card:**
- Border: 4px solid #FF13F0 (pink/primary)
- Background: Slightly lighter
- Scale: 105% (slightly larger)
- Checkmark: Visible in top-right corner

**Unselected Card:**
- Border: 4px solid #23232b (dark gray)
- Background: Dark (#18181f)
- Scale: 100%
- No checkmark

**Hover State:**
- Border: Changes to primary/50 (semi-transparent pink)
- Scale: 105%
- Smooth transition

### Typography

- **Main Heading:** 2xl-3xl, bold, white
- **Subheading:** sm-base, gray-400
- **Card Labels:** sm-base, bold, white (primary when selected)
- **Card Descriptions:** xs, gray-400

### Spacing

- Cards: gap-4 to gap-6
- Sections: mb-6 to mb-8
- Container: p-4 to p-8 (responsive)

### Responsive Behavior

**Desktop (>768px):**
- Style cards: Side by side, full width
- Selection cards: 4-5 per row
- Full progress bar

**Mobile (<768px):**
- Style cards: Stacked vertically
- Selection cards: 2-3 per row
- Compact progress bar with ellipsis

## User Experience Flow

1. **User lands on page** → Sees "Choose Style" with two large image cards
2. **User clicks Realistic** → Card gets pink border + checkmark
3. **User clicks Next** → Proceeds to "Choose Your Base Model"
4. **Heading updates** → "from our realistic collection"
5. **User selects character** → Pink border + checkmark
6. **Continue through steps** → Each attribute has dedicated screen
7. **Final preview** → See all selections summarized
8. **Start Chat** → Character created with all customizations

## Key Improvements

✅ **Visual Style Choice First** - Sets the tone for the entire experience
✅ **Clear Separation** - Style vs Model are now distinct steps
✅ **Better Headings** - "Choose Your Base Model" is more descriptive
✅ **Contextual Messaging** - Shows which style collection they're browsing
✅ **Professional Look** - Large image cards match modern UI standards
✅ **Consistent Design** - All selection cards follow same pattern

---

**Total Journey:** 11 interactive steps from style to final character
**Estimated Time:** 2-3 minutes for thoughtful customization
**User Delight:** High - Visual, engaging, clear progress
