'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, ArrowUpRight, Star, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1 text-sm text-primary-700 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2" />
            Now with AI-powered insights
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-800">
            Streamline Your<br />Creative Business
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            The all-in-one CRM solution designed specifically for creative professionals and artisans.
            Manage your clients, projects, and business growth all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-lg px-8">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Schedule Demo
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="mt-16 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-700">10k+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-700">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-700">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
          <div className="mt-16">
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="absolute -inset-x-20 -top-[1rem] -bottom-[1rem] bg-white/50 backdrop-blur-xl rounded-[2rem] border border-gray-200/50"></div>
              <div className="relative">
                <Image
                  src="/dashboard-preview.svg"
                  alt="AtellierCRM Dashboard"
                  width={1200}
                  height={675}
                  className="rounded-xl shadow-2xl border border-gray-200/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Trusted by Creative Professionals Worldwide</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
            <Image src="/logos/logo1.svg" alt="Company Logo" width={120} height={40} className="h-8 object-contain" />
            <Image src="/logos/logo2.svg" alt="Company Logo" width={120} height={40} className="h-8 object-contain" />
            <Image src="/logos/logo3.svg" alt="Company Logo" width={120} height={40} className="h-8 object-contain" />
            <Image src="/logos/logo4.svg" alt="Company Logo" width={120} height={40} className="h-8 object-contain" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-900 to-primary-800 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Boost Your Creative Business
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Join thousands of creative professionals who trust AtellierCRM to manage their business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="secondary" size="lg" className="text-primary-900">
                Get started today
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Features Built for Creatives
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Everything you need to manage your creative business, from project management to invoicing.
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-x-8 gap-y-12">
            <FeatureCard
              title="Lead Management"
              description="Track and convert leads with our intuitive pipeline management system."
              icon="🎯"
            />
            <FeatureCard
              title="Project Tracking"
              description="Monitor project progress, timelines, and budgets in real-time."
              icon="📊"
            />
            <FeatureCard
              title="Installation Scheduling"
              description="Efficiently manage installation teams and schedules."
              icon="📅"
            />
            <FeatureCard
              title="Design Management"
              description="Store and manage design files, revisions, and approvals."
              icon="🎨"
            />
            <FeatureCard
              title="Client Portal"
              description="Give clients access to project status and communication tools."
              icon="👥"
            />
            <FeatureCard
              title="Reporting & Analytics"
              description="Make data-driven decisions with comprehensive reporting."
              icon="📈"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="AtellierCRM has transformed how we manage our design projects. The client portal is a game-changer."
              author="Sarah Johnson"
              role="Interior Designer"
              company="Design Studio Co."
              rating={5}
            />
            <TestimonialCard
              quote="The best CRM for creative professionals. It's like it was designed specifically for my business needs."
              author="Michael Chen"
              role="Creative Director"
              company="Artelier Studios"
              rating={5}
            />
            <TestimonialCard
              quote="Finally, a CRM that understands the creative workflow. Our team's productivity has increased significantly."
              author="Emma Davis"
              role="Studio Manager"
              company="Creative Works"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-lg text-gray-600">Connect with your favorite tools and services</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <IntegrationCard name="Slack" icon="/icons/slack.svg" />
            <IntegrationCard name="Adobe Creative Cloud" icon="/icons/adobe.svg" />
            <IntegrationCard name="Figma" icon="/icons/figma.svg" />
            <IntegrationCard name="Asana" icon="/icons/asana.svg" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PricingCard
              title="Starter"
              price="$49"
              period="per month"
              features={[
                "Up to 5 users",
                "Basic lead management",
                "Project tracking",
                "Email support",
                "Basic reporting"
              ]}
              cta="Start Free Trial"
              popular={false}
            />
            <PricingCard
              title="Professional"
              price="$99"
              period="per month"
              features={[
                "Up to 15 users",
                "Advanced lead management",
                "Project tracking",
                "Installation scheduling",
                "Design management",
                "Client portal",
                "Priority support",
                "Advanced reporting"
              ]}
              cta="Start Free Trial"
              popular={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              period="contact us"
              features={[
                "Unlimited users",
                "Custom integrations",
                "Dedicated support",
                "Custom reporting",
                "API access",
                "SLA guarantee",
                "Training sessions"
              ]}
              cta="Contact Sales"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about AtellierCRM</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 py-32">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:75px_75px]" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-primary-100 mb-12 max-w-3xl mx-auto">
            Join hundreds of creative professionals already using AtellierCRM to grow their business.
            Start your free trial today and experience the difference.
          </p>
          <div className="flex gap-6 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
              Schedule a Demo
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className="mt-8 text-primary-100">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary-100 to-primary-200 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="relative bg-white p-8 rounded-lg shadow-sm border border-gray-100 group-hover:border-transparent transition-all duration-300">
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function PricingCard({ 
  title, 
  price, 
  period, 
  features, 
  cta, 
  popular 
}: { 
  title: string; 
  price: string; 
  period: string; 
  features: string[]; 
  cta: string; 
  popular: boolean;
}) {
  return (
    <div className={`relative ${popular ? 'scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary-600 py-1 px-3 text-sm font-medium text-white text-center">
          Most Popular
        </div>
      )}
      <div className={`h-full bg-white rounded-2xl shadow-lg border-2 ${popular ? 'border-primary-500' : 'border-gray-100'} p-8 transition-all duration-300 hover:border-primary-500`}>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600 ml-2">/{period}</span>
        </div>
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button className={`w-full text-lg py-6 ${
          popular 
            ? 'bg-primary-600 hover:bg-primary-700 text-white' 
            : 'bg-primary-50 hover:bg-primary-100 text-primary-900'
        }`}>
          {cta}
        </Button>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role, company, rating }: {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-6">{quote}</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-600">{role}</p>
        <p className="text-gray-500 text-sm">{company}</p>
      </div>
    </div>
  );
}

function IntegrationCard({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 hover:border-primary-200 hover:shadow-md">
      <Image src={icon} alt={name} width={48} height={48} className="mb-4" />
      <p className="text-gray-900 font-medium">{name}</p>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the 14-day free trial work?",
      answer: "You can start using AtellierCRM completely free for 14 days. No credit card is required to start. You'll have access to all features in the Professional plan during the trial period."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll get immediate access to the new features. If you downgrade, the changes will take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a limit to the number of clients I can manage?",
      answer: "No, there's no limit to the number of clients you can manage in AtellierCRM. All plans include unlimited client management capabilities."
    },
    {
      question: "Do you offer custom features for enterprise clients?",
      answer: "Yes, our Enterprise plan includes custom feature development and integrations. Contact our sales team to discuss your specific requirements."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg">
          <button
            className="w-full px-6 py-4 flex justify-between items-center text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 