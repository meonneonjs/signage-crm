'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Users, Heart, Globe2, Zap, Star } from 'lucide-react';
import Image from 'next/image';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const jobPostings: JobPosting[] = [
  {
    id: 'fe-dev',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Join our engineering team to build beautiful, responsive interfaces for our CRM platform.',
  },
  {
    id: 'pm',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Lead product strategy and work closely with our customers to build the future of creative business management.',
  },
  {
    id: 'cs-lead',
    title: 'Customer Success Lead',
    department: 'Customer Success',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Help our customers succeed by providing exceptional support and strategic guidance.',
  },
  {
    id: 'sales-exec',
    title: 'Sales Executive',
    department: 'Sales',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Drive growth by helping creative agencies discover how AtellierCRM can transform their business.',
  },
];

const values = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Customer First',
    description: 'We put our customers at the heart of everything we do.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Passion',
    description: "We're passionate about helping creative businesses succeed.",
  },
  {
    icon: <Globe2 className="w-6 h-6" />,
    title: 'Remote-First',
    description: 'Work from anywhere and collaborate with a global team.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Innovation',
    description: 'We constantly push boundaries and embrace new ideas.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Diversity',
    description: 'We celebrate diversity and foster an inclusive environment.',
  },
];

const benefits = [
  'Competitive salary and equity',
  'Remote-first culture',
  'Flexible time off',
  'Health, dental, and vision insurance',
  'Professional development budget',
  'Home office stipend',
  'Regular team retreats',
  'Parental leave',
  'Mental health support',
  '401(k) matching',
  'Wellness programs',
  'Company-wide hackathons',
];

export default function CareersPage() {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1 text-sm text-primary-700 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2" />
            We're Hiring!
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h1>
          <p className="text-xl text-gray-600">
            Help us transform how creative businesses manage their operations and delight their clients.
          </p>
        </div>

        {/* Culture Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12">
            <Image
              src="/careers/team.jpg"
              alt="AtellierCRM Team"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Our Culture
              </h2>
              <p className="text-gray-600 mb-6">
                At AtellierCRM, we're building more than just a CRM platform - we're creating a community of passionate individuals dedicated to transforming how creative businesses operate.
              </p>
              <p className="text-gray-600">
                We believe in fostering an environment where creativity thrives, ideas are valued, and every team member has the opportunity to make a significant impact.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.slice(0, 4).map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                    <div className="text-primary-600">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Open Positions
          </h2>
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                    <p className="text-gray-600">
                      {job.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary-50 group-hover:text-primary-700 group-hover:border-primary-200"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Benefits & Perks
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-primary-100 mb-8">
            We're always looking for talented individuals to join our team. Send us your resume and let's talk!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Send Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary-600"
            >
              Learn About Culture
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 