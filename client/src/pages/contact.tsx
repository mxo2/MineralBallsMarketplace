import Header from "@/components/header";
import Footer from "@/components/footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Header */}
        <section className="py-16 bg-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-bold text-4xl md:text-5xl mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Get in touch with us for any questions about our products or services
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="font-bold text-3xl text-gray-800 mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Phone className="text-primary w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Phone</h3>
                          <p className="text-gray-600">+91 9876543210</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Mail className="text-secondary w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Email</h3>
                          <p className="text-gray-600">info@mineralballs.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <MapPin className="text-accent w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Address</h3>
                          <p className="text-gray-600">123 Health Street, Wellness City, India 110001</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                          <Clock className="text-gold w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Business Hours</h3>
                          <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <Input placeholder="Your first name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <Input placeholder="Your last name" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Input type="email" placeholder="your.email@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <Input type="tel" placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <Input placeholder="What is this about?" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <Textarea 
                          placeholder="Tell us more about your inquiry..."
                          rows={6}
                        />
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-bold text-3xl text-gray-800 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the shelf life of your products?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our makhana products have a shelf life of 6-12 months when stored in a cool, dry place. 
                    Each package has a best-before date printed on it.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer bulk ordering for businesses?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, we offer wholesale pricing for bulk orders. Please contact us at info@mineralballs.com 
                    or call us for custom quotations based on your requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are your products suitable for people with allergies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our makhana products are naturally gluten-free, nut-free, and suitable for most dietary 
                    restrictions. However, please check the ingredient list for flavored varieties if you have 
                    specific allergies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is your return policy?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We offer a 30-day return policy for unopened products. If you're not satisfied with your 
                    purchase, please contact us within 30 days of delivery for a full refund or exchange.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
