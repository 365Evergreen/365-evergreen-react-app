import { useEffect, useState } from 'react';
import { Spinner, Button } from '@fluentui/react-components';
import '../LatestPosts.css';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  date: string;
}

const placeholderPosts: Post[] = [
  {
    id: '1',
    title: '10 Tips for Sustainable Living',
    excerpt: 'Discover practical ways to reduce your carbon footprint and live more sustainably every day.',
    url: '#',
    date: '2026-01-01',
  },
  {
    id: '2',
    title: 'How to Start a Community Garden',
    excerpt: 'A step-by-step guide to building a thriving community garden in your neighborhood.',
    url: '#',
    date: '2026-01-03',
  },
  {
    id: '3',
    title: 'Eco-Friendly Home Upgrades',
    excerpt: 'Upgrade your home with these affordable and effective eco-friendly improvements.',
    url: '#',
    date: '2026-01-05',
  },
  {
    id: '4',
    title: 'Zero Waste Lifestyle: Getting Started',
    excerpt: 'Learn how to minimize waste and embrace a zero-waste lifestyle with these simple tips.',
    url: '#',
    date: '2026-01-06',
  },
  {
    id: '5',
    title: 'The Benefits of Plant-Based Eating',
    excerpt: 'Explore the health and environmental benefits of a plant-based diet.',
    url: '#',
    date: '2026-01-07',
  },
  {
    id: '6',
    title: 'Renewable Energy at Home',
    excerpt: 'How to get started with solar, wind, and other renewable energy sources for your home.',
    url: '#',
    date: '2026-01-08',
  },
];

export function LatestPosts() {
  // For placeholder/demo, skip loading and error states
  const posts = placeholderPosts;

  return (
    <section className="latest-posts-root">
      <div className="latest-posts-container">
        <h2 className="latest-posts-title">Latest Posts</h2>
        <div className="latest-posts-list">
          {posts.map((post) => (
            <div key={post.id} className="latest-posts-card">
              <div className="latest-posts-date">{new Date(post.date).toLocaleDateString()}</div>
              <a href={post.url} className="latest-posts-title-link">{post.title}</a>
              <p className="latest-posts-excerpt">{post.excerpt}</p>
              <Button as="a" href={post.url} className="latest-posts-readmore" appearance="secondary" size="small">Read more</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
