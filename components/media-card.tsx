"use client"

import Image from "next/image"
import type { MediaItem } from "@/lib/media-data"
import { ExternalLink, Play } from "lucide-react"

interface MediaCardProps {
  media: MediaItem
}

export default function MediaCard({ media }: MediaCardProps) {
  const isVideo = media.type === "video" || media.videoUrl

  return (
    <div className="group cursor-pointer relative overflow-hidden rounded-lg bg-secondary scale-in hover:shadow-xl transition-all duration-300 hover:shadow-accent/30">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-muted">
        <Image
          src={media.image || "/placeholder.svg"}
          alt={media.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/40 group-hover:to-primary/60 transition-all duration-300" />

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold text-primary-foreground mb-2 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
          {media.title}
        </h3>
        <p className="text-sm text-primary-foreground/90 line-clamp-2 mb-3 group-hover:translate-y-0 translate-y-2 transition-transform duration-300 delay-75">
          {media.description}
        </p>
        <div className="flex items-center justify-between text-sm text-primary-foreground/80 group-hover:translate-y-0 translate-y-2 transition-transform duration-300 delay-100">
          <span>{media.year}</span>
          {isVideo ? <Play size={16} /> : <ExternalLink size={16} />}
        </div>
      </div>

      {/* Featured Badge */}
      {media.featured && (
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold animate-pulse shadow-lg">
          Featured
        </div>
      )}
    </div>
  )
}
