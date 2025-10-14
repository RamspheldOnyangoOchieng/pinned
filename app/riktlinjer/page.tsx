import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines | Sin Stream",
  description: "Read our community guidelines to understand what is permitted and prohibited on Sin Stream.",
};

export default function GuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Community Guidelines</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg">
          Welcome to Sin Stream! Our community guidelines are designed to create a safe, respectful and enjoyable environment for all users. By using our Service, you agree to follow these guidelines.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Respect and Dignity</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Treat Everyone with Respect:</h3>
          <p>
            We expect all users to treat each other with respect and dignity. Harassment, bullying, hate speech or discrimination based on race, ethnicity, religion, gender, sexual orientation, disability or any other protected characteristic is strictly prohibited.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">No Personal Attacks:</h3>
          <p>
            Personal attacks, insults or threatening language directed at other users or staff is not tolerated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Prohibited Content</h2>
          
          <p>The following types of content are strictly prohibited on Sin Stream:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Illegal Content:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Content that violates local, national or international law.</li>
            <li>Content that promotes, facilitates or glorifies illegal activities.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Child Safety:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Content that sexualizes, exploits or endangers minors in any way.</li>
            <li>Content depicting or promoting child sexual abuse material (CSAM).</li>
            <li>We have zero tolerance for such content and will report violations to relevant authorities.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Violence and Harm:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Content that glorifies, promotes or incites violence, self-harm or harm to others.</li>
            <li>Graphic depictions of violence, gore or death.</li>
            <li>Content that promotes terrorism or extremist ideologies.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Hate Speech:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Content that promotes hatred or violence against individuals or groups based on protected characteristics.</li>
            <li>Symbols, imagery or language associated with hate groups.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Sexual Content:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>While our Service allows adult content, it must comply with our Terms of Service and applicable laws.</li>
            <li>Content depicting non-consensual sexual acts is strictly prohibited.</li>
            <li>Content involving minors or appearing to depict minors in sexual contexts is strictly prohibited.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Harassment and Doxxing:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Sharing someone's private information (doxxing) without their consent.</li>
            <li>Stalking, persistent unwanted contact or coordinated harassment.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Spam and Deceptive Practices:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Spam, unsolicited advertising or promotional content.</li>
            <li>Phishing, scams or other deceptive practices.</li>
            <li>Impersonation of other users, public figures or entities.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Intellectual Property Violations:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Content that infringes on copyright, trademark or other intellectual property rights.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Content Moderation</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Automated Systems:</h3>
          <p>
            We use AI and automated systems to monitor content in real-time for compliance with these guidelines. This includes review of prompts, messages and generated images.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Manual Review:</h3>
          <p>
            Our moderation team manually reviews certain content, such as public posts and AI characters in the community section.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Reporting:</h3>
          <p>
            If you encounter content that violates these guidelines, please report it immediately. You can report by contacting us at <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a> or through our <a href="/rapportera" className="text-primary hover:underline">reporting system</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Consequences of Violations</h2>
          
          <p>Violations of these Community Guidelines may result in:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Content Removal:</strong> Violating content will be removed from the platform.</li>
            <li><strong>Warnings:</strong> First-time or minor violations may result in a warning.</li>
            <li><strong>Temporary Suspension:</strong> Repeated or serious violations may result in temporary account suspension.</li>
            <li><strong>Permanent Ban:</strong> Severe violations, such as child exploitation or repeated offenses, will result in permanent account termination.</li>
            <li><strong>Legal Action:</strong> In cases involving illegal activity, we may report the violation to relevant authorities.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Appeals</h2>
          
          <p>
            If you believe your content was removed or your account was suspended in error, you may appeal the decision by contacting us at <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a>. We will review your appeal and respond within a reasonable timeframe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Updates to Guidelines</h2>
          
          <p>
            We may update these Community Guidelines from time to time. Your continued use of the Service after any changes constitutes your acceptance of the new guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          
          <p>
            If you have questions about these Community Guidelines, please contact us at:
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Email:</strong> <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a></li>
            <li><strong>Contact Page:</strong> <a href="/kontakta" className="text-primary hover:underline">Contact Us</a></li>
          </ul>
        </section>

        <p className="text-sm text-muted-foreground mt-8">
          Thank you for helping us maintain a safe and respectful community on Sin Stream!
        </p>
      </div>
    </div>
  );
}
