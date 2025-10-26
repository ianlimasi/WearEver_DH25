'use client';

import { useState } from 'react';
import { Upload, Sparkles, X } from 'lucide-react';
import { AIMatchedTags } from '@/lib/types';

interface AIOutfitMatcherProps {
  onTagsMatched: (tags: AIMatchedTags) => void;
  onReset: () => void;
}

export default function AIOutfitMatcher({ onTagsMatched, onReset }: AIOutfitMatcherProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedTags, setMatchedTags] = useState<AIMatchedTags | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockTags: AIMatchedTags = {
        category: 'dress',
        color: 'pink',
        style: 'cottagecore',
        fit: 'flowy',
        vibe: 'casual'
      };
      
      setMatchedTags(mockTags);
      setIsAnalyzing(false);
      onTagsMatched(mockTags);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setMatchedTags(null);
    onReset();
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-fairytale-lavender/30">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-purple-500" />
        <h2 className="text-2xl font-bold text-purple-700">AI Outfit Matcher</h2>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">
        Upload an image of your dream outfit or aesthetic, and our AI will find matching clothes!
      </p>

      {!selectedImage ? (
        <label className="block cursor-pointer">
          <div className="border-4 border-dashed border-fairytale-lavender rounded-xl p-8 text-center hover:border-purple-400 hover:bg-fairytale-pink/20 transition-all">
            <Upload className="w-12 h-12 mx-auto mb-3 text-purple-400" />
            <p className="text-purple-600 font-semibold">Click to upload image</p>
            <p className="text-gray-500 text-xs mt-1">PNG, JPG up to 10MB</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={selectedImage} 
              alt="Uploaded outfit" 
              className="w-full h-64 object-cover rounded-xl border-4 border-fairytale-lavender"
            />
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!matchedTags ? (
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Analyzing magic...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Find Matching Clothes
                </span>
              )}
            </button>
          ) : (
            <div className="bg-gradient-to-r from-fairytale-mint to-fairytale-sky p-4 rounded-xl border-2 border-purple-300">
              <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Matched Tags:
              </h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-purple-600 shadow">
                    {matchedTags.category}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-pink-600 shadow">
                    {matchedTags.color}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-indigo-600 shadow">
                    {matchedTags.style}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-purple-600 shadow">
                    {matchedTags.fit}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-pink-600 shadow">
                    {matchedTags.vibe}
                  </span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 w-full bg-white/80 hover:bg-white text-purple-600 py-2 rounded-lg font-semibold transition-all"
              >
                Try Another Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
