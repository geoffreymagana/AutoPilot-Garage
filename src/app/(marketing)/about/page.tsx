import Image from 'next/image';
import { Award, Users, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: 'Michael Otieno',
      role: 'Lead Mechanic & Founder',
      avatar: 'https://picsum.photos/400/500',
      backgroundClass: 'bg-yellow-300',
    },
    {
      name: 'Fatima Ahmed',
      role: 'Diagnostics Specialist',
      avatar: 'https://picsum.photos/400/501',
      backgroundClass: 'bg-green-300',
    },
    {
      name: 'Peter Kariuki',
      role: 'Customer Service Manager',
      avatar: 'https://picsum.photos/400/502',
      backgroundClass: 'bg-pink-300',
    },
    {
      name: 'Grace Wanjiru',
      role: 'Lead Technician',
      avatar: 'https://picsum.photos/400/503',
      backgroundClass: 'bg-blue-300',
    },
     {
      name: 'John Doe',
      role: 'Marketing Head',
      avatar: 'https://picsum.photos/400/504',
      backgroundClass: 'bg-indigo-300',
    },
     {
      name: 'Jane Smith',
      role: 'Operations Manager',
      avatar: 'https://picsum.photos/400/505',
      backgroundClass: 'bg-orange-300',
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">About AutoPilot Garage</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Your trusted partner in automotive care, blending Kenyan expertise with world-class technology.
        </p>
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline text-3xl font-bold">Our Story</h2>
          <p className="mt-4 text-muted-foreground">
            Founded in 2018 in the heart of Nairobi, AutoPilot Garage started with a simple mission: to bring honesty, transparency, and technological innovation to the Kenyan auto repair industry. Frustrated by the lack of reliable service, our founder, Michael Otieno, envisioned a garage where customers could feel confident and informed.
          </p>
          <p className="mt-4 text-muted-foreground">
            Today, we are a leading-edge facility that leverages AI for diagnostics and service management, but our core values remain the same. We are a team of passionate, certified professionals dedicated to providing the highest quality service to our community.
          </p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden">
             <Image src="https://picsum.photos/600/400" alt="AutoPilot Garage workshop" data-ai-hint="mechanic team" fill className="object-cover" />
        </div>
      </div>

      <section id="mission" className="py-20 sm:py-28">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card>
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Wrench className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide top-tier, technology-driven automotive services with a commitment to transparency, quality, and customer satisfaction.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                   <Users className="h-8 w-8 text-primary" />
                </div>
              <CardTitle className="mt-4">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be Kenya's most trusted and technologically advanced auto care provider, setting new standards for the industry.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                   <Award className="h-8 w-8 text-primary" />
                </div>
              <CardTitle className="mt-4">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Integrity, Innovation, Excellence, and Community. These pillars guide every decision we make and every car we service.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="team">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">Meet Our Expert Team</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The certified professionals dedicated to keeping you on the road.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-left">
                <div className={cn("relative w-full aspect-[4/5] overflow-hidden", member.backgroundClass)}>
                    <Image src={member.avatar} alt={member.name} width={400} height={500} className="object-contain object-bottom" data-ai-hint="team member"/>
                </div>
                <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
