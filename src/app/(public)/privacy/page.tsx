'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Section {
  id: string;
  title: string;
  content: string[];
}

const sections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: [
      'At AtellierCRM, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.',
      'Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.',
      'We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy.',
    ],
  },
  {
    id: 'information-collection',
    title: 'Information We Collect',
    content: [
      'We collect information that you provide directly to us when you:',
      '• Register for an account',
      '• Use our services',
      '• Contact our support team',
      '• Subscribe to our newsletter',
      'This information may include:',
      '• Name and contact information',
      '• Billing information',
      '• Company information',
      '• Usage data and preferences',
    ],
  },
  {
    id: 'information-usage',
    title: 'How We Use Your Information',
    content: [
      'We use the information we collect to:',
      '• Provide and maintain our services',
      '• Process your transactions',
      '• Send you technical notices and support messages',
      '• Communicate with you about products, services, and events',
      '• Monitor and analyze usage patterns',
      '• Prevent fraudulent transactions and monitor against theft',
      '• Improve our services and develop new features',
    ],
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing and Disclosure',
    content: [
      'We may share your information with:',
      '• Service providers who assist in our operations',
      '• Professional advisors (lawyers, accountants, etc.)',
      '• Law enforcement when required by law',
      'We will never sell your personal information to third parties.',
      'We may share anonymous, aggregated information about our users with third parties for industry analysis.',
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: [
      'We implement appropriate technical and organizational security measures to protect your information, including:',
      '• Encryption of data in transit and at rest',
      '• Regular security assessments',
      '• Access controls and authentication',
      '• Regular backup procedures',
      'However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: [
      'You have the right to:',
      '• Access your personal information',
      '• Correct inaccurate information',
      '• Request deletion of your information',
      '• Object to processing of your information',
      '• Receive a copy of your information',
      'To exercise these rights, please contact us using the information provided below.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    content: [
      'We use cookies and similar tracking technologies to:',
      '• Remember your preferences',
      '• Understand how you use our service',
      '• Improve our platform',
      '• Provide targeted advertising',
      'You can control cookies through your browser settings, but some features of our service may not function properly without cookies.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: [
      'If you have questions about this Privacy Policy, please contact us at:',
      'AtellierCRM',
      'privacy@ateliercrm.com',
      '123 Creative Street, Suite 100',
      'New York, NY 10001',
    ],
  },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1 text-sm text-primary-700 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2" />
            Last Updated: March 2024
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            We're committed to protecting your privacy and ensuring you understand how we handle your data.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-8 mb-12 last:mb-0"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, index) => (
                        <p key={index} className="text-gray-600">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Have Questions About Our Privacy Policy?
            </h2>
            <p className="text-gray-600 mb-8">
              Our team is here to help you understand how we protect your data.
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
                Read Terms of Service
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 