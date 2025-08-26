export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="font-bold">Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <p>
          AutoPilot Garage ("us", "we", or "our") operates the AutoPilot Garage website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h2 className="font-bold pt-8">1. Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>
        <h3 className="font-bold pt-8">Types of Data Collected</h3>
        <h4 className="font-bold pt-8">Personal Data</h4>
        <p>
          While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
        </p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Vehicle information (Make, Model, Year)</li>
          <li>Cookies and Usage Data</li>
        </ul>

        <h2 className="font-bold pt-8">2. Use of Data</h2>
        <p>
          AutoPilot Garage uses the collected data for various purposes:
        </p>
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
          <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information</li>
        </ul>

        <h2 className="font-bold pt-8">3. Security of Data</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>

        <h2 className="font-bold pt-8">4. Service Providers</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>

        <h2 className="font-bold pt-8">5. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.
        </p>

        <h2 className="font-bold pt-8">6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul>
          <li>By email: privacy@autopilot.co.ke</li>
          <li>By visiting this page on our website: /contact</li>
          <li>By phone number: +254 712 345 678</li>
        </ul>
      </div>
    </div>
  );
}
