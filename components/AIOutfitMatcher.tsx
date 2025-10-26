'use client';

import { useState } from 'react';
import { Upload, Sparkles, X, AlertCircle } from 'lucide-react';
import { AIMatchedTags } from '@/lib/types';

interface AIOutfitMatcherProps {
  onTagsMatched: (tags: AIMatchedTags) => void;
  onReset: () => void;
}

// Your actual API Gateway endpoint
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'https://ucxsm64wu3.execute-api.us-east-1.amazonaws.com/dev';

export default function AIOutfitMatcher({ onTagsMatched, onReset }: AIOutfitMatcherProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [matchedTags, setMatchedTags] = useState<AIMatchedTags | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image must be smaller than 10MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      setError(null);
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToS3 = async (file: File): Promise<string> => {
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const fileExt = file.name.split('.').pop();
    const imageKey = `uploads/${timestamp}-${randomStr}.${fileExt}`;

    // Get presigned URL from your backend (you'll need to create this endpoint)
    const presignedResponse = await fetch('/api/get-presigned-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        fileName: imageKey,
        fileType: file.type 
      })
    });

    if (!presignedResponse.ok) {
      throw new Error('Failed to get upload URL');
    }

    const { uploadUrl } = await presignedResponse.json();

    // Upload to S3 using presigned URL
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload image');
    }

    return imageKey;
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Step 1: Upload image to S3
      setIsUploading(true);
      const imageKey = await uploadToS3(selectedFile);
      setIsUploading(false);

      // Step 2: Call Lambda via API Gateway to analyze
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_key: imageKey }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform the response to match your component's expected format
      const tags: AIMatchedTags = {
        category: data.tags.category,
        color: Array.isArray(data.tags.color) ? data.tags.color[0] : data.tags.color,
        style: Array.isArray(data.tags.style) ? data.tags.style[0] : data.tags.style,
        fit: Array.isArray(data.tags.fit) ? data.tags.fit[0] : data.tags.fit,
        vibe: Array.isArray(data.tags.vibe) ? data.tags.vibe[0] : data.tags.vibe,
      };

      setMatchedTags(tags);
      onTagsMatched(tags);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setMatchedTags(null);
    setError(null);
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

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

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
              disabled={isAnalyzing}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!matchedTags ? (
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Uploading image...
                </span>
              ) : isAnalyzing ? (
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