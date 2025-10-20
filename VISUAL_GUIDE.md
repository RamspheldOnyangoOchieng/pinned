# Visual Guide: New Create Character Flow

## Before vs After

### BEFORE (Old Design)
```
Step 1: Choose Style
┌──────────────────────────────────────┐
│ [Dropdown: AGE] [Dropdown: BODY]     │
│ [Dropdown: ETHNICITY] ...             │
│                                       │
│ [Character Card] [Character Card]    │
│                                       │
└──────────────────────────────────────┘
```

### AFTER (New Design)
```
Step 1: Choose Age Range
┌──────────────────────────────────────────────────────┐
│     What age range appeals to you?                   │
│                                                       │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐      │
│  │ 🌸  │  │ ✨  │  │ 💫  │  │ 🌟  │  │ 👑  │      │
│  │Young│  │ Mid │  │Late │  │Early│  │Mature│      │
│  │Adult│  │ 20s │  │ 20s │  │ 30s │  │ 38+ │      │
│  │18-22│  │23-27│  │28-32│  │33-37│  │     │      │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘      │
│                                                       │
└──────────────────────────────────────────────────────┘
```

## Complete Flow Example

### Step 0: Choose Base Style
```
Choose Your Base Style
Select a starting template

[Photo]     [Photo]     [Photo]     [Photo]
Anna        Sonia       Maze        Elena
Character   Character   Character   Character
   ✓
```

### Step 1: Age
```
Choose Age Range
What age range appeals to you?

🌸           ✨          💫          🌟          👑
Young Adult  Mid 20s     Late 20s    Early 30s   Mature
18-22        23-27       28-32       33-37       38+
   ✓
```

### Step 2: Body Type
```
Choose Body Type
Select your preferred body type

🌿         💪         🌺         ⭐         🌹
Slim       Athletic   Curvy      Average    Plus-size
Slender    Toned      Hourglass  Balanced   Full-figured
              ✓
```

### Step 3: Ethnicity
```
Choose Ethnicity
Select cultural background

🇪🇺        🇯🇵         🇮🇳          🌙
European   East Asian  South Asian  Middle Eastern
           
🌍         🌎         🏝️          🌈
African    Latina     Caribbean   Mixed
   ✓
```

### Step 4: Language
```
Choose Language
What language should they speak?

🇬🇧        🇪🇸        🇫🇷        🇩🇪
English    Spanish    French     German
   ✓

🇯🇵        🇰🇷        🌐
Japanese   Korean     Multilingual
```

### Step 5: Relationship Status
```
Relationship Status
How should they approach relationships?

💖                 🌈                🔍               💕
Single             Open-minded       Exploring        Committed
Looking for        Open to           Discovering      Seeking
connection         possibilities     connections      meaningful bond
                      ✓
```

### Step 6: Occupation
```
Choose Occupation
What do they do for a living?

📚        🎨        💼           🚀
Student   Artist    Professional Entrepreneur

⚕️        💻        ✨         🏋️
Healthcare Tech     Creative   Fitness
             ✓
```

### Step 7: Hobbies (Multi-select)
```
Choose Hobbies
Select hobbies and interests (Select at least one)

[📖 Reading]  [🎮 Gaming]  [🧘 Yoga]  [🍳 Cooking]  [✈️ Travel]
    ✓            ✓                         
[🎵 Music]  [🎨 Art]  [💪 Fitness]  [📷 Photography]  [💃 Dancing]
               ✓

✓ 3 selected
```

### Step 8: Personality (Multi-select)
```
Choose Personality
What personality traits should they have? (Select at least one)

[😊 Playful]  [🤗 Caring]  [🌟 Adventurous]  [🧠 Intelligent]  [😘 Flirty]
    ✓            ✓                                                  ✓

[🌙 Mysterious]  [💪 Confident]  [💕 Romantic]  [😏 Witty]  [🤝 Supportive]
                        ✓

✓ 4 selected
```

### Step 9: Name & Final Preview
```
Name Your AI
Give your companion a unique name

┌────────────────────────────────┐
│  [Enter a name...]             │
│  Sophia                        │
└────────────────────────────────┘

┌────────────────────────────────┐
│        [Profile Photo]          │
│                                 │
│         Sophia                  │
│  Your customized AI companion   │
│                                 │
│  Age: 23-27                     │
│  Body: Athletic                 │
│  Ethnicity: European            │
│  Language: English              │
│  Relationship: Open-minded      │
│  Occupation: Tech               │
│                                 │
│  HOBBIES                        │
│  [Reading] [Gaming] [Art]       │
│                                 │
│  PERSONALITY                    │
│  [Playful] [Caring] [Flirty]    │
│  [Confident]                    │
│                                 │
│    [Start Chat →]               │
└────────────────────────────────┘
```

## Key UI Elements

### SelectionCard Component
```
┌──────────────────┐
│       ✓          │  ← Checkmark when selected
│                  │
│      💪          │  ← Large emoji
│                  │
│    Athletic      │  ← Label
│                  │
│ Toned and fit    │  ← Description
│   physique       │
│                  │
└──────────────────┘
  ↑ Border changes color when selected
  ↑ Scales up on hover
```

### Badge Component (Multi-select)
```
Regular:          Selected:
┌──────────┐     ┌──────────┐
│ 📖 Reading│     │📖 Reading│
└──────────┘     └──────────┘
 Gray bg          Pink bg
```

### Progress Bar
```
 1      2      3      4      5      6      7      8      9      10
(✓)    (✓)    (3)    ( )    ( )    ( )    ( )    ( )    ( )    ( )
Style  Age    Body  Ethnic Language Relation Occup Hobbies Person Preview
       ^current step
```

## Responsive Design

### Desktop (>768px)
- Cards displayed in rows of 4-5
- Full progress bar with all steps visible
- Larger cards and spacing

### Mobile (<768px)
- Cards stack in rows of 2-3
- Simplified progress bar
- Touch-optimized card sizes
- Compressed navigation buttons

## Color Scheme

- **Primary:** Pink/Magenta (#FF13F0)
- **Background:** Dark (#18181f, #1A1A1A)
- **Cards:** Slightly lighter dark (#23232b)
- **Text:** White (#ffffff) and Gray (#gray-400)
- **Accent:** Primary color for selections
- **Borders:** Subtle gray (#252525) → Primary when selected

## Animations

- ✨ Card hover: Scale up (1.05x)
- ✨ Selection: Border color change + scale
- ✨ Badge click: Background color change
- ✨ Progress: Smooth transitions between steps
- ✨ Checkmark: Fade in on selection
