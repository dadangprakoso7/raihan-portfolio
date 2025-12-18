import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import GallerySection from "@/components/gallery-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <GallerySection />
      <Footer />
    </main>
  )
}
