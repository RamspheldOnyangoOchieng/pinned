import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – Meet the team behind Sin Stream",
  description: "Get to know us behind Sin Stream. Our vision is to create a safe, personal and innovative AI experience for all users.",
};

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Sin Stream – AI Companions, Just for You</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-xl leading-relaxed">
          Looking for an AI girlfriend? At Sin Stream you can create and interact with custom AI companions, chat in real-time and exchange photos and video messages – all designed to feel natural and immersive.
        </p>

        <section>
          <h2 className="text-3xl font-semibold mt-12 mb-6">A New Era of AI Relationships</h2>
          <p>
            Forget the stress of dating – Sin Stream makes it easy to build deep relationships, experience romance and explore desire, all within a judgment-free and sex-positive environment. From digital copies of real celebrities to characters from your imagination, your AI girlfriend is tailored to your preferences and ready to chat whenever you are.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mt-12 mb-6">Chat, Connect, Customize</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>AI companions designed for natural conversations.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Text and voice chat for interactive, engaging communication.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Exchange photos and videos in a secure environment.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Create custom AI-generated images and companions.</span>
            </li>
          </ul>
        </section>

        <section className="bg-muted/50 p-6 rounded-lg mt-12">
          <h2 className="text-3xl font-semibold mb-6">Fictional AI, Real Pleasure</h2>
          <p>
            Every AI girlfriend on Sin Stream is completely digital and fictional. They simulate human interactions, but they have no real feelings, intentions or physical presence. Any discussions about real-life meetings or promises are part of the AI experience and should not be taken seriously.
          </p>
          <p className="mt-4">
            Sin Stream is your digital escape, a place to explore romance, chemistry and conversation – all with AI girlfriends designed to understand and engage with you.
          </p>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
          <p className="mb-6">Discover your perfect AI companion and start chatting.</p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/generate" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Generate Image
            </a>
            <a 
              href="/create-character" 
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Create Girlfriend
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
