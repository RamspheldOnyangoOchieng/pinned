# Style Selection Images Guide

## Image Requirements

To display the style selection properly, add these two images to your `/public` folder:

### 1. Realistic Style Image
- **Filename:** `realistic-style.jpg`
- **Recommended Size:** 380px × 480px (or larger with similar aspect ratio)
- **Content:** A realistic/photorealistic female portrait
- **Style:** Professional photography, natural lighting

### 2. Anime Style Image  
- **Filename:** `anime-style.jpg`
- **Recommended Size:** 380px × 480px (or larger with similar aspect ratio)
- **Content:** An anime/manga style female character
- **Style:** Anime art, stylized illustration

## Fallback Behavior

If the images are not found, the component will automatically display:
- **Realistic:** Pink/purple gradient overlay
- **Anime:** Blue/cyan gradient overlay

## Where to Add Images

Place the images in:
```
/public/realistic-style.jpg
/public/anime-style.jpg
```

## Alternative: Use Existing Character Images

You can also modify the code to use images from your existing character database. Update lines in `create-character-flow.tsx`:

```tsx
// Replace this:
src="/realistic-style.jpg"

// With something like:
src={characters.find(c => c.character_type === 'realistic')?.image || "/realistic-style.jpg"}
```

## Quick Test

If you don't have images yet, the component will still work with the gradient fallbacks. The user can still select between Realistic and Anime styles, and this selection will be stored in the `style` state variable.

## Using the Style Selection

The selected style is stored in the `style` state:
- `'realistic'` - User chose realistic style
- `'anime'` - User chose anime style

You can use this to filter characters in Step 1:
```tsx
const filteredCharacters = characters.filter(c => 
  c.character_type === style || !c.character_type
);
```
