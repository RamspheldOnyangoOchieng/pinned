# Quick Reference: Using the New Create Character Module

## 🚀 How to Test

1. **Start the dev server** (if not running):
   ```bash
   pnpm dev
   ```

2. **Navigate to Create Character page**:
   - Go to `http://localhost:3000/create-character`
   - Or click "Create Girlfriend" in the navigation

3. **Test the flow**:
   - Step through each selection screen
   - Try selecting different options
   - Test multi-select for hobbies and personalities
   - Enter a custom name on the final step
   - Click "Start Chat" to create your character

## 📁 Files Modified

- `components/create-character-flow.tsx` - **Main component (redesigned)**
- `components/create-character-flow-backup.tsx` - **Backup of original**
- `app/create-character/page.tsx` - **No changes needed** (imports the component)

## 🎯 What Changed

### Step Structure
- **Before:** 6 steps with dropdown filters at the top
- **After:** 10 dedicated steps, each with visual selection cards

### Selection Method
- **Before:** Dropdown menus for all attributes
- **After:** Beautiful visual cards with emojis and descriptions

### User Flow
- **Before:** Select filters → Choose character → Customize name → Preview
- **After:** Choose base → Select age → Body → Ethnicity → Language → Relationship → Occupation → Hobbies → Personality → Name & Preview

## 🎨 Components

### 1. SelectionCard
Used for single-choice selections (age, body, ethnicity, etc.)
```tsx
<SelectionCard
  emoji="💪"
  label="Athletic"
  description="Toned and fit physique"
  selected={customization.body === 'Athletic'}
  onClick={() => setSingleSelect('body', 'Athletic')}
/>
```

### 2. Badge
Used for multi-select (hobbies, personality)
```tsx
<Badge
  text="🎮 Gaming"
  selected={customization.hobbies.includes('Gaming')}
  onClick={() => toggleMultiSelect('hobbies', 'Gaming')}
/>
```

## 🔧 State Management

### Customization State
```typescript
const [customization, setCustomization] = useState({
  age: '',              // String: '18-22', '23-27', etc.
  body: '',             // String: 'Slim', 'Athletic', etc.
  ethnicity: '',        // String: 'European', 'East Asian', etc.
  language: '',         // String: 'English', 'Spanish', etc.
  relationship: '',     // String: 'Single', 'Open', etc.
  occupation: '',       // String: 'Student', 'Artist', etc.
  hobbies: [],          // Array: ['Reading', 'Gaming', 'Art']
  personality: [],      // Array: ['Playful', 'Caring', 'Flirty']
});
```

### Helper Functions
```typescript
// For single selection
setSingleSelect('age', '23-27')

// For multi-select (toggle on/off)
toggleMultiSelect('hobbies', 'Gaming')

// Check if can proceed to next step
canProceed() // Returns boolean
```

## 📱 Responsive Behavior

### Desktop (>768px)
- Cards: 140-180px wide
- Display: 4-5 cards per row
- Progress bar: Full with all steps
- Spacing: Generous gaps

### Mobile (<768px)
- Cards: Smaller, touch-optimized
- Display: 2-3 cards per row
- Progress bar: Compact/simplified
- Spacing: Tighter for mobile

## ✅ Validation

Each step has validation:
- **Step 0:** Must select a base character
- **Step 1-6:** Must select one option
- **Step 7:** Must select at least one hobby
- **Step 8:** Must select at least one personality trait
- **Step 9:** No validation (name is optional)

The "Next" button is **disabled** until validation passes.

## 🎭 Character Creation Process

When user clicks "Start Chat":
1. Merges base character with customizations
2. Creates unique ID: `custom-{timestamp}-{baseId}`
3. Saves to localStorage
4. Navigates to `/chat/{customCharacterId}`

## 🐛 Troubleshooting

### Characters not loading?
- Check `lib/characters.ts` - ensure `getCharacters()` returns data
- Check browser console for errors
- Verify Supabase connection

### Selections not saving?
- Check state updates in React DevTools
- Verify `setSingleSelect` and `toggleMultiSelect` are working
- Check `customization` state object

### Navigation not working?
- Verify `canProceed()` validation logic
- Check that selections are being stored correctly
- Look for disabled button states

## 💡 Tips for Customization

### Add more options:
1. Add to the options array (e.g., `ageOptions`)
2. Ensure emoji and description are provided
3. Component will auto-render the new cards

### Change validation:
Modify the `canProceed()` function:
```typescript
case 7: return customization.hobbies.length >= 2; // Require 2+ hobbies
```

### Add new step:
1. Add to `steps` array
2. Add validation to `canProceed()`
3. Add step content in the render section
4. Update max step number in navigation

## 📊 Metrics to Track

- **Completion Rate:** % of users who finish all steps
- **Drop-off Points:** Which step users abandon
- **Selection Patterns:** Most popular choices
- **Time per Step:** How long users spend deciding
- **Character Diversity:** Distribution of attributes selected

---

**Need help?** Check the detailed docs in `CREATE_CHARACTER_REDESIGN.md` and `VISUAL_GUIDE.md`
