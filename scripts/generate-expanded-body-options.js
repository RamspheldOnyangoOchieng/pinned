#!/usr/bin/env node
/**
 * Generate new images for expanded body customization options
 * New categories: Hair Style, Eye Color, Eye Shape, Lip Shape, Face Shape, Hips, Bust, Hair Length, Hair Color
 */

require('dotenv').config();
const fetch = require('node-fetch');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// NEW CATEGORY PROMPTS - Focused on body parts and features
const EXPANDED_PROMPTS = {
  hair_style: {
    'Straight': {
      realistic: 'close-up professional portrait of beautiful woman with perfectly straight long hair, sleek flat smooth hair texture, straight hair flowing down, hair parted in middle, glossy shine, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with perfectly straight long anime hair, sleek smooth hair texture, shiny straight hair, hair parted in middle, vibrant anime style, high detail'
    },
    'Wavy': {
      realistic: 'close-up professional portrait of beautiful woman with wavy medium-length hair, natural soft waves and curves in hair, flowing wavy texture, beachy waves, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with wavy medium anime hair, soft flowing waves, natural wavy texture, vibrant anime colors, high detail'
    },
    'Curly': {
      realistic: 'close-up professional portrait of beautiful woman with curly voluminous hair, tight spiral curls, bouncy ringlet curls, defined curl pattern, full curly hair, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with curly voluminous anime hair, spiral curls, bouncy curly texture, vibrant anime style, high detail'
    },
    'Coily': {
      realistic: 'close-up professional portrait of beautiful Black woman with natural coily afro hair, tight coiled texture, 4c hair pattern, voluminous natural afro, beautiful kinky coils, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with coily textured anime hair, tight coiled afro, voluminous natural hair, vibrant anime colors, high detail'
    },
    'Braided': {
      realistic: 'close-up professional portrait of beautiful woman with intricate braided hairstyle, neat cornrow braids or box braids, detailed braid patterns, protective hairstyle, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with braided anime hairstyle, detailed braid pattern, neat braids, vibrant anime style, high detail'
    },
    'Bun': {
      realistic: 'close-up professional portrait of beautiful woman with elegant hair bun, neat high bun or low bun, hair pulled back and twisted, sleek updo hairstyle, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with elegant hair bun, neat anime bun updo, hair pulled back, vibrant anime colors, high detail'
    },
    'Ponytail': {
      realistic: 'close-up professional portrait of beautiful woman with high ponytail, hair tied back in ponytail, flowing ponytail hair, sleek pulled-back style, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with high ponytail, anime ponytail tied back, flowing hair, vibrant anime style, high detail'
    },
    'Bob': {
      realistic: 'close-up professional portrait of beautiful woman with classic bob haircut, chin-length bob, straight blunt cut, sleek modern bob style, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with bob haircut, chin-length anime bob, straight blunt cut, vibrant anime colors, high detail'
    }
  },

  hair_length: {
    'Bald': {
      realistic: 'close-up professional portrait of beautiful bald woman, completely shaved head, smooth scalp, confident expression, elegant appearance, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful bald woman, smooth shaved head, confident anime expression, vibrant colors, high detail'
    },
    'Buzz Cut': {
      realistic: 'close-up professional portrait of beautiful woman with buzz cut, very short cropped hair, shaved close to scalp, edgy modern style, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with buzz cut, very short anime hair, cropped close, edgy style, high detail'
    },
    'Short': {
      realistic: 'close-up professional portrait of beautiful woman with short hair, ear-length or pixie cut, short cropped style, modern chic haircut, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with short anime hair, pixie cut style, cropped short, vibrant anime colors, high detail'
    },
    'Shoulder': {
      realistic: 'close-up professional portrait of beautiful woman with shoulder-length hair, hair ending at shoulders, medium length, versatile classic style, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with shoulder-length anime hair, hair at shoulders, medium length, vibrant anime style, high detail'
    },
    'Mid-Back': {
      realistic: 'close-up professional portrait of beautiful woman with mid-back length hair, long hair reaching middle of back, flowing long hair, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with mid-back length anime hair, long flowing hair to mid-back, vibrant anime colors, high detail'
    },
    'Waist': {
      realistic: 'close-up professional portrait of beautiful woman with waist-length hair, very long hair reaching waist, flowing ultra-long hair, stunning length, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with waist-length anime hair, very long flowing hair to waist, vibrant anime style, high detail'
    },
    'Hip': {
      realistic: 'close-up professional portrait of beautiful woman with hip-length hair, extremely long hair reaching hips, dramatic ultra-long flowing hair, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with hip-length anime hair, extremely long flowing hair to hips, vibrant anime colors, high detail'
    },
    'Floor': {
      realistic: 'close-up professional portrait of beautiful woman with floor-length hair, exceptionally long hair reaching floor, rapunzel-like ultra-long hair, dramatic stunning length, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with floor-length anime hair, exceptionally long hair to floor, rapunzel-like, vibrant anime style, high detail'
    }
  },

  hair_color: {
    'Black': {
      realistic: 'close-up professional portrait of beautiful woman with jet black hair, deep dark black hair color, glossy black shine, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with jet black anime hair, deep black hair color, glossy shine, vibrant anime style, high detail'
    },
    'Dark Brown': {
      realistic: 'close-up professional portrait of beautiful woman with dark brown hair, rich chocolate brown hair color, deep brunette, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with dark brown anime hair, chocolate brown color, vibrant anime style, high detail'
    },
    'Brown': {
      realistic: 'close-up professional portrait of beautiful woman with medium brown hair, natural brown hair color, warm brunette, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with medium brown anime hair, natural brown color, vibrant anime colors, high detail'
    },
    'Light Brown': {
      realistic: 'close-up professional portrait of beautiful woman with light brown hair, caramel light brown hair color, soft brunette, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with light brown anime hair, caramel brown color, vibrant anime style, high detail'
    },
    'Blonde': {
      realistic: 'close-up professional portrait of beautiful woman with blonde hair, golden blonde hair color, bright blonde shine, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with blonde anime hair, golden blonde color, bright shine, vibrant anime colors, high detail'
    },
    'Platinum': {
      realistic: 'close-up professional portrait of beautiful woman with platinum blonde hair, icy white blonde hair color, silvery platinum shine, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with platinum anime hair, icy white blonde color, silvery shine, vibrant anime style, high detail'
    },
    'Red': {
      realistic: 'close-up professional portrait of beautiful woman with red hair, vibrant ginger red hair color, fiery auburn red, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with red anime hair, vibrant red ginger color, fiery shine, vibrant anime colors, high detail'
    },
    'Auburn': {
      realistic: 'close-up professional portrait of beautiful woman with auburn hair, reddish-brown auburn hair color, warm red-brown tones, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with auburn anime hair, reddish-brown color, warm tones, vibrant anime style, high detail'
    },
    'Gray': {
      realistic: 'close-up professional portrait of beautiful woman with gray hair, silver gray hair color, sophisticated gray shine, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with gray anime hair, silver gray color, sophisticated look, vibrant anime colors, high detail'
    },
    'White': {
      realistic: 'close-up professional portrait of beautiful woman with white hair, pure white hair color, snow white shine, studio lighting, photorealistic, 8k quality',
      anime: 'anime close-up portrait of beautiful woman with white anime hair, pure white color, snow white shine, vibrant anime style, high detail'
    }
  },

  eye_color: {
    'Brown': {
      realistic: 'extreme close-up professional photo of beautiful eyes, warm brown eye color, rich chocolate brown irises, detailed eye texture, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, warm brown anime eyes, detailed brown irises, expressive look, vibrant anime style, high detail'
    },
    'Dark Brown': {
      realistic: 'extreme close-up professional photo of beautiful eyes, deep dark brown eye color, almost black brown irises, intense gaze, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, deep dark brown anime eyes, intense dark irises, dramatic look, vibrant anime colors, high detail'
    },
    'Amber': {
      realistic: 'extreme close-up professional photo of beautiful eyes, golden amber eye color, honey-colored amber irises, warm glow, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, golden amber anime eyes, honey-colored irises, warm glow, vibrant anime style, high detail'
    },
    'Hazel': {
      realistic: 'extreme close-up professional photo of beautiful eyes, multicolor hazel eye color, mix of green and brown in irises, unique pattern, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, multicolor hazel anime eyes, green-brown mix, unique pattern, vibrant anime colors, high detail'
    },
    'Green': {
      realistic: 'extreme close-up professional photo of beautiful eyes, emerald green eye color, vibrant green irises, striking gaze, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, emerald green anime eyes, vibrant green irises, striking look, vibrant anime style, high detail'
    },
    'Blue': {
      realistic: 'extreme close-up professional photo of beautiful eyes, ocean blue eye color, deep blue irises, captivating gaze, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, ocean blue anime eyes, deep blue irises, captivating look, vibrant anime colors, high detail'
    },
    'Light Blue': {
      realistic: 'extreme close-up professional photo of beautiful eyes, sky light blue eye color, pale icy blue irises, ethereal gaze, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, sky light blue anime eyes, pale blue irises, ethereal look, vibrant anime style, high detail'
    },
    'Gray': {
      realistic: 'extreme close-up professional photo of beautiful eyes, steel gray eye color, silver gray irises, mysterious gaze, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, steel gray anime eyes, silver gray irises, mysterious look, vibrant anime colors, high detail'
    },
    'Violet': {
      realistic: 'extreme close-up professional photo of beautiful eyes, rare violet purple eye color, purple-tinted irises, unique exotic gaze, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes, violet purple anime eyes, purple irises, exotic look, vibrant anime style, high detail'
    },
    'Heterochromia': {
      realistic: 'extreme close-up professional photo of beautiful eyes with heterochromia, one blue eye and one brown eye, two different colored irises, unique rare condition, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful eyes with heterochromia, one blue one brown anime eye, two different colors, unique look, vibrant anime colors, high detail'
    }
  },

  eye_shape: {
    'Almond': {
      realistic: 'extreme close-up professional photo of beautiful almond-shaped eyes, classic almond eye shape with slightly upturned outer corners, elegant oval shape, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful almond-shaped anime eyes, classic almond shape, elegant oval, vibrant anime style, high detail'
    },
    'Round': {
      realistic: 'extreme close-up professional photo of beautiful round eyes, large circular round eye shape, wide open appearance, youthful doe-eyed look, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful round anime eyes, large circular shape, wide innocent look, cute anime style, high detail'
    },
    'Hooded': {
      realistic: 'extreme close-up professional photo of beautiful hooded eyes, hooded eyelid covering crease, sultry mysterious eye shape, deep-set appearance, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful hooded anime eyes, hooded eyelid shape, mysterious sultry look, detailed anime style, high detail'
    },
    'Monolid': {
      realistic: 'extreme close-up professional photo of beautiful monolid eyes, smooth eyelid without crease, East Asian monolid eye shape, sleek elegant look, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful monolid anime eyes, smooth lid without crease, sleek Asian style, vibrant anime colors, high detail'
    },
    'Upturned': {
      realistic: 'extreme close-up professional photo of beautiful upturned eyes, outer corners lifting upward, cat-eye upturned shape, exotic alluring look, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful upturned anime eyes, cat-eye shape lifting up, exotic alluring look, vibrant anime style, high detail'
    },
    'Downturned': {
      realistic: 'extreme close-up professional photo of beautiful downturned eyes, outer corners angling downward, soft puppy-dog downturned shape, gentle appearance, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful downturned anime eyes, outer corners angling down, soft gentle look, vibrant anime colors, high detail'
    },
    'Close-Set': {
      realistic: 'extreme close-up professional photo of beautiful close-set eyes, eyes positioned closer together, narrow spacing between eyes, intense focused gaze, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful close-set anime eyes, eyes closer together, narrow spacing, intense look, vibrant anime style, high detail'
    },
    'Wide-Set': {
      realistic: 'extreme close-up professional photo of beautiful wide-set eyes, eyes positioned far apart, broad spacing between eyes, open exotic appearance, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful wide-set anime eyes, eyes far apart, broad spacing, exotic look, vibrant anime colors, high detail'
    },
    'Deep-Set': {
      realistic: 'extreme close-up professional photo of beautiful deep-set eyes, eyes recessed into skull, prominent brow bone, intense dramatic eye shape, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful deep-set anime eyes, recessed appearance, prominent brow, dramatic look, vibrant anime style, high detail'
    },
    'Prominent': {
      realistic: 'extreme close-up professional photo of beautiful prominent eyes, eyes protruding outward, large expressive prominent shape, doll-like appearance, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful prominent anime eyes, protruding large shape, expressive doll-like look, vibrant anime colors, high detail'
    }
  },

  lip_shape: {
    'Full': {
      realistic: 'extreme close-up professional photo of beautiful full lips, plump voluptuous lips, full upper and lower lip, luscious mouth, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful full lips, plump voluminous anime lips, full pouty mouth, vibrant anime style, high detail'
    },
    'Thin': {
      realistic: 'extreme close-up professional photo of beautiful thin lips, delicate slender lips, narrow upper and lower lip, refined mouth, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful thin lips, delicate slender anime lips, narrow refined mouth, vibrant anime colors, high detail'
    },
    'Heart-Shaped': {
      realistic: 'extreme close-up professional photo of beautiful heart-shaped lips, pronounced cupids bow, heart-shaped upper lip, romantic mouth shape, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful heart-shaped lips, pronounced cupids bow, heart-shaped anime mouth, romantic look, vibrant anime style, high detail'
    },
    'Bow-Shaped': {
      realistic: 'extreme close-up professional photo of beautiful bow-shaped lips, dramatic cupids bow, bow-shaped upper lip curve, defined lip shape, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful bow-shaped lips, dramatic cupids bow, defined anime lip curve, vibrant anime colors, high detail'
    },
    'Round': {
      realistic: 'extreme close-up professional photo of beautiful round lips, circular rounded lip shape, soft curved mouth, gentle appearance, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful round lips, circular rounded anime lips, soft curved mouth, cute anime style, high detail'
    },
    'Wide': {
      realistic: 'extreme close-up professional photo of beautiful wide lips, broad extended lip width, wide smiling mouth, generous lip shape, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful wide lips, broad wide anime mouth, extended lip width, vibrant anime style, high detail'
    },
    'Heavy Bottom': {
      realistic: 'extreme close-up professional photo of beautiful lips with heavy bottom lip, full plump lower lip, thinner upper lip, pouty appearance, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful lips with heavy bottom, full plump lower anime lip, pouty look, vibrant anime colors, high detail'
    },
    'Heavy Top': {
      realistic: 'extreme close-up professional photo of beautiful lips with heavy top lip, full plump upper lip, thinner lower lip, unique mouth shape, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful lips with heavy top, full plump upper anime lip, unique shape, vibrant anime style, high detail'
    },
    'Downturned': {
      realistic: 'extreme close-up professional photo of beautiful downturned lips, mouth corners angling downward, sad resting mouth shape, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful downturned lips, mouth corners angling down, subtle sad look, vibrant anime colors, high detail'
    },
    'Upturned': {
      realistic: 'extreme close-up professional photo of beautiful upturned lips, mouth corners lifting upward, natural smiling lip shape, cheerful appearance, studio lighting, photorealistic, macro photography, 8k quality',
      anime: 'anime extreme close-up of beautiful upturned lips, mouth corners lifting up, natural smile, cheerful anime style, high detail'
    }
  },

  face_shape: {
    'Oval': {
      realistic: 'professional portrait of beautiful woman with classic oval face shape, balanced proportions with forehead slightly wider than jawline, soft rounded chin, elegant symmetrical oval face, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with classic oval face shape, balanced anime proportions, soft rounded chin, elegant symmetrical face, vibrant anime style, high detail'
    },
    'Round': {
      realistic: 'professional portrait of beautiful woman with round face shape, full cheeks with soft rounded contours, circular face with equal width and length, gentle curved jawline, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with round face shape, full soft cheeks, circular anime face, gentle curves, cute anime style, high detail'
    },
    'Square': {
      realistic: 'professional portrait of beautiful woman with square face shape, strong angular jawline, broad forehead and jaw with equal width, defined square features, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with square face shape, strong angular anime jawline, broad forehead, defined square features, vibrant anime colors, high detail'
    },
    'Heart': {
      realistic: 'professional portrait of beautiful woman with heart face shape, wide forehead narrowing to pointed chin, heart-shaped face with prominent cheekbones, delicate jaw, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with heart face shape, wide forehead to pointed chin, heart-shaped anime face, delicate features, vibrant anime style, high detail'
    },
    'Diamond': {
      realistic: 'professional portrait of beautiful woman with diamond face shape, narrow forehead and jawline with wide cheekbones, angular diamond proportions, pointed chin, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with diamond face shape, narrow forehead and jaw, wide anime cheekbones, angular features, vibrant anime colors, high detail'
    },
    'Triangle': {
      realistic: 'professional portrait of beautiful woman with triangle face shape, narrow forehead widening to broad jawline, pear-shaped inverted triangle face, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with triangle face shape, narrow forehead to broad jaw, pear-shaped anime face, vibrant anime style, high detail'
    },
    'Oblong': {
      realistic: 'professional portrait of beautiful woman with oblong face shape, long narrow face with similar width throughout, elongated rectangular face, soft features, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with oblong face shape, long narrow anime face, elongated proportions, soft features, vibrant anime colors, high detail'
    },
    'Rectangle': {
      realistic: 'professional portrait of beautiful woman with rectangle face shape, long straight sides with equal width, elongated squared jawline, defined angular features, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with rectangle face shape, long straight anime sides, elongated squared jaw, defined features, vibrant anime style, high detail'
    },
    'Pear': {
      realistic: 'professional portrait of beautiful woman with pear face shape, small narrow forehead widening significantly at jaw, rounded bottom-heavy pear proportions, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with pear face shape, small narrow forehead, wide rounded jaw, bottom-heavy anime proportions, vibrant anime colors, high detail'
    },
    'Long': {
      realistic: 'professional portrait of beautiful woman with long face shape, vertically elongated face with high forehead, narrow cheeks and long chin, elegant length, studio lighting, photorealistic, 8k quality',
      anime: 'anime portrait of beautiful woman with long face shape, vertically elongated anime face, high forehead, elegant proportions, vibrant anime style, high detail'
    }
  },

  hips: {
    'Narrow': {
      realistic: 'professional full-body photo of woman with narrow hips, slim straight hip-line with minimal curve, narrow pelvic region, athletic straight silhouette, fitted clothing, studio lighting, photorealistic, 8k quality',
      anime: 'anime full-body illustration of woman with narrow hips, slim straight anime hip-line, minimal curves, athletic silhouette, fitted outfit, vibrant anime style, high detail'
    },
    'Moderate': {
      realistic: 'professional full-body photo of woman with moderate hips, balanced average hip width, proportional curves, natural feminine silhouette, fitted clothing, studio lighting, photorealistic, 8k quality',
      anime: 'anime full-body illustration of woman with moderate hips, balanced anime hip width, natural proportions, feminine silhouette, fitted outfit, vibrant anime colors, high detail'
    },
    'Wide': {
      realistic: 'professional full-body photo of woman with wide hips, broad pronounced hip curve, wide pelvic region, dramatic hourglass silhouette, fitted clothing, studio lighting, photorealistic, 8k quality',
      anime: 'anime full-body illustration of woman with wide hips, broad pronounced anime hip curve, dramatic hourglass, fitted outfit, vibrant anime style, high detail'
    },
    'Pear': {
      realistic: 'professional full-body photo of pear-shaped woman, hips significantly wider than shoulders, bottom-heavy pear body shape, curvy lower body, fitted clothing, studio lighting, photorealistic, 8k quality',
      anime: 'anime full-body illustration of pear-shaped woman, hips wider than shoulders, bottom-heavy anime body, curvy lower half, fitted outfit, vibrant anime colors, high detail'
    },
    'Hip Dips': {
      realistic: 'professional full-body photo of woman with hip dips, visible indentation on outer thighs below hip bone, natural hip dip curve, violin-shaped hips, fitted clothing, studio lighting, photorealistic, 8k quality',
      anime: 'anime full-body illustration of woman with hip dips, visible indentation on outer thighs, natural hip dip curve, violin-shaped anime hips, fitted outfit, vibrant anime style, high detail'
    },
    'Round Hips': {
      realistic: 'professional full-body photo of woman with round hips, smooth rounded hip curve without dips, full circular hip shape, curvy feminine silhouette, fitted clothing, studio lighting, photorealistic, 8k quality',
      anime: 'anime full-body illustration of woman with round hips, smooth rounded anime hip curve, full circular shape, curvy silhouette, fitted outfit, vibrant anime colors, high detail'
    }
  },

  bust: {
    'Petite': {
      realistic: 'professional upper body photo of woman with petite small bust, A or B cup chest, delicate subtle curves, athletic slender upper body, fitted top, studio lighting, photorealistic, 8k quality',
      anime: 'anime upper body illustration of woman with petite small bust, small anime chest, delicate subtle curves, slender upper body, fitted top, vibrant anime style, high detail'
    },
    'Small': {
      realistic: 'professional upper body photo of woman with small bust, B or C cup chest, modest natural curves, proportional upper body, fitted top, studio lighting, photorealistic, 8k quality',
      anime: 'anime upper body illustration of woman with small bust, B-C cup anime chest, modest natural curves, fitted top, vibrant anime colors, high detail'
    },
    'Medium': {
      realistic: 'professional upper body photo of woman with medium bust, C or D cup chest, balanced average curves, proportional feminine upper body, fitted top, studio lighting, photorealistic, 8k quality',
      anime: 'anime upper body illustration of woman with medium bust, C-D cup anime chest, balanced curves, feminine upper body, fitted top, vibrant anime style, high detail'
    },
    'Large': {
      realistic: 'professional upper body photo of woman with large bust, D or DD cup chest, pronounced full curves, voluptuous upper body, fitted top, studio lighting, photorealistic, 8k quality',
      anime: 'anime upper body illustration of woman with large bust, D-DD cup anime chest, pronounced full curves, voluptuous upper body, fitted top, vibrant anime colors, high detail'
    },
    'Extra Large': {
      realistic: 'professional upper body photo of woman with extra large bust, E or F+ cup chest, very full pronounced curves, extremely voluptuous upper body, fitted top, studio lighting, photorealistic, 8k quality',
      anime: 'anime upper body illustration of woman with extra large bust, E-F+ cup anime chest, very full curves, extremely voluptuous upper body, fitted top, vibrant anime style, high detail'
    },
    'Athletic': {
      realistic: 'professional upper body photo of athletic woman with toned muscular bust, firm athletic chest with defined pectoral muscles, strong upper body, sports bra, studio lighting, photorealistic, 8k quality',
      anime: 'anime upper body illustration of athletic woman with toned bust, firm athletic anime chest, defined muscles, strong upper body, sports bra, vibrant anime colors, high detail'
    }
  }
};

