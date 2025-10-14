import { Metadata } from "next";
import Link from "next/link";
import { 
  Sparkles, 
  MessageSquare, 
  ImagePlus, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Crown,
  Coins,
  FolderOpen,
  Settings,
  Trash2,
  Mail,
  Lock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Guide - User Guide | Sin Stream",
  description: "Complete guide to getting started with Sin Stream. Learn how to create AI characters, chat, generate images and much more.",
};

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Platform Guide</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your complete guide to Sin Stream - from registration to advanced features
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        
        {/* Section 1: Getting Started */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold m-0">1. Getting Started - Registration</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Create Your Account</h3>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 1: Open the login dialog</p>
                    <p className="text-sm text-muted-foreground">
                      Click the "Log in" button in the upper right corner of the page.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 2: Choose registration method</p>
                    <p className="text-sm text-muted-foreground">
                      You have three options:
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                      <li>• <strong>Email and password:</strong> Enter your email address and choose a secure password</li>
                      <li>• <strong>Google:</strong> Sign in with your Google account</li>
                      <li>• <strong>Discord:</strong> Sign in with your Discord account</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 3: Click "Create Account"</p>
                    <p className="text-sm text-muted-foreground">
                      If you see the login dialog, click the "Create Account" link at the bottom to switch to the registration form.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 4: Done!</p>
                    <p className="text-sm text-muted-foreground">
                      You are now logged in and can start exploring the platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5">
              <p className="text-sm">
                <strong>💡 Tip:</strong> If you forgot your password, you can click the "Forgot password?" link in the login dialog to reset it.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Image Generation */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <ImagePlus className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold m-0">2. Image Generation</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg">
              Generate unique AI images with our advanced image generation tool. Simply describe what you want to see, and our AI will create it for you.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-3">How to Generate Images</h3>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 1: Navigate to image generation</p>
                    <p className="text-sm text-muted-foreground">
                      Click "Generate" in the main menu or use the direct link to the image generation page.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 2: Write your prompt</p>
                    <p className="text-sm text-muted-foreground">
                      Describe in detail what you want the image to show. The more specific you are, the better the result.
                    </p>
                    <div className="mt-2 p-3 bg-background/50 rounded border border-border">
                      <p className="text-xs font-mono text-muted-foreground">
                        Example: "A majestic dragon flying over snow-capped mountains at sunset, detailed fantasy art style"
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 3: Choose settings</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                      <li>• <strong>Number of images:</strong> Choose how many variations you want (1-4)</li>
                      <li>• <strong>Style:</strong> Select artistic style (realistic, anime, artistic, etc.)</li>
                      <li>• <strong>Quality:</strong> Standard or HD quality</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 4: Generate</p>
                    <p className="text-sm text-muted-foreground">
                      Click the "Generate" button and wait while the AI creates your images. This typically takes 10-30 seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 5: Download or share</p>
                    <p className="text-sm text-muted-foreground">
                      Once generated, you can download the images or share them with others.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Tips for Better Results</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">✨ Be specific</p>
                  <p className="text-sm text-muted-foreground">
                    Include details about colors, lighting, mood, and style to get more precise results.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">🎨 Use artistic terms</p>
                  <p className="text-sm text-muted-foreground">
                    Terms like "oil painting", "digital art", "photorealistic" help guide the style.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">📐 Mention composition</p>
                  <p className="text-sm text-muted-foreground">
                    Describe the camera angle, perspective, or framing you want.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">🔄 Experiment</p>
                  <p className="text-sm text-muted-foreground">
                    Try different variations of your prompt to find what works best.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-5">
              <p className="text-sm">
                <strong>⚡ Token cost:</strong> Image generation consumes tokens. The cost varies depending on quality and number of images. Premium users get discounted rates.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: AI Characters */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold m-0">3. Create AI Character</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg">
              Create your own unique AI characters with customizable personalities, backgrounds, and traits. Your characters can have conversations, generate images, and interact in unique ways.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-3">Creating a Character</h3>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 1: Go to character creation</p>
                    <p className="text-sm text-muted-foreground">
                      Click "Create Character" in the main menu or your dashboard.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 2: Basic information</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                      <li>• <strong>Name:</strong> Give your character a unique name</li>
                      <li>• <strong>Description:</strong> Write a short public description</li>
                      <li>• <strong>Image:</strong> Upload a profile picture or generate one with AI</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 3: Personality & background</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                      <li>• <strong>Personality:</strong> Describe how your character acts and thinks</li>
                      <li>• <strong>Background story:</strong> Give context to who the character is</li>
                      <li>• <strong>Traits:</strong> Add specific personality traits</li>
                      <li>• <strong>Example dialogue:</strong> Show how the character talks</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 4: Advanced settings</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                      <li>• <strong>Visibility:</strong> Choose if the character is public or private</li>
                      <li>• <strong>Tags:</strong> Add searchable tags</li>
                      <li>• <strong>Category:</strong> Select appropriate category</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 5: Create & test</p>
                    <p className="text-sm text-muted-foreground">
                      Save your character and start a conversation to test their personality and responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Managing Your Characters</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <FolderOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">View all characters</p>
                    <p className="text-sm text-muted-foreground">
                      Go to "My Characters" to see all the characters you've created.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Settings className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Edit character</p>
                    <p className="text-sm text-muted-foreground">
                      Click the edit button on any character to modify their properties, personality, or image.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Trash2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Delete character</p>
                    <p className="text-sm text-muted-foreground">
                      You can permanently delete characters you no longer want. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5">
              <p className="text-sm">
                <strong>💡 Tip:</strong> The more detailed and specific your character description, the better and more consistent their responses will be in conversations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Chat */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold m-0">4. Chat with AI Characters</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg">
              Start conversations with AI characters - both those you've created and those shared by the community. Each conversation is unique and adapts to your interactions.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-3">Starting a Conversation</h3>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 1: Choose a character</p>
                    <p className="text-sm text-muted-foreground">
                      Browse available characters on the main page, in "Characters" or in your own character list.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 2: Click "Start Chat"</p>
                    <p className="text-sm text-muted-foreground">
                      Click the "Chat" button on the character card to open the conversation interface.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 3: Write your message</p>
                    <p className="text-sm text-muted-foreground">
                      Type your message in the text box at the bottom and press Enter or click Send.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Step 4: Continue the conversation</p>
                    <p className="text-sm text-muted-foreground">
                      The AI responds based on the character's personality and your previous messages. Keep chatting to develop the conversation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Chat Features</h3>
              <div className="grid gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ImagePlus className="h-5 w-5 text-primary" />
                    <p className="font-medium">Request images</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can ask the character to generate images during the conversation. Just describe what you want to see.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <p className="font-medium">Context memory</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The AI remembers previous messages in the conversation, creating coherent and contextual responses.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trash2 className="h-5 w-5 text-primary" />
                    <p className="font-medium">Delete messages</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can delete individual messages or the entire conversation history if you want to start fresh.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    <p className="font-medium">Regenerate response</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Not satisfied with a response? Click the regenerate button to get a new answer.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Chat Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <span className="text-2xl">💭</span>
                  <div>
                    <p className="font-medium mb-1">Be clear and specific</p>
                    <p className="text-sm text-muted-foreground">
                      The more clearly you express yourself, the better the AI can understand and respond.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <p className="font-medium mb-1">Play along with the character</p>
                    <p className="text-sm text-muted-foreground">
                      Adapt your conversation style to the character's personality for more engaging interactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <p className="font-medium mb-1">Build context gradually</p>
                    <p className="text-sm text-muted-foreground">
                      The AI understands the conversation better as it progresses, so give it time to develop.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-medium mb-1">Watch token usage</p>
                    <p className="text-sm text-muted-foreground">
                      Each message consumes tokens. Premium users get more tokens and lower rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-5">
              <p className="text-sm">
                <strong>⚡ Token cost:</strong> Chatting consumes tokens. Longer messages and more complex conversations use more tokens. Premium users get significantly discounted rates.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Tokens & Premium */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold m-0">5. Tokens and Premium</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg">
              Tokens are the currency used on Sin Stream to access AI features. Premium members get significant discounts and additional benefits.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-3">What Are Tokens?</h3>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-3">
                  Tokens are consumed when you use AI features such as:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Sending messages in chat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Generating images</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Creating AI characters</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">How to Get Tokens</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-lg border border-primary/20">
                  <Crown className="h-8 w-8 text-primary mb-3" />
                  <p className="font-semibold mb-2">Premium Subscription</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get monthly tokens included in your subscription, plus heavily discounted rates for all AI features.
                  </p>
                  <Link 
                    href="/premium" 
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    View Premium Plans <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-muted/30 p-5 rounded-lg border border-border">
                  <Coins className="h-8 w-8 text-primary mb-3" />
                  <p className="font-semibold mb-2">Purchase Token Packages</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Buy token packages as needed without a subscription commitment.
                  </p>
                  <Link 
                    href="/premium" 
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Buy Tokens <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Premium Benefits</h3>
              <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-lg border border-primary/10">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Discounted token rates</p>
                      <p className="text-sm text-muted-foreground">Save up to 70% on all AI features</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Monthly token allowance</p>
                      <p className="text-sm text-muted-foreground">Included tokens in your subscription</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Priority support</p>
                      <p className="text-sm text-muted-foreground">Faster response times from our team</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Early access</p>
                      <p className="text-sm text-muted-foreground">Be first to try new features</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">No ads</p>
                      <p className="text-sm text-muted-foreground">Ad-free experience</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Premium badge</p>
                      <p className="text-sm text-muted-foreground">Stand out in the community</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link 
                    href="/premium"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Crown className="h-5 w-5" />
                    Upgrade to Premium
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Managing Your Subscription</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Settings className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">View subscription status</p>
                    <p className="text-sm text-muted-foreground">
                      Go to Settings → Subscription to see your current plan, renewal date, and token balance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <ArrowRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Change plan</p>
                    <p className="text-sm text-muted-foreground">
                      You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Trash2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Cancel subscription</p>
                    <p className="text-sm text-muted-foreground">
                      You can cancel anytime. Your premium benefits continue until the end of the current billing period.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Settings & Account */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold m-0">6. Settings</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg">
              Customize your experience and manage your account through the settings menu.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-3">Accessing Settings</h3>
              <div className="bg-muted/50 p-5 rounded-lg">
                <p className="mb-3">
                  Click your profile picture or username in the top right corner, then select "Settings" from the dropdown menu.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Available Settings</h3>
              <div className="space-y-4">
                
                {/* Profile Settings */}
                <div className="border border-border rounded-lg p-5">
                  <h4 className="font-semibold mb-3">Profile Settings</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• <strong>Username:</strong> Change your display name</li>
                    <li>• <strong>Profile picture:</strong> Upload a new avatar</li>
                    <li>• <strong>Bio:</strong> Add or edit your profile description</li>
                    <li>• <strong>Email:</strong> Update your email address</li>
                  </ul>
                </div>

                {/* Privacy Settings */}
                <div className="border border-border rounded-lg p-5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Privacy Settings
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• <strong>Profile visibility:</strong> Control who can see your profile</li>
                    <li>• <strong>Character visibility:</strong> Set default visibility for new characters</li>
                    <li>• <strong>Activity status:</strong> Show or hide when you're online</li>
                  </ul>
                </div>

                {/* Notification Settings */}
                <div className="border border-border rounded-lg p-5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Notification Settings
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• <strong>Email notifications:</strong> Choose which emails you want to receive</li>
                    <li>• <strong>Marketing emails:</strong> Opt in or out of promotional content</li>
                    <li>• <strong>System notifications:</strong> Important updates and announcements</li>
                  </ul>
                </div>

                {/* Account Security */}
                <div className="border border-border rounded-lg p-5">
                  <h4 className="font-semibold mb-3">Account Security</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• <strong>Change password:</strong> Update your password regularly for security</li>
                    <li>• <strong>Connected accounts:</strong> Manage social login connections (Google, Discord)</li>
                    <li>• <strong>Active sessions:</strong> View and log out of devices</li>
                  </ul>
                </div>

                {/* Language & Appearance */}
                <div className="border border-border rounded-lg p-5">
                  <h4 className="font-semibold mb-3">Language & Appearance</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• <strong>Language:</strong> Choose your preferred language (English)</li>
                    <li>• <strong>Theme:</strong> Select light, dark, or system theme</li>
                    <li>• <strong>Font size:</strong> Adjust text size for better readability</li>
                  </ul>
                </div>

                {/* Subscription Management */}
                <div className="border border-border rounded-lg p-5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Subscription Management
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• <strong>Current plan:</strong> View your subscription status</li>
                    <li>• <strong>Token balance:</strong> Check remaining tokens</li>
                    <li>• <strong>Billing history:</strong> See past payments</li>
                    <li>• <strong>Payment method:</strong> Update credit card or payment info</li>
                    <li>• <strong>Cancel subscription:</strong> End your premium membership</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Account Management</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Change email</p>
                    <p className="text-sm text-muted-foreground">
                      You can update your email address in settings. You'll need to verify the new email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Lock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Reset password</p>
                    <p className="text-sm text-muted-foreground">
                      If you've forgotten your password, use the "Forgot password?" link on the login page.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <Trash2 className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-500">Delete account</p>
                    <p className="text-sm text-muted-foreground">
                      You can permanently delete your account in settings. This action is irreversible and will delete all your data, characters, and chat history.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5">
              <p className="text-sm">
                <strong>💡 Tip:</strong> Regularly review your privacy and security settings to ensure your account is protected and your experience is personalized to your preferences.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Support */}
        <section className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold m-0">7. Support and Help</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg">
              Need help? We're here to assist you with any questions or issues you may encounter.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-3">How to Get Help</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/30 p-5 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <p className="font-semibold">FAQ</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check our Frequently Asked Questions for quick answers to common issues.
                  </p>
                  <Link 
                    href="/faq"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Visit FAQ <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-muted/30 p-5 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <p className="font-semibold">Contact Support</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Email our support team for personalized assistance.
                  </p>
                  <Link 
                    href="/kontakta"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Important Links</h3>
              <div className="grid gap-3">
                <Link 
                  href="/villkor"
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="font-medium">Terms of Service</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>

                <Link 
                  href="/integritetspolicy"
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="font-medium">Privacy Policy</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>

                <Link 
                  href="/riktlinjer"
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="font-medium">Community Guidelines</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>

                <Link 
                  href="/rapportera"
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="font-medium">Report & Complaints</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 md:p-12 text-center border border-primary/10">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Now that you know how everything works, it's time to dive in and explore all the amazing features Sin Stream has to offer!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/create-character"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Users className="h-5 w-5" />
              Create Your First Character
            </Link>
            
            <Link 
              href="/characters"
              className="inline-flex items-center justify-center gap-2 border border-border bg-background px-8 py-4 rounded-lg font-medium hover:bg-accent transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              Explore Characters
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
