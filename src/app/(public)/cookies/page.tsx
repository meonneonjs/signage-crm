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
      'This Cookie Policy explains how AtellierCRM ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and use our services.',
      'It explains what these technologies are and why we use them, as well as your rights to control our use of them.',
    ],
  },
  {
    id: 'what-are-cookies',
    title: 'What Are Cookies',
    content: [
      'Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or work more efficiently, as well as to provide reporting information.',
      'Cookies set by the website owner (in this case, AtellierCRM) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies".',
      'Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).',
    ],
  },
  {
    id: 'why-we-use-cookies',
    title: 'Why We Use Cookies',
    content: [
      'We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate. We refer to these as "essential" or "strictly necessary" cookies.',
      'Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for analytics, personalization, and advertising purposes.',
      'The specific types of cookies served through our website and the purposes they perform are described below.',
    ],
  },
  {
    id: 'types-of-cookies',
    title: 'Types of Cookies We Use',
    content: [
      'Essential Cookies:',
      '• Authentication and security',
      '• Session management',
      '• Load balancing',
      'Performance Cookies:',
      '• Analytics and statistics',
      '• Error monitoring',
      '• Performance optimization',
      'Functionality Cookies:',
      '• User preferences',
      '• Language settings',
      '• Regional settings',
      'Targeting Cookies:',
      '• Advertising',
      '• Marketing campaigns',
      '• Social media integration',
    ],
  },
  {
    id: 'cookie-management',
    title: 'How to Manage Cookies',
    content: [
      "You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.",
      "The means by which you can refuse cookies through your web browser controls vary from browser to browser. You should visit your browser's help menu for more information.",
      'Additionally, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:',
      '• http://www.aboutads.info/choices/',
      '• http://www.youronlinechoices.com',
    ],
  },
  {
    id: 'updates',
    title: 'Updates to This Policy',
    content: [
      'We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.',
      'Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.',
      'The date at the top of this Cookie Policy indicates when it was last updated.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: [
      'If you have any questions about our use of cookies or other technologies, please contact us at:',
      'AtellierCRM',
      'privacy@ateliercrm.com',
      '123 Creative Street, Suite 100',
      'New York, NY 10001',
    ],
  },
];

export default function CookiesPage() {
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
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600">
            Learn about how we use cookies and similar technologies.
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

        {/* Cookie Preferences */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Cookie Preferences
              </h2>
              <p className="text-gray-600">
                You can customize your cookie preferences at any time.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Essential Cookies</h3>
                <p className="text-sm text-gray-600">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                    checked
                    disabled
                  />
                  <label className="ml-2 text-sm text-gray-600">Always Active</label>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Analytics Cookies</h3>
                <p className="text-sm text-gray-600">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label className="ml-2 text-sm text-gray-600">Active</label>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Functionality Cookies</h3>
                <p className="text-sm text-gray-600">
                  These cookies enable personalized features and functionality.
                </p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label className="ml-2 text-sm text-gray-600">Active</label>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Marketing Cookies</h3>
                <p className="text-sm text-gray-600">
                  These cookies are used to track visitors across websites for marketing purposes.
                </p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label className="ml-2 text-sm text-gray-600">Active</label>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Save Preferences
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 