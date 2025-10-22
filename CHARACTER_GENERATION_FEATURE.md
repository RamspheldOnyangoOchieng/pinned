# Character Generation Feature

## Overview
Users can now generate fully customized character images based on all their selections during the character creation flow. The generated image is then associated with the character and used when starting a chat.

## User Flow

1. **Step 0-18**: User makes all customization selections:
   - Choose Style (Realistic or Anime)
   - Select Model
   - Age, Body Type, Ethnicity
   - Hair Style, Length, Color
   - Eye Color, Shape
   - Lip Shape, Face Shape
   - Hips, Bust
   - Language, Relationship Status
   - Occupation, Hobbies, Personality

2. **Step 19 - Generate Character**:
   - User reaches the final preview step
   - Instead of seeing a pre-generated character image, they see a placeholder
   - User clicks **"✨ Generate Character"** button
   - The system generates a unique character image based on ALL their customizations

3. **Step 19 - Review & Start Chat**:
   - Once generated, the character image is displayed
   - User can optionally customize the character name
   - User can click **"↻ Generate Different Character"** to regenerate
   - User clicks **"💬 Start Chat"** to start chatting with their custom character

## Technical Implementation

### New API Endpoint
- **Path**: `/api/generate-custom-character`
- **Method**: POST
- **Endpoint File**: `app/api/generate-custom-character/route.ts`

### Request Body
```typescript
{
  style: 'realistic' | 'anime',
  age: string,
  body: string,
  ethnicity: string,
  hair_style: string,
  hair_length: string,
  hair_color: string,
  eye_color: string,
  eye_shape: string,
  lip_shape: string,
  face_shape: string,
  hips: string,
  bust: string
}
```

### Response
```typescript
{
  success: true,
  image_url: string,
  customization: CustomizationData
}
```

### How It Works

1. **Prompt Building**: The API converts all customization parameters into a detailed text prompt
   - Example: "photorealistic, beautiful woman, professional portrait photography, 25 years old, Hourglass body type, East Asian ethnicity, long straight black hair, brown eyes, cat eye shape, plump lips, oval face, medium hips, large bust, high quality, detailed, centered, frontal view, beautiful lighting"

2. **Image Generation**: Uses Novita AI's `sd_xl_base_1.0.safetensors` model
   - Generates 512x768 JPEG images
   - Uses DPM++ 2M Karras sampler
   - 25 steps for quality
   - Guidance scale: 7

3. **Polling**: The system polls the Novita API for task completion (max 2 minutes)

### Component Changes
- **File**: `components/create-character-flow.tsx`
- **New State Variables**:
  - `generatingCharacter`: Boolean to track generation status
  - `generatedImage`: Stores the generated character image URL

- **New Functions**:
  - `handleGenerateCharacter()`: Calls the API to generate the character image
  - Updated `handleStartChat()`: Now uses the generated image and all customization data

- **UI Updates**:
  - Step 19 now shows different content based on whether image is generated
  - "Generate Character" button appears before image is generated
  - "Start Chat" button appears after image is generated
  - Regenerate option available via "↻ Generate Different Character" button

### Character Data Storage
When the user starts a chat, the character data stored includes:
```typescript
{
  id: string,
  name: string,
  age: string,
  image: string, // Generated image URL
  description: string,
  personality: string,
  occupation: string,
  hobbies: string,
  body: string,
  ethnicity: string,
  language: string,
  relationship: string,
  system_prompt: string,
  character_type: 'custom',
  is_new: true,
  created_at: string,
  customization: CustomizationData, // All user selections
  style: 'realistic' | 'anime'
}
```

## Benefits

1. **Full Customization**: Users can customize every aspect of their character
2. **Unique Characters**: Each generation creates a unique AI companion
3. **AI-Generated Images**: High-quality professional images using AI
4. **Style Flexibility**: Support for both realistic and anime styles
5. **Persistence**: All customization data is saved with the character

## Future Enhancements

- Add prompt refinement UI where users can adjust the prompt before generation
- Support for downloading generated character images
- Character variations (regenerate with slight variations)
- Gallery of all generated characters
- Rating and feedback system for generated images
