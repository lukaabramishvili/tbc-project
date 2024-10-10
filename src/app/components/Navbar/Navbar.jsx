import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/blog">Blog</Link></li>
      </ul>
    </nav>
  );
}
