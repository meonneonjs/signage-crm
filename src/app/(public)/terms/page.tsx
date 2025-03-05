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
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: [
      'By accessing and using AtellierCRM ("the Service"), you accept and agree to be bound by the terms and conditions of this agreement.',
      'If you do not agree to these terms, you must not access or use the Service.',
      'We may modify these terms at any time. Your continued use of the Service following any changes indicates your acceptance of the new terms.',
    ],
  },
  {
    id: 'account',
    title: 'Account Registration',
    content: [
      'To use the Service, you must:',
      '• Be at least 18 years old',
      '• Register for an account',
      '• Provide accurate and complete information',
      '• Maintain the security of your account',
      'You are responsible for all activities that occur under your account.',
      'We reserve the right to suspend or terminate accounts that violate these terms.',
    ],
  },
  {
    id: 'subscription',
    title: 'Subscription and Payments',
    content: [
      'The Service is provided on a subscription basis with the following terms:',
      '• Subscription fees are billed in advance',
      '• Payments are non-refundable',
      '• You may cancel your subscription at any time',
      '• Price changes will be notified in advance',
      'We reserve the right to change subscription fees upon notice. Your continued use of the Service after a fee change becomes effective constitutes your agreement to pay the modified fee amount.',
    ],
  },
  {
    id: 'usage',
    title: 'Acceptable Use',
    content: [
      'You agree not to:',
      '• Use the Service for any illegal purpose',
      '• Violate any laws in your jurisdiction',
      '• Infringe on intellectual property rights',
      '• Transmit harmful code or content',
      '• Attempt to gain unauthorized access',
      '• Interfere with the proper working of the Service',
      'We reserve the right to investigate and take appropriate action against violations.',
    ],
  },
  {
    id: 'data',
    title: 'Data and Privacy',
    content: [
      'Your use of the Service is also governed by our Privacy Policy.',
      'You retain all rights to your data. By using the Service, you grant us a license to:',
      '• Store and backup your data',
      '• Display your data within the Service',
      '• Modify your data as needed to provide the Service',
      'We will maintain appropriate security measures to protect your data.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: [
      'The Service and its original content are and will remain the exclusive property of AtellierCRM and its licensors.',
      'The Service is protected by copyright, trademark, and other laws.',
      'Our trademarks and trade dress may not be used without our prior written permission.',
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    content: [
      'We may terminate or suspend your account and access to the Service:',
      '• For violations of these terms',
      '• At our sole discretion',
      '• Without prior notice or liability',
      'Upon termination:',
      '• Your right to use the Service will immediately cease',
      '• You may request a copy of your data within 30 days',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content: [
      'To the maximum extent permitted by law:',
      '• The Service is provided "as is" without warranties',
      '• We are not liable for any indirect damages',
      '• Our liability is limited to the amount paid for the Service',
      'Some jurisdictions do not allow limitations on implied warranties or limitations of liability, so some of the above limitations may not apply to you.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: [
      'These terms shall be governed by the laws of the State of New York.',
      'Any disputes shall be resolved in the courts of New York County, New York.',
      'You agree to submit to the personal jurisdiction of these courts.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Information',
    content: [
      'For any questions about these Terms of Service, please contact us at:',
      'AtellierCRM',
      'legal@ateliercrm.com',
      '123 Creative Street, Suite 100',
      'New York, NY 10001',
    ],
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('acceptance');

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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using our service.
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
              Have Questions About Our Terms?
            </h2>
            <p className="text-gray-600 mb-8">
              Our legal team is here to help you understand our terms of service.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Contact Legal Team
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group"
              >
                Read Privacy Policy
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 