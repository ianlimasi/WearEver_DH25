'use client';

import { Upload, Inbox, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { ClothingItem } from '@/lib/types';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-fairytale-pink via-fairytale-lavender to-fairytale-mint p-4 shadow-lg border-b-4 border-white/50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform">
            ✨ WearEver
          </h1>
        </Link>
        
        <div className="flex gap-4">
          <Link href="/">
            <button 
              className="p-3 bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110 hover:shadow-xl"
              title="Home"
            >
              <Home className="w-6 h-6 text-purple-600" />
            </button>
          </Link>
          
          <Link href="/upload">
            <button 
              className="p-3 bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110 hover:shadow-xl"
              title="Upload clothing item"
            >
              <Upload className="w-6 h-6 text-purple-600" />
            </button>
          </Link>
          
          <Link href="/closet">
            <button 
              className="p-3 bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110 hover:shadow-xl"
              title="My Closet"
            >
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </button>
          </Link>
          
          <Link href="/inbox">
            <button 
              className="p-3 bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110 hover:shadow-xl"
              title="Trade Inbox"
            >
              <Inbox className="w-6 h-6 text-purple-600" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
