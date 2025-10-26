'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Category, Color, Style, Fit, Vibe, ClothingItem } from '@/lib/types';
import { categoryOptions, colorOptions, styleOptions, fitOptions, vibeOptions } from '@/lib/tagOptions';
import { saveUserUploadedItem } from '@/lib/storage';
import Header from '@/components/Header';

import { supabase } from "../../supabaseClient";

export default function UploadPage() {

  const router = useRouter();
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();

  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [selectedColor, setSelectedColor] = useState<Color | ''>('');
  const [selectedStyle, setSelectedStyle] = useState<Style | ''>('');
  const [selectedFit, setSelectedFit] = useState<Fit | ''>('');
  const [selectedVibe, setSelectedVibe] = useState<Vibe | ''>('');
  const [isUploading, setIsUploading] = useState(false);

  // File input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);

    if (selectedFile){
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setSelectedImage(event.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

    // Upload image and insert metadata
    const handleUpload = async (e: React.FormEvent) => {
      
      e.preventDefault();
      

      if (!file) {
        alert("Please select an image first!");
        return;
      }
  
      // Upload to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file);
  
      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        // alert("Image upload failed!");
        return;
      }
  
      // Get public URL
      const { data: publicData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);
  
      const imageUrl = publicData.publicUrl;
  
      // Insert row into Clothing table
      const { error: insertError } = await supabase.from("ClothingItems").insert([
        {
          name: itemName,
          owner: "You",
          category: selectedCategory,
          color: selectedColor,
          style: selectedStyle,
          fit: selectedFit,
          vibe: selectedVibe,
          imageUrl: imageUrl,
        },
      ]);
  
      if (insertError) {
        console.error("Insert error:", insertError);
        alert("Database insert failed!");
        return;
      }

      alert("Succesfully Uploaded Your Clothing Item!")
  
      // Refresh posts
      // const newPosts = await fetchClothingItems();
      // setPosts(newPosts);
      // setFile(null);
    };

  const isFormValid = () => {
    return (
      file &&
      itemName.trim() &&
      selectedCategory &&
      selectedColor &&
      selectedStyle &&
      selectedFit &&
      selectedVibe
    );
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!isFormValid()) {
  //     alert('Please fill in all fields and upload an image');
  //     return;
  //   }

  //   setIsUploading(true);

  //   const newItem: ClothingItem = {
  //     id: `user-${Date.now()}`,
  //     name: itemName,
  //     imageUrl: selectedImage!,
  //     owner: 'You',
  //     tags: {
  //       category: selectedCategory as Category,
  //       color: [selectedColor as Color],
  //       style: [selectedStyle as Style],
  //       fit: [selectedFit as Fit],
  //       vibe: [selectedVibe as Vibe]
  //     }
  //   };

  //   saveUserUploadedItem(newItem);

  //   setTimeout(() => {
  //     setIsUploading(false);
  //     router.push('/closet');
  //   }, 1000);
  // };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-4 border-fairytale-lavender/30">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-purple-700">Upload Your Clothing Item</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Share your clothes with the community! Upload an image and tag your item to help others find it.
          </p>

          <form onSubmit={(e) => handleUpload(e)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g., Vintage Floral Dress"
                className="w-full px-4 py-3 rounded-xl border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-purple-700 mb-2">
                Upload Image *
              </label>
              {!file ? (
                <label className="block cursor-pointer">
                  <div className="border-4 border-dashed border-fairytale-lavender rounded-xl p-12 text-center hover:border-purple-400 hover:bg-fairytale-pink/20 transition-all">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                    <p className="text-purple-600 font-semibold text-lg">Click to upload image</p>
                    <p className="text-gray-500 text-sm mt-2">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              ) : (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-96 object-cover rounded-xl border-4 border-fairytale-lavender"
                  />
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg font-semibold"
                  >
                    Change Image
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-purple-700 mb-2">
                  Category *
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none transition-colors capitalize"
                  required
                >
                  <option value="">Select category...</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-700 mb-2">
                  Color *
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value as Color)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none transition-colors capitalize"
                  required
                >
                  <option value="">Select color...</option>
                  {colorOptions.map((color) => (
                    <option key={color} value={color} className="capitalize">
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-700 mb-2">
                  Style *
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value as Style)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none transition-colors capitalize"
                  required
                >
                  <option value="">Select style...</option>
                  {styleOptions.map((style) => (
                    <option key={style} value={style} className="capitalize">
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-700 mb-2">
                  Fit *
                </label>
                <select
                  value={selectedFit}
                  onChange={(e) => setSelectedFit(e.target.value as Fit)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none transition-colors capitalize"
                  required
                >
                  <option value="">Select fit...</option>
                  {fitOptions.map((fit) => (
                    <option key={fit} value={fit} className="capitalize">
                      {fit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-purple-700 mb-2">
                  Vibe *
                </label>
                <select
                  value={selectedVibe}
                  onChange={(e) => setSelectedVibe(e.target.value as Vibe)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none transition-colors capitalize"
                  required
                >
                  <option value="">Select vibe...</option>
                  {vibeOptions.map((vibe) => (
                    <option key={vibe} value={vibe} className="capitalize">
                      {vibe}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid() || isUploading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Item
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
