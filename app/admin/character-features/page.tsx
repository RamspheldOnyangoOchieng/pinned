'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';

interface CategoryData {
  name: string;
  images: number;
}

interface ImageData {
  id: string;
  image_url: string;
  created_at: string;
}

interface ValueData {
  value: string;
  realistic: ImageData | null;
  anime: ImageData | null;
}

export default function CharacterFeaturesAdmin() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [values, setValues] = useState<ValueData[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  // Load values when category changes
  useEffect(() => {
    if (selectedCategory) {
      loadValues(selectedCategory);
    }
  }, [selectedCategory]);

  async function loadCategories() {
    try {
      setLoading(true);
      const res = await fetch('/api/character-features?action=categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setMessage({ type: 'error', text: 'Failed to load categories' });
    } finally {
      setLoading(false);
    }
  }

  async function loadValues(category: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/character-features?action=values&category=${encodeURIComponent(category)}`);
      const data = await res.json();
      if (data.success) {
        setValues(data.values || []);
      }
    } catch (error) {
      console.error('Error loading values:', error);
      setMessage({ type: 'error', text: 'Failed to load values' });
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(imageId: string, category: string, value: string, style: string) {
    if (!confirm(`Delete ${value} (${style}) image?`)) return;

    try {
      setDeleting(imageId);
      const res = await fetch('/api/character-features', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId, category, value, style }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: `Deleted ${value} (${style}) image` });
        if (selectedCategory) {
          loadValues(selectedCategory);
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete image' });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage({ type: 'error', text: 'Failed to delete image' });
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎨 Character Features</h1>
          <p className="text-gray-400">Manage character attribute images and features</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-green-500/20 border border-green-500/50 text-green-100'
                : 'bg-red-500/20 border border-red-500/50 text-red-100'
            }`}
          >
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4">Categories</h2>

              {loading && !selectedCategory ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              ) : (
                <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === cat.name
                          ? 'bg-primary text-white'
                          : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      <div className="font-medium">{cat.name}</div>
                      <div className="text-xs opacity-75">{cat.images} images</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedCategory ? (
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedCategory}</h2>
                  <button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-all">
                    <Plus className="w-4 h-4" />
                    Add Value
                  </button>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : values.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p>No values found for this category</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {values.map((val) => (
                      <div key={val.value} className="border border-slate-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{val.value}</h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Realistic */}
                          <div className="bg-slate-900/50 rounded-lg p-3">
                            <div className="text-sm text-gray-400 mb-2">Realistic</div>
                            {val.realistic ? (
                              <div className="space-y-2">
                                <div className="relative w-full aspect-[3/4] bg-slate-800 rounded overflow-hidden">
                                  <Image
                                    src={val.realistic.image_url}
                                    alt={`${val.value} realistic`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {new Date(val.realistic.created_at).toLocaleDateString()}
                                  </span>
                                  <button
                                    onClick={() =>
                                      deleteImage(val.realistic!.id, selectedCategory, val.value, 'realistic')
                                    }
                                    disabled={deleting === val.realistic.id}
                                    className="text-red-500 hover:text-red-400 disabled:opacity-50"
                                  >
                                    {deleting === val.realistic.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full aspect-[3/4] bg-slate-900 rounded flex items-center justify-center text-gray-600 text-sm">
                                No image
                              </div>
                            )}
                          </div>

                          {/* Anime */}
                          <div className="bg-slate-900/50 rounded-lg p-3">
                            <div className="text-sm text-gray-400 mb-2">Anime</div>
                            {val.anime ? (
                              <div className="space-y-2">
                                <div className="relative w-full aspect-[3/4] bg-slate-800 rounded overflow-hidden">
                                  <Image
                                    src={val.anime.image_url}
                                    alt={`${val.value} anime`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {new Date(val.anime.created_at).toLocaleDateString()}
                                  </span>
                                  <button
                                    onClick={() =>
                                      deleteImage(val.anime!.id, selectedCategory, val.value, 'anime')
                                    }
                                    disabled={deleting === val.anime.id}
                                    className="text-red-500 hover:text-red-400 disabled:opacity-50"
                                  >
                                    {deleting === val.anime.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full aspect-[3/4] bg-slate-900 rounded flex items-center justify-center text-gray-600 text-sm">
                                No image
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400 text-lg">Select a category to view and manage features</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
