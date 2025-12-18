"use client"

import type React from "react"

import Image from "next/image"
import type { MediaItem } from "@/lib/media-data"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface MediaModalProps {
  media: MediaItem
  onClose: () => void
  allMedia: MediaItem[]
  onNext: (id: string) => void
  onPrev: (id: string) => void
}

function getYouTubeVideoId(url: string): string | null {
  const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/, /youtube\.com\/embed\/([^&\n?#]+)/]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function getInstagramEmbedUrl(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel)\/([^/?]+)/)
  if (match) {
    return `https://www.instagram.com/p/${match[1]}/embed`
  }
  return null
}

export default function MediaModal({ media, onClose, allMedia, onNext, onPrev }: MediaModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)

  const currentIndex = allMedia.findIndex((m) => m.id === media.id)
  const hasNext = currentIndex < allMedia.length - 1
  const hasPrev = currentIndex > 0

  const isVideo = media.type === "video" || media.videoUrl
  const videoType = media.videoType
  const videoUrl = media.videoUrl

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [media.id])

  useEffect(() => {
    if (!isVideo && media.image) {
      const img = document.createElement("img")
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.src = media.image
    } else {
      setImageDimensions(null)
    }
  }, [media.image, isVideo])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight" && hasNext) onNext(media.id)
      if (e.key === "ArrowLeft" && hasPrev) onPrev(media.id)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [media.id, hasNext, hasPrev, onClose, onNext, onPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY
    const diff = touchEnd - touchStart

    if (diff > 100) {
      onClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getMediaContainerStyle = () => {
    if (isVideo) {
      // Default video aspect ratio
      if (videoType === "youtube" || videoType === "local") {
        return "aspect-video" // 16:9
      }
      if (videoType === "instagram") {
        return "aspect-[9/16]" // Instagram vertical
      }
    }

    if (imageDimensions) {
      const aspectRatio = imageDimensions.width / imageDimensions.height

      // Portrait
      if (aspectRatio < 0.8) {
        return "aspect-[3/4]"
      }
      // Landscape
      if (aspectRatio > 1.3) {
        return "aspect-video"
      }
      // Square-ish
      return "aspect-square"
    }

    return "aspect-square" // Default fallback
  }

  const renderMedia = () => {
    if (!isVideo || !videoUrl) {
      return (
        <Image
          src={media.image || "/placeholder.svg"}
          alt={media.title}
          fill
          className="object-contain rounded-lg shadow-2xl"
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
        />
      )
    }

    if (videoType === "youtube") {
      const videoId = getYouTubeVideoId(videoUrl)
      if (videoId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
            title={media.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-2xl"
          />
        )
      }
    }

    if (videoType === "instagram") {
      const embedUrl = getInstagramEmbedUrl(videoUrl)
      if (embedUrl) {
        return (
          <iframe src={embedUrl} title={media.title} allowFullScreen className="w-full h-full rounded-lg shadow-2xl" />
        )
      }
    }

    if (videoType === "local") {
      return (
        <video controls className="w-full h-full rounded-lg shadow-2xl object-contain" poster={media.image}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    }

    return (
      <Image
        src={media.image || "/placeholder.svg"}
        alt={media.title}
        fill
        className="object-contain rounded-lg shadow-2xl"
        priority
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
      />
    )
  }

  return (
    <div
      className="fixed inset-0 bg-primary/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="fixed top-4 right-4 lg:absolute lg:top-4 lg:right-4 p-2 bg-accent/80 hover:bg-accent rounded-full transition-all duration-200 text-white hover:scale-110 z-60 shadow-lg"
        aria-label="Close modal"
      >
        <X size={32} />
      </button>

      <div className="w-full max-w-7xl my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Media - Takes more space and adapts to content */}
          <div
            className={`lg:col-span-8 relative ${getMediaContainerStyle()} w-full transition-opacity duration-300 ${
              isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {renderMedia()}
          </div>

          {/* Details - Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-between text-primary-foreground">
            <div
              className={`transition-all duration-300 ${isAnimating ? "opacity-50 translate-y-2" : "opacity-100 translate-y-0"}`}
            >
              <p className="text-xs opacity-75 mb-2 uppercase tracking-widest font-semibold">{media.category}</p>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">{media.title}</h2>
              <p className="text-sm lg:text-base opacity-90 mb-6 leading-relaxed text-pretty">{media.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm opacity-75">
                  <span className="font-semibold">Year:</span> {media.year}
                </span>
                {isVideo && videoType && (
                  <span className="bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {videoType}
                  </span>
                )}
                {media.featured && (
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6 lg:mt-8">
              <button
                onClick={() => onPrev(media.id)}
                disabled={!hasPrev}
                className="flex-1 flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 transition-all duration-200 text-primary-foreground hover:scale-105 active:scale-95 font-medium"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Prev</span>
              </button>
              <button
                onClick={() => onNext(media.id)}
                disabled={!hasNext}
                className="flex-1 flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 transition-all duration-200 text-primary-foreground hover:scale-105 active:scale-95 font-medium"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="mt-4 lg:mt-6 flex gap-1">
              {allMedia.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-accent" : "bg-primary-foreground/20"
                  }`}
                />
              ))}
            </div>

            <p className="text-xs opacity-60 mt-4 lg:hidden text-center">Swipe down to close</p>
          </div>
        </div>
      </div>
    </div>
  )
}
