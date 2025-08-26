
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Wrench,
  TrendingUp,
  Shield,
  Cog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogoMarquee } from '@/components/logo-marquee';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function LandingPage() {
  const services = [
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: 'Routine Maintenance',
      description:
        'Oil changes, tire rotations, and filter replacements to keep your car in top shape.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: 'Advanced Diagnostics',
      description:
        'State-of-the-art tools to diagnose any issue quickly and accurately.',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Brake & Suspension',
      description:
        'Ensuring your safety with top-quality brake and suspension services.',
    },
    {
      icon: <Cog className="h-8 w-8 text-primary" />,
      title: 'Engine & Transmission',
      description:
        'Expert repairs for the heart of your vehicle, from minor tweaks to major overhauls.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Mwangi',
      vehicle: 'BMW S1000RR',
      logo: '/logos/bmw.svg',
      text: "The Power Commander tune transformed my bike's performance. The team really knows their stuff when it comes to sport bikes. Highly recommended!",
      rating: 5,
    },
    {
      name: 'Brenda Chepkoech',
      vehicle: 'Yamaha R1',
      logo: '/logos/yamaha.svg',
      text: "Found the perfect Öhlins suspension setup for my R1. The website made it easy to find exactly what I needed, and shipping was super fast!",
      rating: 5,
    },
    {
      name: 'David Ochieng',
      vehicle: 'Ducati Panigale V4',
      logo: '/logos/ducati.svg',
      text: 'The Akrapovič exhaust system is amazing! The team helped me choose the perfect setup and the sound is incredible. My Panigale has never felt better!',
      rating: 5,
    },
     {
      name: 'Mary Wambui',
      vehicle: 'Toyota Prado',
      logo: '/logos/toyota.svg',
      text: 'AutoPilot Garage is the best in Nairobi! They fixed my car in no time and the price was very reasonable. The real-time tracking is a game-changer.',
      rating: 5,
    },
    {
      name: 'James Karanja',
      vehicle: 'Mercedes-Benz C-Class',
      logo: '/logos/mercedes.svg',
      text: 'I love the transparency. Seeing photos of the repair process gave me so much peace of mind. Highly recommend!',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "What makes AutoPilot Garage different from other garages?",
      answer: "We blend expert craftsmanship with cutting-edge technology. Our AI-powered diagnostics, transparent digital work cards, and real-time service tracking provide an unmatched level of accuracy, efficiency, and peace of mind for our customers."
    },
    {
      question: "What types of vehicles do you service?",
      answer: "We service a wide range of vehicles, including personal cars, SUVs, 4x4s, and light commercial vehicles. We have expertise in most major European, Japanese, and American brands."
    },
    {
      question: "How does the online booking system work?",
      answer: "Our interactive booking system allows you to select your desired service, choose a preferred date and time, and provide vehicle details. You'll receive an instant confirmation, and we'll be ready for you when you arrive."
    },
    {
      question: "Are your price estimates accurate?",
      answer: "Yes. Our service prices are based on extensive data and are highly accurate for standard services. For complex repairs, we provide a detailed estimate for your approval after a thorough diagnostic, so there are no surprises."
    },
    {
        question: "Can I track the progress of my vehicle's service?",
        answer: "Absolutely! Once you create an account and book a service, you'll get access to a personal dashboard where you can track the service status in real-time, view photos of the work being done, and communicate with our team."
    }
  ]

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full">
        <Image
          src="/images/main/hero-image.jpg"
          alt="Modern auto garage in Kenya"
          data-ai-hint="auto garage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-8">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Smarter Car Care,
            <br />
            <span className="text-primary">Driven by Technology.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl">
            Welcome to AutoPilot Garage, where we combine expert Kenyan
            mechanics with cutting-edge technology to provide unparalleled service and
            transparency.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/booking">
              Book a Service <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Logo Marquee */}
      <LogoMarquee />


      {/* Services Section */}
      <section id="services" className="py-20 sm:py-28">
        <div className="container px-4 sm:px-8">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
              Our Core Services
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              From routine check-ups to complex repairs, we've got you covered.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    {service.icon}
                  </div>
                  <CardTitle className="mt-6">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
                <Link href="/services">
                    View All Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-secondary py-20 sm:py-28">
        <div className="container px-4 sm:px-8">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We're proud of our work, and our Kenyan customers are too.
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full mt-16"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col justify-between">
                       <CardContent className="pt-8">
                          <div className="flex items-center text-yellow-400 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-current" />
                            ))}
                             {[...Array(5 - testimonial.rating)].map((_, i) => (
                              <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/50" />
                            ))}
                          </div>
                          <p className="text-muted-foreground mb-6 text-base">{`"${testimonial.text}"`}</p>
                      </CardContent>
                      <CardHeader className="pt-0 flex-row items-center gap-4">
                        <Image
                          src={testimonial.logo}
                          alt={`${testimonial.name}'s vehicle logo`}
                          width={48}
                          height={48}
                          className="rounded-full bg-muted object-contain p-1"
                        />
                        <div>
                          <CardTitle className="text-base font-bold">{testimonial.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{testimonial.vehicle}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2"/>
          </Carousel>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="container px-4 sm:px-8">
           <div className="text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Have questions? We have answers.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto mt-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
