'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, BarChart3, Users, Calendar, FileText, Settings, MessageSquare, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const features: Feature[] = [
  {
    id: 'client-management',
    title: 'Client Management',
    description: 'Streamline your client relationships with our powerful CRM tools.',
    icon: <Users className="w-6 h-6" />,
    benefits: [
      'Centralized client database',
      'Contact history tracking',
      'Document management',
      'Client portal access',
      'Custom fields and tags'
    ]
  },
  {
    id: 'project-tracking',
    title: 'Project Tracking',
    description: 'Keep your projects on track with comprehensive project management tools.',
    icon: <Calendar className="w-6 h-6" />,
    benefits: [
      'Gantt charts and timelines',
      'Task dependencies',
      'Resource allocation',
      'Progress tracking',
      'Milestone management'
    ]
  },
  {
    id: 'financial-tools',
    title: 'Financial Tools',
    description: 'Manage your finances with ease using our integrated financial suite.',
    icon: <BarChart3 className="w-6 h-6" />,
    benefits: [
      'Invoice generation',
      'Payment tracking',
      'Expense management',
      'Financial reporting',
      'Budget planning'
    ]
  },
  {
    id: 'document-management',
    title: 'Document Management',
    description: 'Keep all your important documents organized and accessible.',
    icon: <FileText className="w-6 h-6" />,
    benefits: [
      'Document versioning',
      'Secure storage',
      'Quick search',
      'Sharing controls',
      'Template library'
    ]
  },
  {
    id: 'communication',
    title: 'Communication Tools',
    description: 'Stay connected with your team and clients through integrated communication.',
    icon: <MessageSquare className="w-6 h-6" />,
    benefits: [
      'In-app messaging',
      'Email integration',
      'Client notifications',
      'Team chat',
      'Video conferencing'
    ]
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks and streamline your workflows.',
    icon: <Zap className="w-6 h-6" />,
    benefits: [
      'Custom workflows',
      'Automated notifications',
      'Task scheduling',
      'Integration capabilities',
      'Trigger-based actions'
    ]
  }
];

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<string>(features[0].id);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1 text-sm text-primary-700 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2" />
            Powerful Features
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Succeed
          </h1>
          <p className="text-xl text-gray-600">
            Discover the tools and features that will help your business grow and thrive in today's competitive landscape.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`p-6 rounded-xl border transition-all cursor-pointer ${
                  selectedFeature === feature.id
                    ? 'bg-primary-50 border-primary-200'
                    : 'bg-white border-gray-100 hover:border-primary-100 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedFeature(feature.id)}
                onMouseEnter={() => setIsHovered(feature.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all ${
                    selectedFeature === feature.id ? 'bg-primary-100' : 'bg-gray-50'
                  }`}>
                    <div className={`text-primary-600 transition-transform ${
                      isHovered === feature.id ? 'scale-110' : 'scale-100'
                    }`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`space-y-6 transition-all ${
                  selectedFeature === feature.id ? 'block' : 'hidden'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                    <div className="text-primary-600">{feature.icon}</div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{feature.title}</h2>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {feature.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full group">
                  Learn More About {feature.title}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Seamless Integrations
          </h2>
          <p className="text-gray-600 mb-12">
            Connect with your favorite tools and services to create a powerful workflow that works for your business.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Slack', 'Google', 'Zoom', 'Dropbox'].map((integration) => (
              <div
                key={integration}
                className="aspect-square bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center p-6 hover:shadow-md transition-shadow"
              >
                <span className="text-xl font-semibold text-gray-900">{integration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-primary-100 mb-8">
            Join thousands of businesses already using AtellierCRM to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary-600"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 