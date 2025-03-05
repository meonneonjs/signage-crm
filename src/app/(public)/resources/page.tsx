'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Book, Video, FileText, Download, Users, Newspaper } from 'lucide-react';
import Link from 'next/link';

const resourceCategories = [
  {
    icon: <Book className="w-6 h-6" />,
    title: 'Documentation',
    description: 'Comprehensive guides and API documentation.',
    links: [
      { title: 'Getting Started Guide', href: '/docs/getting-started' },
      { title: 'API Reference', href: '/docs/api' },
      { title: 'Integration Guides', href: '/docs/integrations' },
    ],
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Video Tutorials',
    description: 'Learn through step-by-step video guides.',
    links: [
      { title: 'Platform Overview', href: '/tutorials/overview' },
      { title: 'Feature Walkthroughs', href: '/tutorials/features' },
      { title: 'Best Practices', href: '/tutorials/best-practices' },
    ],
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Case Studies',
    description: 'Real success stories from our customers.',
    links: [
      { title: 'Agency Success Stories', href: '/case-studies/agencies' },
      { title: 'Enterprise Solutions', href: '/case-studies/enterprise' },
      { title: 'ROI Analysis', href: '/case-studies/roi' },
    ],
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Downloads',
    description: 'Templates, plugins, and integrations.',
    links: [
      { title: 'Project Templates', href: '/downloads/templates' },
      { title: 'Browser Extensions', href: '/downloads/extensions' },
      { title: 'Mobile Apps', href: '/downloads/apps' },
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community',
    description: 'Connect with other AtellierCRM users.',
    links: [
      { title: 'Community Forum', href: '/community/forum' },
      { title: 'User Groups', href: '/community/groups' },
      { title: 'Events Calendar', href: '/community/events' },
    ],
  },
  {
    icon: <Newspaper className="w-6 h-6" />,
    title: 'Updates',
    description: 'Latest news and product updates.',
    links: [
      { title: 'Release Notes', href: '/updates/releases' },
      { title: 'Product Roadmap', href: '/updates/roadmap' },
      { title: 'Feature Requests', href: '/updates/requests' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1 text-sm text-primary-700 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2" />
            Knowledge Center
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Resources & Support
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to succeed with AtellierCRM. Browse our documentation, tutorials, and community resources.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2"
              size="sm"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Resource Categories Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {resourceCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-primary-600">
                  {category.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-primary-600 hover:text-primary-700 font-medium flex items-center group"
                    >
                      {link.title}
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Need Additional Help?
          </h2>
          <p className="text-gray-600 mb-8">
            Our support team is available 24/7 to help you succeed with AtellierCRM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              Contact Support
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto group"
            >
              Schedule a Demo
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 