import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/posts">Posts</Link></li>
      </ul>
    </nav>
  );
}
