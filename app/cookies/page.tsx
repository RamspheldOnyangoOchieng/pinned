import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Sin Stream",
  description: "Learn how we use cookies and similar tracking technologies on Sin Stream.",
};

export default function CookiePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg">
          This Cookie Policy explains how Sin Stream uses cookies and similar tracking technologies when you visit our website and use our services. By using our Service, you consent to the use of cookies as described in this policy.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. What Are Cookies?</h2>
          
          <p>
            Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience and provide information to website owners.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Types of Cookies:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser.</li>
            <li><strong>Persistent Cookies:</strong> Cookies that remain on your device until they expire or are manually deleted.</li>
            <li><strong>First-Party Cookies:</strong> Cookies set by the website you are visiting.</li>
            <li><strong>Third-Party Cookies:</strong> Cookies set by external services or partners.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
          
          <p>We use cookies for the following purposes:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Essential Cookies:</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management and accessibility. You cannot opt out of these cookies.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Authentication:</strong> To remember your login status and keep you signed in.</li>
            <li><strong>Security:</strong> To protect against fraudulent activity and enhance security.</li>
            <li><strong>Load Balancing:</strong> To distribute traffic across our servers.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Functional Cookies:</h3>
          <p>
            These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Preferences:</strong> To remember your language, theme and other customizable settings.</li>
            <li><strong>User Experience:</strong> To provide features like chat history and saved content.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Analytics Cookies:</h3>
          <p>
            These cookies help us understand how users interact with our website by collecting anonymous information about usage patterns.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Usage Statistics:</strong> To analyze which pages are visited and how users navigate the site.</li>
            <li><strong>Performance Monitoring:</strong> To identify technical issues and improve site performance.</li>
            <li><strong>A/B Testing:</strong> To test new features and improvements.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Marketing and Advertising Cookies:</h3>
          <p>
            These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Targeted Advertising:</strong> To show you ads that are relevant to your interests.</li>
            <li><strong>Conversion Tracking:</strong> To measure the success of our advertising campaigns.</li>
            <li><strong>Remarketing:</strong> To show you ads on other websites based on your visit to our site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Third-Party Cookies</h2>
          
          <p>
            We work with third-party service providers who may place cookies on your device for analytics, advertising and other purposes. These include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring.</li>
            <li><strong>Stripe:</strong> For payment processing.</li>
            <li><strong>Supabase:</strong> For authentication and database services.</li>
            <li><strong>Advertising Networks:</strong> For delivering targeted ads.</li>
          </ul>
          <p className="mt-4">
            These third parties have their own privacy policies and we recommend reviewing them to understand how they use cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Managing Cookies</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Browser Settings:</h3>
          <p>
            Most web browsers allow you to control cookies through their settings. You can:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Block all cookies</li>
            <li>Block third-party cookies</li>
            <li>Delete cookies after each session</li>
            <li>Set preferences for specific websites</li>
          </ul>
          <p className="mt-4">
            Please note that blocking or deleting cookies may impact your experience on our website and limit certain features.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Browser-Specific Instructions:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
            <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
            <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Opt-Out Tools:</h3>
          <p>
            You can opt out of certain third-party cookies using industry tools:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Network Advertising Initiative</a></li>
            <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance</a></li>
            <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices</a> (EU)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Other Tracking Technologies</h2>
          
          <p>
            In addition to cookies, we may use other tracking technologies such as:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Web Beacons:</strong> Small graphic images (also known as "pixel tags") that track user behavior.</li>
            <li><strong>Local Storage:</strong> HTML5 local storage for storing data locally on your device.</li>
            <li><strong>Session Storage:</strong> Temporary storage that is cleared when you close your browser.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Updates to This Cookie Policy</h2>
          
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory or operational reasons. We will notify you of any significant changes by posting the updated policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Email:</strong> <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a></li>
            <li><strong>Contact Page:</strong> <a href="/kontakta" className="text-primary hover:underline">Contact Us</a></li>
          </ul>
        </section>

        <p className="text-sm text-muted-foreground mt-8">
          Last Updated: January 2025
        </p>

        <p className="text-sm text-muted-foreground mt-4">
          By continuing to use our Service, you acknowledge that you have read and understood this Cookie Policy.
        </p>
      </div>
    </div>
  );
}
