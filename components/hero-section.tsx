"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT */}
        <div className="slide-up order-1 lg:order-1">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Visual Storyteller
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground mb-4">
            Capturing moments that matter for artists, events, and brands
          </p>

          <p className="text-md text-muted-foreground max-w-2xl mb-4">
            Saya Raihan Rachman, freelance editor dan fotografer berbasis di Surabaya, Indonesia.
            Menggabungkan ketelitian editing dan kepekaan visual, saya menghadirkan karya yang tidak
            hanya rapi secara teknis, tetapi juga kuat dalam menyampaikan cerita dan emosi.
          </p>

          <p className="text-md text-muted-foreground max-w-2xl mb-8">
            Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#footer")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }}
              >
                Hubungi Saya
              </a>
            </Button>
          </div>
        </div>

        {/* RIGHT SHAPE + IMAGE */}
        <div className="relative flex justify-center lg:justify-end order-2 lg:order-2 mr-6">
          {/* shape belah ketupat */}
          <div className="w-72 h-72 md:w-96 md:h-96 bg-primary/20 rotate-45 rounded-2xl absolute top-1/2 -translate-y-1/2" />

          {/* image */}
          <div className="relative w-64 h-64 md:w-[22rem] md:h-[22rem]">
            <Image
              src="/media/hero.jpg"
              alt="Raihan Rachman"
              fill
              className="object-cover rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