const NEGATIVE_PROMPT = 'nude, naked, nsfw, explicit, sexual, vulgar, inappropriate, deformed, ugly, bad anatomy, bad proportions, extra limbs, missing limbs, disfigured, distorted face, blurry, low quality, watermark, text, multiple people, child, underage';

async function generateImage(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch('https://api.novita.ai/v3/async/txt2img', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOVITA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          extra: { response_image_type: 'jpeg' },
          request: {
            model_name: 'sd_xl_base_1.0.safetensors',
            prompt: prompt,
            negative_prompt: NEGATIVE_PROMPT,
            width: 512,
            height: 768,
            sampler_name: 'DPM++ 2M Karras',
            steps: 40,
            guidance_scale: 8,
            seed: -1,
            batch_size: 1,
            image_num: 1,
          }
        }),
      });

      if (!response.ok) {
        if (attempt < retries) {
          console.log(`  ⚠️  API error, retrying (${attempt}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, 5000 * attempt));
          continue;
        }
        throw new Error(`Novita API error: ${await response.text()}`);
      }

      const data = await response.json();
      const taskId = data.task_id;

      for (let i = 0; i < 80; i++) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const pollResponse = await fetch(
          `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`,
          { headers: { 'Authorization': `Bearer ${NOVITA_API_KEY}` }}
        );

        if (!pollResponse.ok) continue;
        const pollData = await pollResponse.json();

        if (pollData.task.status === 'TASK_STATUS_SUCCEED') {
          let imageUrl = null;
          if (pollData.images && pollData.images.length > 0) {
            imageUrl = pollData.images[0].image_url;
          }
          
          if (!imageUrl) throw new Error('No image URL in response');
          return { url: imageUrl, seed: pollData.task.seed || -1 };
        } else if (pollData.task.status === 'TASK_STATUS_FAILED') {
          throw new Error(`Generation failed: ${pollData.task.reason}`);
        }
        process.stdout.write('.');
      }
      throw new Error('Timeout');
    } catch (error) {
      if (attempt < retries) {
        console.log(`  ⚠️  Error, retrying (${attempt}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, 5000 * attempt));
        continue;
      }
      throw error;
    }
  }
}

