import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Sin Stream",
  description: "Have questions or need help? Don't hesitate to contact us! We're here to provide support, answer your questions and help you get the most out of your experience.",
};

export default function KontaktaPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Sin Stream Support: We're Here to Help!</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-xl">
          At Sin Stream, we strive to provide you with a smooth, pleasant and problem-free experience. Our dedicated customer support team is here to help you with any questions, concerns or technical issues you may encounter. We strive to provide professional, confidential and impartial assistance to ensure your satisfaction.
        </p>

        <section>
          <h2 className="text-3xl font-semibold mt-12 mb-6">How Can We Help You Today?</h2>
          <p>Our knowledgeable support team can assist you with a variety of topics, including:</p>

          <div className="space-y-6 mt-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Account and Profile Help:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Troubleshooting login issues (e.g., password reset, account recovery)</li>
                <li>Guidance on managing your profile settings and customizing your account</li>
                <li>Help with account verification processes</li>
                <li>Assistance with updating your account information</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Technical Support:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Resolving technical issues, bugs or performance problems on our website, app(s) or services</li>
                <li>Providing guidance on browser and app compatibility</li>
                <li>Helping troubleshoot error messages</li>
                <li>Offering solutions for connectivity issues</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Billing and Payment Questions:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clarifying transaction details and billing cycles</li>
                <li>Providing information about our subscription plans and pricing</li>
                <li>Answering questions related to payment methods and processing</li>
                <li>Handling inquiries regarding potential refunds</li>
                <li>Helping manage or cancel your subscriptions</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Content and Community Guidelines:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing clarifications about our <a href="/villkor" className="text-primary hover:underline">Terms of Service</a> and <a href="/riktlinjer" className="text-primary hover:underline">Community Guidelines</a></li>
                <li>Handling reports and complaints about user-generated content or behavior (see our <a href="/rapportera" className="text-primary hover:underline">Reporting and Complaints Policy</a>)</li>
                <li>Answering questions about content moderation processes</li>
                <li>Guiding you on how to report violations</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Feature Explanations and Usage:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing information on how to use specific features in Sin Stream (e.g., AI character creation, image generation, chat functionality)</li>
                <li>Offering tips and tricks to enhance your experience</li>
                <li>Answering questions about feature limitations or updates</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mt-12 mb-6">How to Contact Us</h2>
          <p>We offer several convenient ways to reach our support team:</p>

          <div className="space-y-6 mt-6">
            <div className="border border-border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">📧 Email</h3>
              <p>
                For detailed inquiries or when you need to send attachments, please email us at{" "}
                <a href="mailto:support@sinsync.co.uk" className="text-primary hover:underline font-semibold">
                  support@sinsync.co.uk
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                We strive to respond to all email inquiries within 24 hours.
              </p>
            </div>

            <div className="border border-border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">💬 Live Chat</h3>
              <p>
                For quick questions and real-time assistance, our Live Chat feature is often available on our website and in our app(s). Look for the chat icon in the bottom right corner of the screen.
              </p>
            </div>

            <div className="border border-border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">❓ Help Center/FAQ</h3>
              <p>
                Before contacting us directly, we encourage you to browse through our comprehensive <a href="/faq" className="text-primary hover:underline">Help Center or Frequently Asked Questions (FAQ) section</a>. You may quickly and easily find the answer to your question here. This resource covers common topics and provides troubleshooting guides.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mt-12 mb-6">What to Expect When Contacting Support</h2>
          
          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Prompt Acknowledgment</h3>
                <p className="text-sm text-muted-foreground">We strive to acknowledge all inquiries within 24 hours of receipt.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Efficient and Effective Help</h3>
                <p className="text-sm text-muted-foreground">Our team is dedicated to providing you with accurate and helpful solutions as quickly as possible.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Professional and Respectful Communication</h3>
                <p className="text-sm text-muted-foreground">You can expect to be treated with courtesy and respect by our support agents.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Confidentiality</h3>
                <p className="text-sm text-muted-foreground">We handle your personal information and support requests with the utmost confidentiality, in accordance with our <a href="/integritetspolicy" className="text-primary hover:underline">Privacy Policy</a>.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold mb-1">Impartiality</h3>
                <p className="text-sm text-muted-foreground">We strive to handle all inquiries fairly and impartially, in accordance with our policies and guidelines.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-primary/10 p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">We Value Your Feedback</h2>
          <p>
            Your feedback is crucial in helping us improve our services and support. After interacting with our support team, you may receive a survey or be invited to share your experience. We encourage you to provide honest feedback so we can continue to improve our support services.
          </p>
        </section>

        <section className="mt-12 text-center bg-gradient-to-br from-primary/20 to-primary/10 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 text-muted-foreground">
            Thank you for being part of the Sin Stream community. We're here to help you get the most out of your experience!
          </p>
          <a 
            href="mailto:support@sinsync.co.uk" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </a>
        </section>
      </div>
    </div>
  );
}
