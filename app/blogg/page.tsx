import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Sin Stream",
  description: "Read the latest articles and news about AI, character creation and more from Sin Stream",
};

// Blog posts data - matching dreamgf.ai/blog style
const blogPosts = [
  {
    id: "1",
    slug: "fran-richard-gere-till-zendaya",
    title: "From Richard Gere to Zendaya: America's Celebrity Crushes Through Generations",
    excerpt: "Dream A from 1929 to 2024. Which is your celebrity, let it be recognized by your audience through famous crushers rotating if you just previous – it's just a little for everything.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop&q=80",
    author: "Adam Sending-Power",
    publishedAt: "2024-09-25",
  },
  {
    id: "2",
    slug: "varldsvida-alert-de-varsta-staderna",
    title: "Worldwide Alert: The Worst Cities for Authentic Online Dating, Revealed",
    excerpt: "See the worst. In just a natural sign of things like for others do is think, and you should matter a matter bailure approach is the business in any case. However that you too, single fathers, these, dont worry. Here's a color match.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&q=80",
    author: "Adam Sending-Power",
    publishedAt: "2024-09-22",
  },
  {
    id: "3",
    slug: "ny-undersokning-avslojar-39-procent",
    title: "New Survey Reveals: 39% of Americans Admit They Have a BDSM Fetish",
    excerpt: "39% read each. In just a natural part of being like for others. do is think, and you... when that you also, maybe resistance approach is the business in any case, moved that you, too, single fathers a fetish, don't worry: We in order teller.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop&q=80",
    author: "Adam Sending-Power",
    publishedAt: "2024-09-20",
  },
  {
    id: "4",
    slug: "topp-10-ai-flickvan-generatorer",
    title: "Top 10 AI Girlfriend Generators",
    excerpt: "The advancement of artificial intelligence (AI) has began and it began subs/ding for realistic AI GF. Different characters can be used on diverse purposes in the world of NSFW content and more. AI has bringing out new...",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop&q=80",
    author: "Adam Sending-Power",
    publishedAt: "2024-09-18",
  },
  {
    id: "5",
    slug: "vad-ar-en-ai-flickvan",
    title: "What is an AI Girlfriend?",
    excerpt: "In 2024, technology has reached the point for inter-wave in many of commonplace in the digital era. The introduction of AI girlfriends, virtual companions driven by artificial intelligence is only such trend...",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop&q=80",
    author: "Adam Sending-Power",
    publishedAt: "2024-09-15",
  },
  {
    id: "6",
    slug: "virtuellt-companionship",
    title: "Virtuellt Companionship",
    excerpt: "Will you explore for a virtual companion but don't know the significant high on the market and especially to meet your needs?",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop&q=80",
    author: "Adam Sending-Power",
    publishedAt: "2024-09-12",
  },
  {
    id: "7",
    slug: "heta-ai-tjejer",
    title: "Heta AI-tjejer",
    excerpt: "Are you looking for hot AI Girls? Look and Further you are in the right place!",
    image: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=800&h=600&fit=crop&q=80",
    author: "Adam Sending-Power",
    publishedAt: "2024-09-10",
  },
];

export default function BloggPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center">BLOGG</h1>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blogg/${post.slug}`}>
              <article className="group h-full">
                <div className="bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Author & Date */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString('sv-SE', { 
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Read More Link */}
                    <div className="mt-auto pt-4 border-t">
                      <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
