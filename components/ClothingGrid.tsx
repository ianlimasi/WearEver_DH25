'use client';

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';
import { ClothingItem, Trade } from '@/lib/types';
import { User, Tag, ArrowLeftRight } from 'lucide-react';
import { createTrade } from '@/lib/tradeStorage';

import { supabase } from "../supabaseClient"

interface ClothingGridProps {
  items: ClothingItem[];
}

export default function ClothingGrid({ items }: ClothingGridProps) {
  const router = useRouter();

  const handleRequestTrade = async (item: ClothingItem) => {
    if (item.owner === 'You') {
      alert('You cannot request a trade for your own item!');
      return;
    }
    
    console.log('Starting trade request for item:', item);
    
    try {
      // Create a new outgoing trade (from your perspective)
      const outgoingTrade: Trade = {
        id: Date.now().toString(),
        requestedItemId: item.id.toString(),
        requestedItem: item,
        offeredItemId: null,
        offeredItem: null,
        requesterName: 'You',
        ownerName: item.owner,
        meetingPlace: null,
        meetingTime: null,
        status: 'in progress',
        isIncoming: false,
        createdAt: Date.now()
      };
      
      console.log('Creating outgoing trade:', outgoingTrade);
      
      // Create the outgoing trade
      const outgoingSuccess = await createTrade(outgoingTrade);
      console.log('Outgoing trade created:', outgoingSuccess);
      
      if (!outgoingSuccess) {
        alert('Failed to create outgoing trade. Check console for errors.');
        return;
      }
      
      console.log('Outgoing trade created successfully! Navigating to inbox...');
      
      // Navigate to inbox
      router.push(`/inbox/`);
    } catch (error) {
      console.error('Error creating trade:', error);
      alert('Failed to create trade request. Please try again.');
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-fairytale-pink/30">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        <Tag className="w-6 h-6" />
        Available Clothes
        <span className="text-sm font-normal text-gray-500">
          ({items.length} items)
        </span>
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No matching items found</p>
          <p className="text-gray-400 text-sm mt-2">Try uploading a different image</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {items.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden border-2 border-fairytale-lavender/40 hover:border-purple-400 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600 shadow-lg">
                  {item.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.name}</h3>
                
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{item.owner}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  <span 
                      key={item.color}
                      className="px-2 py-1 bg-fairytale-pink rounded-full text-xs text-purple-700"
                    >
                      {item.color}
                  </span>
                  <span 
                      key={item.style}
                      className="px-2 py-1 bg-fairytale-lavender rounded-full text-xs text-purple-700"
                    >
                      {item.style}
                  </span>
                  <span 
                      key={item.fit}
                      className="px-2 py-1 bg-fairytale-pink rounded-full text-xs text-purple-700"
                    >
                      {item.fit}
                  </span>
                  <span 
                      key={item.vibe}
                      className="px-2 py-1 bg-fairytale-mint rounded-full text-xs text-purple-700"
                    >
                      {item.vibe}
                  </span>

                </div>

                {item.owner !== 'You' && (
                  <button
                    onClick={() => handleRequestTrade(item)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    Request Trade
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}