async function downloadImage(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.buffer();
    } catch (error) {
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }
      throw error;
    }
  }
}

async function uploadToSupabase(imageBuffer, filename, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/storage/v1/object/assets/attribute-images/${filename}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'image/jpeg',
          },
          body: imageBuffer,
        }
      );

      if (!response.ok) {
        if ((response.status === 502 || response.status === 503) && attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 3000 * attempt));
          continue;
        }
        throw new Error(`Upload error: ${await response.text()}`);
      }

      return `${SUPABASE_URL}/storage/v1/object/public/assets/attribute-images/${filename}`;
    } catch (error) {
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }
      throw error;
    }
  }
}

async function saveToDatabase(category, value, style, imageUrl, seed, prompt) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/attribute_images`,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        category, value, style,
        image_url: imageUrl,
        seed, prompt,
        width: 512, height: 768,
      }),
    }
  );

  if (!response.ok && response.status !== 409) {
    throw new Error(`Database error: ${await response.text()}`);
  }
}

async function main() {
  console.log('🎨 GENERATING EXPANDED BODY CUSTOMIZATION IMAGES\n');
  console.log('New categories: Hair Style, Hair Length, Hair Color, Eye Color,');
  console.log('Eye Shape, Lip Shape, Face Shape, Hips, Bust\n');

  let success = 0;
  let failed = 0;
  let total = 0;

  // Count total
  for (const category of Object.keys(EXPANDED_PROMPTS)) {
    total += Object.keys(EXPANDED_PROMPTS[category]).length * 2;
  }

  console.log(`Total new images to generate: ${total}\n`);
  console.log(`Estimated cost: ~$${(total * 0.015).toFixed(2)}`);
  console.log(`Estimated time: ${Math.round(total * 3 / 60)} hours\n`);

  for (const [category, values] of Object.entries(EXPANDED_PROMPTS)) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📁 Category: ${category.toUpperCase().replace(/_/g, ' ')}`);
    console.log('='.repeat(60));

    for (const [value, styles] of Object.entries(values)) {
      for (const [style, prompt] of Object.entries(styles)) {
        const index = success + failed + 1;
        console.log(`\n[${index}/${total}] 🎯 ${category} / ${value} / ${style}`);
        
        try {
          console.log(`  🎨 Generating...`);
          const { url, seed } = await generateImage(prompt);
          console.log(`  ✅ Generated!`);
          
          console.log(`  📥 Downloading...`);
          const imageBuffer = await downloadImage(url);
          console.log(`  ✅ Downloaded!`);
          
          const filename = `${category}-${value.toLowerCase().replace(/\+/g, '').replace(/[\s-]+/g, '-')}-${style}-${Date.now()}.jpg`;
          console.log(`  ☁️  Uploading...`);
          const publicUrl = await uploadToSupabase(imageBuffer, filename);
          console.log(`  ✅ Uploaded!`);
          
          console.log(`  💾 Saving to database...`);
          await saveToDatabase(category, value, style, publicUrl, seed, prompt);
          console.log(`  ✅ Complete!`);
          
          success++;
          
          if (index < total) {
            console.log(`  ⏸️  Waiting 3 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        } catch (error) {
          console.log(`  ❌ ERROR: ${error.message}`);
          failed++;
        }
      }
    }
  }

  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`✅ Generation Complete!`);
  console.log(`   Success: ${success}/${total}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Actual cost: ~$${(success * 0.015).toFixed(2)}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
