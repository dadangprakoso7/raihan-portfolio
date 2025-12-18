"use client"
import { Instagram, Linkedin, MessageCircle, Music, ArrowRight, MessageSquare } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Mengubah isActive menjadi TRUE untuk semua link dan menggunakan ikon yang sesuai.
  // Gunakan MessageSquare atau MessageCircle (sesuai yang diimpor) untuk WhatsApp.
  // Gunakan Music untuk TikTok.
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/rraihxn_?igsh=MTRyYzdkcGJoNnA3cA==",
      icon: Instagram,
      isActive: true, // Sudah aktif
    },
    {
      name: "WhatsApp",
      // Pastikan ada URL yang valid di sini, atau tambahkan URL placeholder
      url: "https://wa.me/6285325484640", // **ISI NOMOR WA ANDA**
      icon: MessageCircle, // Menggunakan MessageCircle
      isActive: true, // Diaktifkan agar terlihat
    },
    {
      name: "LinkedIn",
      // Pastikan ada URL yang valid di sini, atau tambahkan URL placeholder
      url: "https://linkedin.com/in/MASUKKAN_PROFILE_ANDA_DISINI", // **ISI LINKEDIN ANDA**
      icon: Linkedin,
      isActive: false, // Diaktifkan agar terlihat
    },
    {
      name: "TikTok",
      // Pastikan ada URL yang valid di sini, atau tambahkan URL placeholder
      url: "https://www.tiktok.com/@billixnr13?_r=1&_t=ZS-92KCdqpXebA", // **ISI USERNAME TIKTOK ANDA**
      icon: Music, // Menggunakan Music
      isActive: true, // Diaktifkan agar terlihat
    },
  ]

  return (
    <footer id="footer" className="border-t border-border bg-secondary relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-3xl font-bold text-white mb-3">Raihan</h3>
            <p className="text-white leading-relaxed mb-6">
              Professional photographer and videographer specializing in capturing powerful moments for artists, brands,
              and major events. Bringing visual stories to life with technical excellence and creative vision.
            </p>
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <div className="w-8 h-1 bg-accent/50 rounded-full" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg flex items-center gap-2">
              Navigate
              <ArrowRight size={16} className="text-white" />
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#gallery" className="text-white hover:text-accent transition-colors duration-200">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#footer" className="text-white hover:text-accent transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-accent transition-colors duration-200">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Connect</h4>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  // Menghilangkan logika opacity/cursor-not-allowed karena semua link sekarang isActive: true
                  className={`group p-3 rounded-lg transition-all duration-200 flex items-center justify-center 
                  ${
                    link.isActive
                      ? "bg-accent text-accent-foreground hover:shadow-lg hover:scale-110" // Gaya aktif
                      : "bg-muted text-muted-foreground cursor-not-allowed opacity-60" // Gaya non-aktif (sekarang tidak akan terpakai)
                  }`}
                  // Hapus atribut aria-disabled dan onClick karena semua link sekarang aktif
                  // aria-disabled={!link.isActive}
                  // onClick={(e) => !link.isActive && e.preventDefault()}
                >
                  <link.icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                </a>
              ))}
            </div>
            {/* Menghilangkan pesan "coming soon" karena semua tautan sekarang aktif */}
            {/* {socialLinks.some((l) => !l.isActive) && (
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                WhatsApp, LinkedIn & TikTok links coming soon. Follow Instagram for latest work!
              </p>
            )} */}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
            <p>
              © {currentYear} Raihan. All rights reserved. | Professional Photography & Videography | Crafted with
              modern web technologies
            </p>
            <div className="md:text-right flex flex-col gap-2">
              <a href="#" className="hover:text-accent transition-colors duration-200">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}