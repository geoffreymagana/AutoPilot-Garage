export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="font-bold">Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the AutoPilot Garage website (the "Service") operated by AutoPilot Garage ("us", "we", or "our").</p>

        <p>Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.</p>

        <h2 className="font-bold pt-8">1. Accounts</h2>
        <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>

        <h2 className="font-bold pt-8">2. Services and Payments</h2>
        <p>All prices for services are listed in Kenyan Shillings (KES) and are subject to change. The prices listed on the "Services" page are estimates and the final cost may vary based on the specific needs of your vehicle, parts required, and labor. We will provide a final quote for your approval before commencing any work beyond the initial agreement.</p>

        <h2 className="font-bold pt-8">3. Appointments</h2>
        <p>By booking an appointment, you agree to bring your vehicle to our location at the scheduled time. We reserve the right to reschedule or cancel appointments, and we will make a reasonable effort to notify you in advance. If you need to cancel or reschedule, please provide at least 24 hours' notice.</p>
        
        <h2 className="font-bold pt-8">4. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of AutoPilot Garage and its licensors. The Service is protected by copyright, trademark, and other laws of both Kenya and foreign countries.</p>

        <h2 className="font-bold pt-8">5. Limitation of Liability</h2>
        <p>In no event shall AutoPilot Garage, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

        <h2 className="font-bold pt-8">6. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.</p>

        <h2 className="font-bold pt-8">7. Changes</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

        <h2 className="font-bold pt-8">8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
            <li>By email: legal@autopilot.co.ke</li>
            <li>By visiting our contact page: /contact</li>
        </ul>
      </div>
    </div>
  );
}
