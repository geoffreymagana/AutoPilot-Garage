import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { serviceCategories } from '@/lib/services';

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">Our Automotive Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Quality, transparency, and expertise. We offer a comprehensive range of services to meet all your vehicle's needs. All prices are estimates in KES and may vary based on vehicle make and model.
        </p>
      </div>

      {serviceCategories.map((category) => (
        <section key={category.category} className="mt-20">
          <h2 className="font-headline text-3xl font-bold">{category.category}</h2>
          <p className="text-muted-foreground mt-2">{category.description}</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.services.map((service) => (
              <Card key={service.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-primary">
                        {service.from ? 'from ' : ''}KES {new Intl.NumberFormat('en-US').format(Number(service.price))}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-green-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/booking?service=${encodeURIComponent(service.name)}`}>Book This Service <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
