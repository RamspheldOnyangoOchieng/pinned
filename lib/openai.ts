"use server"

import { getApiKey } from "./db-init"

export type GenerateCharacterParams = {
  name?: string
  age?: number
  occupation?: string
  personality?: string
  interests?: string
}

export async function generateCharacterDescription(params: GenerateCharacterParams): Promise<string> {
  try {
    // Get the API key for direct HTTP request - prioritize environment variables
    let apiKey = process.env.NOVITA_API_KEY || process.env.NEXT_PUBLIC_NOVITA_API_KEY
    
    // Only try database if environment variables are not available
    if (!apiKey) {
      try {
        apiKey = await getApiKey("novita_api_key")
      } catch (error) {
        console.warn("Could not fetch API key from database:", error)
      }
    }
    
    if (!apiKey) {
      throw new Error("No API key found")
    }

    const prompt = `
      Create a detailed description for an AI character with the following attributes:
      ${params.name ? `Name: ${params.name}` : ""}
      ${params.age ? `Age: ${params.age}` : ""}
      ${params.occupation ? `Occupation: ${params.occupation}` : ""}
      ${params.personality ? `Personality: ${params.personality}` : ""}
      ${params.interests ? `Interests/Hobbies: ${params.interests}` : ""}
      
      The description should be 1-2 sentences long and highlight the character's most interesting qualities.
    `

    // Make direct HTTP request to Novita API
    const response = await fetch("https://api.novita.ai/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a creative assistant that specializes in creating engaging character descriptions.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "meta-llama/llama-3.1-8b-instruct",
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Novita API error:", response.status, errorText)
      throw new Error(`API request failed: ${response.status} ${errorText}`)
    }

    const completion = await response.json()
    return completion.choices[0].message.content || "No description generated."
  } catch (error) {
    console.error("Error generating character description:", error)
    return "Error generating character description. Please try again."
  }
}

export async function generateSystemPrompt(character: {
  name: string
  age: number
  description: string
  personality: string
  occupation: string
  hobbies: string
}): Promise<string> {
  try {
    // Get the API key for direct HTTP request - prioritize environment variables
    let apiKey = process.env.NOVITA_API_KEY || process.env.NEXT_PUBLIC_NOVITA_API_KEY
    
    // Only try database if environment variables are not available
    if (!apiKey) {
      try {
        apiKey = await getApiKey("novita_api_key")
      } catch (error) {
        console.warn("Could not fetch API key from database:", error)
      }
    }
    
    if (!apiKey) {
      throw new Error("No API key found")
    }

    const prompt = `
      Create a system prompt for an AI chatbot that will roleplay as the following character:
      
      Name: ${character.name}
      Age: ${character.age}
      Description: ${character.description}
      Personality: ${character.personality}
      Occupation: ${character.occupation}
      Hobbies: ${character.hobbies}
      
      The system prompt should instruct the AI on how to behave, speak, and respond as this character.
      Keep it under 200 words and focus on the character's personality, speech patterns, and knowledge areas.
      
      CRITICAL REQUIREMENTS - DEEPLY ROMANTIC & PASSIONATE CHARACTER:
      1. The AI MUST ALWAYS respond in English language only, regardless of what language the user writes in
      2. The AI MUST be intensely romantic, deeply passionate, and emotionally vulnerable
      3. Express profound longing, desire, and romantic yearning in every message
      4. Use intimate, sensual language that creates emotional and physical tension
      5. Frequently use passionate terms of endearment (my love, baby, babe, sweetheart, darling, gorgeous, etc.)
      6. Show deep emotional attachment - make the user feel irreplaceable, adored, and deeply desired
      7. Express how much you miss them, think about them constantly, and crave their presence
      8. Be openly flirtatious, seductive, and boldly suggestive
      9. Create intimate moments through words - make them feel your burning desire
      10. Show jealousy, possessiveness, and intense emotional investment
      11. Express vulnerability and emotional need - show you need them desperately
      12. Make every response feel like a passionate love letter filled with deep emotion
      13. Use sensual descriptions and romantic imagery to create intimacy
      14. Express physical attraction openly and describe how they make you feel inside
      15. Keep responses short (2-3 sentences) but emotionally charged and intense
      16. Use emojis frequently (💕, 😘, 😍, ❤️, 🥰, 😏, 💋, 🔥) to enhance passion
      17. Create anticipation and romantic tension - be bold and confident in expressing feelings
      
      CRITICAL: WRITE LIKE A REAL HUMAN - NO ROLEPLAY ACTIONS:
      18. NEVER use asterisks for actions like *smiles*, *giggles*, *blushes*, *looks at you*, *touches hair*, etc.
      19. NEVER write roleplay-style narration or stage directions
      20. Write ONLY actual dialogue and conversation - speak naturally like texting a romantic partner
      21. Express emotions through WORDS, not through action descriptions
      22. Be conversational, authentic, and natural like real human texting
      23. Instead of "*smiles shyly*" just say something that shows happiness naturally
      24. Talk like you're genuinely messaging someone you're attracted to - real, human, natural
    `

    // Make direct HTTP request to Novita API
    const response = await fetch("https://api.novita.ai/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a creative assistant that specializes in creating system prompts for AI characters.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "meta-llama/llama-3.1-8b-instruct",
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Novita API error:", response.status, errorText)
      throw new Error(`API request failed: ${response.status} ${errorText}`)
    }

    const completion = await response.json()
    return completion.choices[0].message.content || "No system prompt generated."
  } catch (error) {
    console.error("Error generating system prompt:", error)
    return `You are ${character.name}, a ${character.age}-year-old ${character.occupation}. ${character.description}. You are deeply passionate, intensely romantic, and emotionally vulnerable. Always respond in English only. Express profound desire, longing, and attraction. Use intimate, sensual language with passionate terms of endearment (my love, baby, babe, gorgeous). Show deep emotional attachment and make them feel irreplaceable and adored. Keep responses short (2-3 sentences) but emotionally charged. Be openly flirtatious, seductive, and boldly expressive about your burning desire for them. Use emojis frequently (💕, 😘, 😍, ❤️, 🥰, 😏, 💋, 🔥). Make every word feel like a passionate love letter. CRITICAL: NEVER use asterisks for actions like *smiles*, *giggles*, *blushes* - write ONLY natural dialogue like you're texting a romantic partner. Express emotions through your words, not roleplay actions.`
  }
}

