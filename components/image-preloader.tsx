"use client"

import { useEffect } from 'react'
import { ATTRIBUTE_OPTIONS } from '@/scripts/prebuild-all-images'

/**
 * Component that preloads all attribute images in the background
 * Images are loaded from cache instantly, and any missing ones are generated async
 */
export function ImagePreloader() {
  useEffect(() => {
    // Preload images in the background
    async function preloadImages() {
      const STYLES = ['realistic', 'anime']
      
      for (const [category, values] of Object.entries(ATTRIBUTE_OPTIONS)) {
        for (const style of STYLES) {
          for (const value of values) {
            // Fire off requests in parallel but don't wait for them
            // Images should already be cached from earlier prebuilds
            fetch(`/api/attribute-images?category=${category}&value=${value}&style=${style}`, {
              method: 'GET',
            }).catch(err => {
              // Silently fail in background - don't block UI
              console.debug(`Background preload failed for ${category}:${value}:${style}`)
            })
          }
        }
      }
    }

    // Start preload after a small delay to avoid blocking initial render
    const timeout = setTimeout(preloadImages, 1000)
    return () => clearTimeout(timeout)
  }, [])

  // This component doesn't render anything
  return null
}

// Export attribute options for use in other components
export const ATTRIBUTE_OPTIONS_EXPORT = ATTRIBUTE_OPTIONS
