import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report & Complaints | Sin Stream",
  description: "Learn how to report inappropriate content or file complaints on Sin Stream.",
};

export default function ReportPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Reporting and Complaints</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg">
          At Sin Stream, we are committed to maintaining a safe and respectful environment for all users. If you encounter content or behavior that violates our <a href="/riktlinjer" className="text-primary hover:underline">Community Guidelines</a> or <a href="/villkor" className="text-primary hover:underline">Terms of Service</a>, we encourage you to report it to us.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. What Can Be Reported?</h2>
          
          <p>You can report the following types of violations:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Inappropriate Content:</strong> Content that violates our Community Guidelines, including illegal content, violence, hate speech, harassment or sexually explicit content involving minors.</li>
            <li><strong>Harassment or Abuse:</strong> Behavior that targets, bullies or harasses other users.</li>
            <li><strong>Spam or Scams:</strong> Unsolicited advertising, phishing attempts or other deceptive practices.</li>
            <li><strong>Intellectual Property Violations:</strong> Content that infringes on copyright, trademark or other intellectual property rights.</li>
            <li><strong>Privacy Violations:</strong> Sharing someone's private information without their consent (doxxing).</li>
            <li><strong>Account Issues:</strong> Impersonation, unauthorized account access or other account-related problems.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How to Report</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Via Email:</h3>
          <p>
            Send a detailed report to <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a>. Please include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>A description of the violation</li>
            <li>The username or content link (if applicable)</li>
            <li>Screenshots or other evidence (if possible)</li>
            <li>Your contact information (if you wish to receive a response)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Via Contact Form:</h3>
          <p>
            Visit our <a href="/kontakta" className="text-primary hover:underline">contact page</a> and fill out the form with details of your report.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">For Urgent Matters:</h3>
          <p>
            If you encounter content that poses an immediate threat to safety (such as child exploitation, threats of violence or self-harm), please report it immediately via email at <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a> with "URGENT" in the subject line.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. What Information to Include</h2>
          
          <p>To help us investigate your report efficiently, please provide as much information as possible:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Description:</strong> A clear explanation of the issue or violation.</li>
            <li><strong>Evidence:</strong> Screenshots, links or other supporting materials.</li>
            <li><strong>User Information:</strong> The username or profile of the user involved (if applicable).</li>
            <li><strong>Date and Time:</strong> When the incident occurred.</li>
            <li><strong>Your Contact Information:</strong> If you wish to receive updates or a response.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Our Review Process</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Step 1: Receipt of Report</h3>
          <p>
            We will acknowledge receipt of your report within 24-48 hours (depending on volume and urgency).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Step 2: Investigation</h3>
          <p>
            Our moderation team will review the reported content or behavior and investigate the matter thoroughly.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Step 3: Action</h3>
          <p>
            If we determine that a violation has occurred, we will take appropriate action, which may include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Removing the violating content</li>
            <li>Issuing a warning to the user</li>
            <li>Temporarily suspending the user's account</li>
            <li>Permanently banning the user from the platform</li>
            <li>Reporting the matter to relevant authorities (in cases of illegal activity)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Step 4: Follow-Up</h3>
          <p>
            If you provided contact information, we will notify you of the outcome of your report (to the extent permitted by privacy laws).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Confidentiality and Anonymity</h2>
          
          <p>
            We treat all reports with confidentiality. If you prefer to remain anonymous, you may do so, but providing contact information helps us investigate your report more effectively.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. False Reports</h2>
          
          <p>
            Submitting false or malicious reports is a violation of our Terms of Service and may result in action against your account. Please only report genuine violations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Appeals</h2>
          
          <p>
            If you believe that action was taken against your content or account in error, you may appeal the decision by contacting us at <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a>. We will review your appeal and respond within a reasonable timeframe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          
          <p>
            For all reports and inquiries, please contact us at:
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Email:</strong> <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a></li>
            <li><strong>Contact Page:</strong> <a href="/kontakta" className="text-primary hover:underline">Contact Us</a></li>
          </ul>
        </section>

        <p className="text-sm text-muted-foreground mt-8">
          Thank you for helping us keep Sin Stream safe and respectful for everyone!
        </p>
      </div>
    </div>
  );
}
