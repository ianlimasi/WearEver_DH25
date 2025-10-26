'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Plus, Trash2 } from 'lucide-react';
import { ClothingItem } from '@/lib/types';
import Header from '@/components/Header';

import { supabase } from "../../supabaseClient";

// Helper function to fetch all clothing items
async function fetchClothingItems(): Promise<ClothingItem[]> {
  const { data, error } = await supabase
    .from("ClothingItems")
    .select("*")
    .eq("owner", "You")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }

  return data as ClothingItem[];
}

export default function ClosetPage() {
  const [posts, setPosts] = useState<ClothingItem[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const router = useRouter();
  
  // Fetch posts on mount
  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchClothingItems();
      setPosts(items);
    };
    fetchData();
  }, []);

  const handleDelete = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(itemId);

      // Delete from Supabase
      const { error } = await supabase
        .from('ClothingItems')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
        return;
      }

      // Update local state to remove the deleted item
      setPosts(prevPosts => prevPosts.filter(item => item.id !== itemId));
      
      // Optional: Show success message
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred while deleting the item.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-4 border-fairytale-pink/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl font-bold text-purple-700">My Closet</h1>
              <span className="text-lg text-gray-500">
                ({posts.length} {posts.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            
            <button
              onClick={() => router.push('/upload')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </button>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-purple-300" />
              <h2 className="text-2xl font-bold text-gray-700 mb-3">Your closet is empty</h2>
              <p className="text-gray-500 mb-6">
                Start sharing your clothes with the community!
              </p>
              <button
                onClick={() => router.push('/upload')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
              >
                Upload Your First Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((item) => (
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
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting === item.id}
                      className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete item"
                    >
                      {isDeleting === item.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.name}</h3>

                    <div className="flex flex-wrap gap-1">
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}