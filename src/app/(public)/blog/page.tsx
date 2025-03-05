'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
}

const featuredPosts: BlogPost[] = [
  {
    slug: 'crm-best-practices-2024',
    title: 'CRM Best Practices for Creative Agencies in 2024',
    excerpt: 'Learn how leading creative agencies are leveraging CRM to streamline their operations and improve client relationships.',
    image: '/blog/crm-best-practices.jpg',
    author: {
      name: 'Sarah Johnson',
      avatar: '/team/sarah.jpg',
    },
    date: 'Mar 1, 2024',
    readTime: '8 min read',
    category: 'Best Practices',
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation in the Creative Industry',
    excerpt: 'Discover how digital transformation is reshaping the creative industry and what it means for your business.',
    image: '/blog/digital-transformation.jpg',
    author: {
      name: 'Michael Chen',
      avatar: '/team/michael.jpg',
    },
    date: 'Feb 28, 2024',
    readTime: '6 min read',
    category: 'Industry Trends',
  },
  {
    slug: 'client-management',
    title: 'The Art of Client Management',
    excerpt: 'Master the art of client management with these proven strategies and tips from industry experts.',
    image: '/blog/client-management.jpg',
    author: {
      name: 'Emma Rodriguez',
      avatar: '/team/emma.jpg',
    },
    date: 'Feb 25, 2024',
    readTime: '5 min read',
    category: 'Client Relations',
  },
];

const categories = [
  'All',
  'Best Practices',
  'Industry Trends',
  'Client Relations',
  'Product Updates',
  'Case Studies',
  'Tips & Tricks',
];

export default function BlogPage() {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1 text-sm text-primary-700 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2" />
            Latest Updates
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AtellierCRM Blog
          </h1>
          <p className="text-xl text-gray-600">
            Insights, tips, and news from the world of creative business management.
          </p>
        </div>

        {/* Categories */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className={category === 'All' ? 'bg-primary-50 text-primary-700 border-primary-200' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-primary-600 font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="text-sm">
                        <p className="text-gray-900 font-medium">{post.author.name}</p>
                        <p className="text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary-600 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Stay Updated
          </h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter for the latest insights and updates.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
              />
              <Button
                variant="secondary"
                size="lg"
                className="whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 