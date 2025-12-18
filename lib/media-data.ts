export interface MediaItem {
  id: string
  fileName: string
  title: string
  description: string
  fileUrl: string
  image: string
  tag: "works" | "stages" | "projects" | "portrait" | "videos"
  subTag: string
  type: "photo" | "video"
  year: number
  featured?: boolean
  // New fields for video support
  videoUrl?: string // YouTube, Instagram, or local video URL
  videoType?: "youtube" | "instagram" | "local" // Type of video
  category?: string // For display purposes
}

async function loadMediaData(): Promise<MediaItem[]> {
  const allMedia: MediaItem[] = []

  // Works category
  const worksSubtags = ["luminos-entertain", "amigos-show", "family-mart", "its-studio"]
  for (const subtag of worksSubtags) {
    try {
      const response = await fetch(`/data/works/${subtag}.json`)
      const data = await response.json()
      allMedia.push(...data)
    } catch (error) {
      console.error(`Failed to load works/${subtag}.json:`, error)
    }
  }

  // Stages category
  const stagesSubtags = ["enamore", "themilo", "titilaras"]
  for (const subtag of stagesSubtags) {
    try {
      const response = await fetch(`/data/stages/${subtag}.json`)
      const data = await response.json()
      allMedia.push(...data)
    } catch (error) {
      console.error(`Failed to load stages/${subtag}.json:`, error)
    }
  }

  // Projects category
  const projectsSubtags = ["director-osfak", "director-unitomofest"]
  for (const subtag of projectsSubtags) {
    try {
      const response = await fetch(`/data/projects/${subtag}.json`)
      const data = await response.json()
      allMedia.push(...data)
    } catch (error) {
      console.error(`Failed to load projects/${subtag}.json:`, error)
    }
  }

  // Portrait category
  const portraitSubtags = ["wisuda"]
  for (const subtag of portraitSubtags) {
    try {
      const response = await fetch(`/data/portrait/${subtag}.json`)
      const data = await response.json()
      allMedia.push(...data)
    } catch (error) {
      console.error(`Failed to load portrait/${subtag}.json:`, error)
    }
  }

  // Videos category
  const videosSubtags = ["youtube", "instagram", "local"]
  for (const subtag of videosSubtags) {
    try {
      const response = await fetch(`/data/videos/${subtag}.json`)
      const data = await response.json()
      allMedia.push(...data)
    } catch (error) {
      console.error(`Failed to load videos/${subtag}.json:`, error)
    }
  }

  return allMedia
}

export async function getAllMediaData(): Promise<MediaItem[]> {
  return await loadMediaData()
}

export async function getMediaBySubTag(tag: string, subTag: string): Promise<MediaItem[]> {
  try {
    const response = await fetch(`/data/${tag}/${subTag}.json`)
    return await response.json()
  } catch (error) {
    console.error(`Failed to load ${tag}/${subTag}.json:`, error)
    return []
  }
}
