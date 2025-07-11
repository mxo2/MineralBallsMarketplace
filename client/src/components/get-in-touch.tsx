import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  requirements: z.string().min(10, "Please describe your requirements")
});

type ContactForm = z.infer<typeof contactSchema>;

export default function GetInTouch() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      requirements: ""
    }
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      await apiRequest("/api/contact", "POST", data);
      toast({
        title: "Thank you for contacting us!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-amber-800/80 max-w-2xl mx-auto">
            Ready to experience premium Mineral Balls makhana? Share your requirements with us and we'll help you find the perfect solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-amber-800">
              <span className="font-semibold">📞 Call:</span>
              <a href="tel:+919829649640" className="hover:text-amber-900">+91-9829649640</a>
            </div>
            <div className="flex items-center gap-2 text-amber-800">
              <span className="font-semibold">📧 Email:</span>
              <a href="mailto:info@mxmomentum.in" className="hover:text-amber-900">info@mxmomentum.in</a>
            </div>
            <button 
              onClick={() => window.open('https://wa.me/919829649640?text=Hi%2C%20I%20am%20interested%20in%20Mineral%20Balls%20makhana%20products', '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              💬 WhatsApp Us
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-900 font-semibold">First Name *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-amber-200 focus:border-amber-500"
                          placeholder="Enter your first name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-900 font-semibold">Last Name *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-amber-200 focus:border-amber-500"
                          placeholder="Enter your last name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-900 font-semibold">Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          className="border-amber-200 focus:border-amber-500"
                          placeholder="your.email@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-900 font-semibold">Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="tel"
                          className="border-amber-200 focus:border-amber-500"
                          placeholder="+91 98765 43210"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-900 font-semibold">Company/Organization</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="border-amber-200 focus:border-amber-500"
                        placeholder="Your company name (optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-900 font-semibold">Your Requirements *</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        className="border-amber-200 focus:border-amber-500 min-h-[120px]"
                        placeholder="Tell us about your requirements - product types, quantities, delivery preferences, or any specific questions..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit Requirements"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="text-center mt-8 text-amber-700">
          <p className="text-sm">
            We respect your privacy and will never share your information with third parties.
          </p>
        </div>
      </div>
    </section>
  );
}