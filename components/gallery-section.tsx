"use client"

import { useState, useMemo, useEffect } from "react"
import { getAllMediaData, type MediaItem } from "@/lib/media-data"
import { FilterNavigation } from "./filter-navigation"
import MediaCard from "./media-card"
import MediaModal from "./media-modal"
import { Button } from "@/components/ui/button"

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mediaData, setMediaData] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [itemsToShow, setItemsToShow] = useState(9)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const data = await getAllMediaData()
      setMediaData(data)
      setIsLoading(false)
    }
    loadData()
  }, [])

  const filteredMedia = useMemo(() => {
    let filtered = mediaData

    if (activeCategory) {
      filtered = filtered.filter((item) => item.tag === activeCategory)
    }

    if (activeSubcategory) {
      filtered = filtered.filter((item) => item.subTag === activeSubcategory)
    }

    return filtered
  }, [activeCategory, activeSubcategory, mediaData])

  useEffect(() => {
    setItemsToShow(9)
  }, [activeCategory, activeSubcategory])

  const visibleMedia = useMemo(() => {
    return filteredMedia.slice(0, itemsToShow)
  }, [filteredMedia, itemsToShow])

  const handleCategoryChange = (category: string | null) => {
    setIsTransitioning(true)
    setActiveCategory(category)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const handleSubcategoryChange = (subcategory: string | null) => {
    setIsTransitioning(true)
    setActiveSubcategory(subcategory)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 9)
  }

  if (isLoading) {
    return (
      <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">Memuat portfolio...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
      <FilterNavigation
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
      />

      <div className="max-w-7xl mx-auto">
        {/* Results Counter */}
        {(activeCategory || activeSubcategory) && (
          <div className="mt-8 mb-8">
            <p className="text-sm text-muted-foreground">
              Menampilkan {visibleMedia.length} dari {filteredMedia.length} hasil
              {activeCategory && activeSubcategory && (
                <span>
                  {" "}
                  • {activeCategory.toUpperCase()} - {activeSubcategory}
                </span>
              )}
              {activeCategory && !activeSubcategory && <span> • {activeCategory.toUpperCase()}</span>}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
            isTransitioning ? "opacity-50" : "opacity-100 animate-fade-in"
          }`}
        >
          {visibleMedia.map((media, index) => (
            <div
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
              className="animate-scale-in cursor-pointer"
            >
              <MediaCard media={media} />
            </div>
          ))}
        </div>

        {filteredMedia.length > itemsToShow && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="min-w-[200px] font-serif uppercase tracking-wider bg-transparent"
            >
              Load More
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">Belum ada media untuk kategori ini</p>
          </div>
        )}

        {/* Media Modal */}
        {selectedMedia && (
          <MediaModal
            media={selectedMedia}
            onClose={() => setSelectedMedia(null)}
            allMedia={filteredMedia}
            onNext={(id) => {
              const index = filteredMedia.findIndex((m) => m.id === id)
              if (index < filteredMedia.length - 1) {
                setSelectedMedia(filteredMedia[index + 1])
              }
            }}
            onPrev={(id) => {
              const index = filteredMedia.findIndex((m) => m.id === id)
              if (index > 0) {
                setSelectedMedia(filteredMedia[index - 1])
              }
            }}
          />
        )}
      </div>
    </section>
  )
}
