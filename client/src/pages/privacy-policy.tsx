export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: July 11, 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              Maximum Momentum Inc ("Mineral Balls", "we", "us", or "our") collects information you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Fill out our contact forms</li>
              <li>Communicate with us via WhatsApp or email</li>
              <li>Subscribe to our newsletter</li>
              <li>Interact with our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Personal Information</h2>
            <p className="text-muted-foreground mb-4">
              We may collect the following personal information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Company or organization details</li>
              <li>Product requirements and preferences</li>
              <li>Communication history</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process and fulfill your product requests</li>
              <li>Send you promotional materials and updates (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To trusted service providers who assist us in operating our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-amber-50 p-6 rounded-lg">
              <p className="text-foreground font-semibold mb-2">Maximum Momentum Inc</p>
              <p className="text-muted-foreground">T1 Jagdamba Towere</p>
              <p className="text-muted-foreground">Amarapali Circle, Vaishali Nagar</p>
              <p className="text-muted-foreground">Jaipur 302021</p>
              <p className="text-muted-foreground mt-2">
                Email: <a href="mailto:info@mxmomentum.in" className="text-amber-600 hover:underline">info@mxmomentum.in</a>
              </p>
              <p className="text-muted-foreground">
                Phone: <a href="tel:+919829649640" className="text-amber-600 hover:underline">+91-9829649640</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}