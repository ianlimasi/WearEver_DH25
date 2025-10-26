'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import AIOutfitMatcher from '@/components/AIOutfitMatcher';
import ClothingGrid from '@/components/ClothingGrid';
import { sampleClothingItems } from '@/lib/sampleData';
import { getUserUploadedItems } from '@/lib/storage';
import { AIMatchedTags, ClothingItem } from '@/lib/types';

import { supabase } from "../supabaseClient"

export default function Home() {
  const [posts, setPosts] = useState<ClothingItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  
  // Fetch posts on mount
  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchClothingItems();
      setPosts(items);
    };
    fetchData();
  }, []);

  const [matchedTags, setMatchedTags] = useState<AIMatchedTags | null>(null);
  const [userItems, setUserItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    setUserItems(getUserUploadedItems());
  }, []);

  // const allItems = useMemo(() => {
  //   return [...userItems, ...sampleClothingItems];
  // }, [userItems]);

  const filteredItems = useMemo(() => {
    if (!matchedTags) {
      return posts;
    }

    return posts.filter((item) => {
      const categoryMatch = item.category === matchedTags.category;
      const colorMatch = item.color.includes(matchedTags.color);
      const styleMatch = item.style.includes(matchedTags.style);
      const fitMatch = item.fit.includes(matchedTags.fit);
      const vibeMatch = item.vibe.includes(matchedTags.vibe);

      const additionalMatchCount = [colorMatch, styleMatch, fitMatch, vibeMatch].filter(Boolean).length;
      
      return categoryMatch && additionalMatchCount >= 1;
    });
  }, [matchedTags, posts]);

  const handleTagsMatched = (tags: AIMatchedTags) => {
    setMatchedTags(tags);
  };

  const handleReset = () => {
    setMatchedTags(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AIOutfitMatcher 
              onTagsMatched={handleTagsMatched} 
              onReset={handleReset}
            />
          </div>
          
          <div className="lg:col-span-2">
            <ClothingGrid items={filteredItems} />
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper function to fetch all clothing items
async function fetchClothingItems(): Promise<ClothingItem[]> {
  const { data, error } = await supabase
    .from("ClothingItems")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }

  return data as ClothingItem[];
}