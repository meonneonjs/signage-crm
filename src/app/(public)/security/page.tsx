'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Lock, Server, UserCheck, FileCheck, Bell } from 'lucide-react';

const securityFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Data Encryption',
    description: 'All data is encrypted at rest and in transit using industry-standard AES-256 encryption.',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Access Control',
    description: 'Role-based access control (RBAC) ensures users only access what they need.',
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Secure Infrastructure',
    description: 'Hosted on AWS with multiple layers of security and redundancy.',
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'Authentication',
    description: 'Multi-factor authentication and single sign-on (SSO) support.',
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: 'Compliance',
    description: 'SOC 2 Type II certified with regular security audits.',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Monitoring',
    description: '24/7 security monitoring and incident response team.',
  },
];

export default function SecurityPage() {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1 text-sm text-primary-700 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2" />
            Enterprise-Grade Security
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Data Security is Our Priority
          </h1>
          <p className="text-xl text-gray-600">
            AtellierCRM employs industry-leading security measures to ensure your business data remains safe and protected.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-primary-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 mb-24">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Security Certifications & Compliance
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Certifications</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• SOC 2 Type II Certified</li>
                <li>• ISO 27001 Certified</li>
                <li>• GDPR Compliant</li>
                <li>• CCPA Compliant</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Security Measures</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Regular Penetration Testing</li>
                <li>• Vulnerability Scanning</li>
                <li>• Security Awareness Training</li>
                <li>• Incident Response Plan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Secure Your Business?
          </h2>
          <p className="text-primary-100 mb-8">
            Join thousands of businesses who trust AtellierCRM with their sensitive data.
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
              Security Whitepaper
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 