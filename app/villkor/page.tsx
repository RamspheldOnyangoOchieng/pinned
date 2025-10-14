import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules and Terms of Service | Sin Stream",
  description: "Read our rules and terms to understand how Sin Stream works, what applies to usage and how we protect your privacy.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg">
          Please read these Terms of Service carefully before using our website, applications and services (collectively referred to as the "Service"). By accessing or using our Service, you agree to be bound by these terms and all applicable laws and regulations.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Binding Agreement:</h3>
          <p>
            By using our Service, you confirm that you have read, understood and agreed to these Terms of Service, our <a href="/integritetspolicy" className="text-primary hover:underline">Privacy Policy</a> and our <a href="/riktlinjer" className="text-primary hover:underline">Community Guidelines</a>, which are incorporated herein by reference. If you do not agree to any part of these documents, you may not use our Service and should immediately delete all downloaded applications or materials.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Age Requirement:</h3>
          <p>You must be at least 18 years old and legally capable of entering into binding agreements to use our Service.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Prior Suspension:</h3>
          <p>You certify and warrant that you have not previously been suspended or banned from using our Service.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Good Faith Use:</h3>
          <p>You agree to use our Service in good faith and in accordance with these Terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Account Registration and Security</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Creating an Account:</h3>
          <p>
            To access certain features of the Service, you may need to create an account. You agree to provide accurate, current and complete information during the registration process and to keep your account information updated. Your personal data will be handled in accordance with our <a href="/integritetspolicy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">One Account Per User:</h3>
          <p>You may only create and use one account.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Age and Legal Compliance:</h3>
          <p>
            By registering, you confirm that you are at least 18 years old. Use of the Service is not permitted where it is legally prohibited. Providing false or outdated information may result in immediate suspension or termination of your account.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Account Security:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are solely responsible for all activities that occur under your account.</li>
            <li>Notify us immediately if you suspect unauthorized access to or use of your account, or any other security breach.</li>
            <li>We reserve the right to refuse service, terminate accounts, or remove or edit content at our sole discretion.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of the Service and Restrictions</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">User Responsibility:</h3>
          <p>You are solely responsible for your use of the Service and all content that you create, upload, publish, share or transmit through it.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Prohibited Activities:</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Use the Service for any unlawful purpose or in violation of any local, state, national or international law.</li>
            <li>Violate or infringe upon the rights of others, including intellectual property, privacy or publicity rights.</li>
            <li>Upload, post or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene or otherwise objectionable.</li>
            <li>Engage in any form of harassment, including but not limited to cyberbullying or stalking.</li>
            <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li>Interfere with or disrupt any security features or usage restrictions within the Service.</li>
            <li>Attempt to gain unauthorized access to any part of the Service, other user accounts, or computer systems or networks connected to the Service.</li>
            <li>Use automated systems (bots, scrapers) to access the Service without our express written permission.</li>
            <li>Use the Service in a manner that disrupts its performance or interferes with other users.</li>
            <li>Engage in any activity that could damage, disable, overburden or impair the Service.</li>
            <li>Collect or harvest any personally identifiable information from the Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Content Moderation and Safety</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Community Guidelines Enforcement:</h3>
          <p>
            We take content safety seriously. All users must adhere to our <a href="/riktlinjer" className="text-primary hover:underline">Community Guidelines</a>. Violations may result in warnings, suspensions or permanent bans.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Automated Monitoring:</h3>
          <p>
            We use automated systems, including AI and large language models (LLM), to monitor content in real-time for compliance with our safety guidelines. This includes review of prompts, messages and generated images.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Manual Review:</h3>
          <p>
            A dedicated moderation team reviews certain content, such as public posts and AI characters in the community section. We provide a reporting system for users to flag inappropriate content. You can report by contacting us at <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Reporting Policy:</h3>
          <p>
            Read more in our <a href="/rapportera" className="text-primary hover:underline">Reporting and Complaints Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Ownership:</h3>
          <p>
            All content, features and functionality of the Service, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations and software, are the exclusive property of Sin Stream or its licensors and are protected by copyright, trademark and other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Limited License:</h3>
          <p>
            You may not copy, modify, reproduce, download, distribute or use any material from the Service without our express written permission in advance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Content and Links</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">No Endorsement:</h3>
          <p>
            We are not responsible for the accuracy, reliability or legality of user-generated content or third-party content. The Service may contain links to third-party websites that are not owned or controlled by us. Access to and use of them is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Payments and Subscriptions</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Payment Processing:</h3>
          <p>
            We use trusted third-party vendors to process payments. By subscribing, you agree to pay the applicable fees. Ensure your billing information is accurate and up-to-date.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Recurring Subscriptions:</h3>
          <p>
            Some subscriptions are recurring. You authorize us to charge your payment method automatically at the beginning of each billing cycle. You can cancel your subscription at any time.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Refund Policy:</h3>
          <p>
            Due to the operational costs of our AI services, we generally do not offer refunds for subscription fees or purchases, unless required by applicable consumer protection law.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Free Trials:</h3>
          <p>
            We may offer a free trial period or limited number of free interactions for new users to evaluate the Service before committing to a paid subscription.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Account Termination</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">User Termination:</h3>
          <p>
            You can permanently delete your account at any time through the Service. We reserve the right to suspend or terminate your account at our discretion for violations of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Privacy and Security</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Data Protection:</h3>
          <p>
            We prioritize the privacy and security of your personal information and chat history. We use encryption and anonymization techniques and regularly update our security protocols.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Disclaimer of Warranties</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">As-Is Basis:</h3>
          <p>
            Your use of the Service is at your own risk. The Service is provided "AS IS" and "AS AVAILABLE" without any warranties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to Terms</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Updates:</h3>
          <p>
            We may update these Terms of Service at any time. Your continued use of the Service after publication of revised Terms constitutes your acceptance of the changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Age Restrictions</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Adult Content:</h3>
          <p>
            Our Service is intended for users who are 18 years or older. We do not knowingly collect personally identifiable information from individuals under 13 years of age.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Us</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Questions:</h3>
          <p>
            If you have any questions regarding these Terms of Service, please contact us at <a href="/kontakta" className="text-primary hover:underline">our contact page</a> or via email: <a href="mailto:info@sinsync.co.uk" className="text-primary hover:underline">info@sinsync.co.uk</a>
          </p>
        </section>

        <p className="text-sm text-muted-foreground mt-8">
          By using our Service, you confirm that you have read, understood and agree to be bound by these Terms of Service.
        </p>
      </div>
    </div>
  );
}
