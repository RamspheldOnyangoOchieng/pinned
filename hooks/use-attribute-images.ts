/**
 * React hook for loading attribute images with caching
 */

import { useState, useEffect } from 'react';

export interface AttributeImage {
  id: string;
  category: string;
  value: string;
  style: 'realistic' | 'anime';
  image_url: string;
  seed?: number;
  width?: number;
  height?: number;
}

export function useAttributeImage(
  category: string | null,
  value: string | null,
  style: 'realistic' | 'anime'
) {
  const [image, setImage] = useState<AttributeImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || !value) {
      return;
    }

    let cancelled = false;

    async function fetchImage() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/attribute-images?category=${encodeURIComponent(category)}&value=${encodeURIComponent(value)}&style=${style}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const data = await response.json();

        if (!cancelled) {
          if (data.success && data.image) {
            setImage(data.image);
          } else {
            setError(data.error || 'Failed to load image');
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchImage();

    return () => {
      cancelled = true;
    };
  }, [category, value, style]);

  return { image, loading, error };
}

export function useCategoryImages(
  category: string | null,
  values: string[],
  style: 'realistic' | 'anime'
) {
  const [images, setImages] = useState<Map<string, AttributeImage>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    if (!category || values.length === 0) {
      return;
    }

    let cancelled = false;

    async function fetchImages() {
      setLoading(true);
      setError(null);
      setProgress({ current: 0, total: values.length });

      const imageMap = new Map<string, AttributeImage>();

      try {
        for (let i = 0; i < values.length; i++) {
          if (cancelled) break;

          const value = values[i];
          setProgress({ current: i + 1, total: values.length });

          const response = await fetch(
            `/api/attribute-images?category=${encodeURIComponent(category)}&value=${encodeURIComponent(value)}&style=${style}`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.image) {
              imageMap.set(value, data.image);
            }
          }

          // Small delay to avoid overwhelming the API
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (!cancelled) {
          setImages(imageMap);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchImages();

    return () => {
      cancelled = true;
    };
  }, [category, values.join(','), style]);

  return { images, loading, error, progress };
}

/**
 * Hook for preloading all images for a category
 */
export function usePreloadImages(
  category: string | null,
  values: string[],
  style: 'realistic' | 'anime',
  enabled: boolean = true
) {
  const { images, loading, error } = useCategoryImages(
    enabled ? category : null,
    values,
    style
  );

  const getImage = (value: string): AttributeImage | undefined => {
    return images.get(value);
  };

  return {
    images,
    loading,
    error,
    getImage,
    isReady: !loading && images.size > 0
  };
}
