export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Cookies Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: July 11, 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better browsing experience and allow certain features to function properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Types of Cookies We Use</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Essential Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies are necessary for the website to function and cannot be disabled:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Session management cookies</li>
                <li>Security cookies</li>
                <li>Load balancing cookies</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Analytics Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies help us understand how visitors interact with our website:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Google Analytics cookies</li>
                <li>Page view tracking</li>
                <li>User behavior analysis</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Functional Cookies</h3>
              <p className="text-muted-foreground mb-4">
                These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Language preferences</li>
                <li>Theme settings</li>
                <li>Form data retention</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Third-Party Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We may use third-party services that place cookies on your device:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Google Analytics for website analytics</li>
              <li>Social media integration cookies</li>
              <li>Marketing and advertising cookies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Browser settings: Most browsers allow you to block or delete cookies</li>
              <li>Opt-out tools: Use industry opt-out tools for advertising cookies</li>
              <li>Website settings: Adjust cookie preferences where available</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Please note that disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookie Retention</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are retained for different periods depending on their purpose:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Session cookies: Deleted when you close your browser</li>
              <li>Persistent cookies: Remain until expiry date or manual deletion</li>
              <li>Analytics cookies: Typically retained for 2 years</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Updates to This Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about our use of cookies, please contact us:
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