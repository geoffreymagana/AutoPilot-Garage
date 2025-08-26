import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Have a question or need to get in touch? We're here to help. Reach out to us through any of the methods below.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Your Message" rows={6} />
            <Button type="submit" size="lg" className="w-full">Send Message</Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-6">Our Information</h2>
            <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 text-primary mt-1" />
                <div>
                    <h3 className="font-semibold text-lg">Our Location</h3>
                    <p className="text-muted-foreground">123 Ngong Road, Nairobi, Kenya</p>
                </div>
            </div>
             <Separator />
            <div className="flex items-start gap-4">
                <Phone className="h-8 w-8 text-primary mt-1" />
                <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-muted-foreground">+254 712 345 678</p>
                    <p className="text-sm text-muted-foreground">For bookings and inquiries.</p>
                </div>
            </div>
             <Separator />
            <div className="flex items-start gap-4">
                <Mail className="h-8 w-8 text-primary mt-1" />
                <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-muted-foreground">hello@autopilot.co.ke</p>
                     <p className="text-sm text-muted-foreground">We reply within 24 hours.</p>
                </div>
            </div>
             <Separator />
             <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-primary mt-1" />
                <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-muted-foreground">Sunday & Public Holidays: Closed</p>
                </div>
            </div>
        </div>
      </div>
      
       {/* Map Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Find Us Here</h2>
        <div className="aspect-video w-full rounded-lg overflow-hidden border">
           <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817758514159!2d36.82194631475406!3d-1.286389399061985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b6fe9554!2sNairobi!5e0!3m2!1sen!2ske!4v1678886365402!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>
    </div>
  );
}
