'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Check, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for freelancers and solo creators',
    features: [
      'Up to 50 clients',
      'Basic project management',
      'Invoice generation',
      'Client portal',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '$79',
    description: 'Ideal for growing creative businesses',
    features: [
      'Up to 200 clients',
      'Advanced project management',
      'Custom invoicing',
      'Team collaboration',
      'Priority support',
      'Analytics dashboard',
      'Custom branding',
      'API access',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$199',
    description: 'For large creative agencies and studios',
    features: [
      'Unlimited clients',
      'Enterprise project management',
      'White-label solution',
      'Dedicated account manager',
      '24/7 phone support',
      'Advanced analytics',
      'Custom integrations',
      'SLA guarantee',
      'Training sessions',
    ],
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How does the 14-day trial work?',
    answer: 'You can try AtellierCRM free for 14 days with full access to all features. No credit card required. At the end of your trial, you can choose the plan that best fits your needs.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, the changes will take effect at the start of your next billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For Enterprise plans, we also offer invoice-based payment.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No, all our plans are month-to-month with no long-term commitment. You can cancel at any time and you won\'t be charged for the next month.',
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const getAnnualPrice = (monthlyPrice: string) => {
    const price = parseInt(monthlyPrice.replace('$', ''));
    return `$${Math.floor(price * 10)}`;
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
            Simple, Transparent Pricing
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose the Perfect Plan for Your Business
          </h1>
          <p className="text-xl text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="max-w-xs mx-auto mb-12">
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex justify-between">
            <button
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'annual'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl border ${
                tier.highlight
                  ? 'border-primary-200 shadow-lg'
                  : 'border-gray-100 shadow-sm'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {billingPeriod === 'monthly' ? tier.price : getAnnualPrice(tier.price)}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <Button
                  className={`w-full mb-8 ${
                    tier.highlight
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-white border-2 border-primary-200 text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Compare Features
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 text-left text-gray-600 font-medium">Feature</th>
                  <th className="py-4 px-6 text-center text-gray-600 font-medium">Starter</th>
                  <th className="py-4 px-6 text-center text-gray-600 font-medium">Professional</th>
                  <th className="py-4 px-6 text-center text-gray-600 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Clients', starter: '50', pro: '200', enterprise: 'Unlimited' },
                  { name: 'Projects', starter: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { name: 'Team Members', starter: '1', pro: '10', enterprise: 'Unlimited' },
                  { name: 'Storage', starter: '5GB', pro: '50GB', enterprise: '500GB' },
                  { name: 'API Access', starter: '❌', pro: '✅', enterprise: '✅' },
                  { name: 'White Label', starter: '❌', pro: '❌', enterprise: '✅' }
                ].map((feature) => (
                  <tr key={feature.name} className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-900">{feature.name}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{feature.starter}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{feature.pro}</td>
                    <td className="py-4 px-6 text-center text-gray-600">{feature.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                  onClick={() => setExpandedFaq(expandedFaq === faq.question ? null : faq.question)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <HelpCircle className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedFaq === faq.question ? 'rotate-180' : ''
                  }`} />
                </button>
                {expandedFaq === faq.question && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
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
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 