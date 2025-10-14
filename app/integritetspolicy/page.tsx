import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sin Stream",
  description: "Learn how we handle your personal data and protect your privacy on Sin Stream.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg">
          At Sin Stream, we take your privacy seriously. This Privacy Policy explains how we collect, use, share and protect your personal information when you use our website and services (collectively referred to as the "Service").
        </p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Information You Provide:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Account Information:</strong> When you register for an account, we collect your email address, username and password.</li>
            <li><strong>Profile Information:</strong> You may choose to provide additional information such as a profile picture or bio.</li>
            <li><strong>Payment Information:</strong> When you make a purchase, our payment processors collect billing and payment information.</li>
            <li><strong>Communications:</strong> If you contact us via email or other channels, we collect the content of your messages.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Information Collected Automatically:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Usage Data:</strong> We collect information about how you use the Service, including pages visited, features used and interactions.</li>
            <li><strong>Device Information:</strong> We collect information about the device you use, including IP address, browser type, operating system and device identifiers.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to track your activity on our Service. See our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a> for more information.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Content You Create:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>User-Generated Content:</strong> This includes AI characters you create, prompts you submit, messages you send and images you generate.</li>
            <li><strong>Public Posts:</strong> If you share content publicly in the community section, this information is accessible to other users.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>To Provide and Maintain the Service:</strong> We use your information to operate and improve the Service, including to create and manage your account, process transactions and provide customer support.</li>
            <li><strong>To Personalize Your Experience:</strong> We use your information to tailor the Service to your preferences and interests.</li>
            <li><strong>To Communicate with You:</strong> We may send you updates, newsletters, promotional material and other information that may be of interest to you. You can opt out of marketing communications at any time.</li>
            <li><strong>To Ensure Safety and Security:</strong> We use automated systems and manual review to monitor content for compliance with our Community Guidelines and to prevent abuse, fraud and illegal activity.</li>
            <li><strong>To Analyze and Improve:</strong> We use analytics tools to understand how users interact with the Service and to improve our features and functionality.</li>
            <li><strong>To Comply with Legal Obligations:</strong> We may use your information to comply with applicable laws, regulations and legal processes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Share Your Information</h2>
          
          <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">With Service Providers:</h3>
          <p>
            We work with third-party service providers who perform services on our behalf, such as payment processing, data storage, analytics and customer support. These providers have access to your information only to the extent necessary to perform their services and are obligated to protect your information.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">For Legal Reasons:</h3>
          <p>
            We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders or government agencies).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">In Connection with Business Transfers:</h3>
          <p>
            If we are involved in a merger, acquisition or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">With Your Consent:</h3>
          <p>
            We may share your information with third parties when you have given us your consent to do so.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Public Information:</h3>
          <p>
            If you choose to share content publicly in the community section, this information is accessible to other users and may be indexed by search engines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          
          <p>
            We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it from unauthorized access, disclosure, alteration or destruction. These measures include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Encryption:</strong> We use encryption to protect sensitive data during transmission and storage.</li>
            <li><strong>Access Controls:</strong> We restrict access to personal information to employees and contractors who need it to perform their duties.</li>
            <li><strong>Regular Security Audits:</strong> We conduct regular security assessments to identify and address vulnerabilities.</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
          
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to comply with legal, accounting or reporting requirements. When we no longer need your information, we will securely delete or anonymize it.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>Account Information:</strong> Retained for as long as your account is active.</li>
            <li><strong>Chat History:</strong> Retained for as long as your account is active or until you delete it.</li>
            <li><strong>Transaction Records:</strong> Retained for legal and accounting purposes, typically for 7 years.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights and Choices</h2>
          
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Access and Correction:</h3>
          <p>You can access and update your account information at any time through your account settings.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Deletion:</h3>
          <p>You can permanently delete your account and all associated data at any time through the Service.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Data Portability:</h3>
          <p>You have the right to request a copy of your personal information in a structured, commonly used format.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Opt-Out of Marketing Communications:</h3>
          <p>You can unsubscribe from marketing emails by clicking the "unsubscribe" link in the email or by adjusting your account settings.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Cookies:</h3>
          <p>You can control cookies through your browser settings. See our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a> for more information.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Exercise Your Rights:</h3>
          <p>
            To exercise any of these rights, please contact us at <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a>. We will respond to your request within a reasonable timeframe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
          
          <p>
            Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information as quickly as possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. International Data Transfers</h2>
          
          <p>
            Your information may be transferred to and maintained on servers located outside of your country of residence, where data protection laws may differ. By using the Service, you consent to the transfer of your information to these locations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Third-Party Links</h2>
          
          <p>
            The Service may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
          
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of the Service after any changes constitutes your acceptance of the new Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
          
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
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
          By using our Service, you acknowledge that you have read and understood this Privacy Policy.
        </p>
      </div>
    </div>
  );
}
