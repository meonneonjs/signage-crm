'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    bio: 'With over 15 years in the creative industry, Sarah leads our vision to empower creative businesses.',
    image: '/team/sarah.jpg',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-founder',
    bio: 'Michael brings technical excellence and innovation to our platform, ensuring we stay ahead of industry needs.',
    image: '/team/michael.jpg',
  },
  {
    name: 'Emily Thompson',
    role: 'Head of Design',
    bio: 'Emily ensures our platform maintains the highest standards of user experience and visual design.',
    image: '/team/emily.jpg',
  },
  {
    name: 'David Kim',
    role: 'Head of Customer Success',
    bio: 'David\'s dedication to customer satisfaction drives our commitment to providing exceptional support and service.',
    image: '/team/david.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About AtellierCRM
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're on a mission to empower creative businesses with the tools they need to thrive.
              Our platform is built by creatives, for creatives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Our Mission</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Empowering Creative Excellence
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We believe that creative professionals deserve tools that match their innovation and craftsmanship.
              AtellierCRM is designed to streamline business operations so you can focus on what you do best - creating.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Our Team</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet the Minds Behind AtellierCRM
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our diverse team brings together expertise in technology, design, and creative business management.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white p-8 rounded-2xl shadow-sm">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-primary-600 mt-1">{member.role}</p>
                <p className="mt-4 text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 py-32">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:75px_75px]" />
        <div className="container relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Creative Business?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
            Join the community of creative professionals using AtellierCRM to streamline their operations
            and focus on what matters most - their craft.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/sign-up'}
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 