"use client"

import { useState } from "react"
import { filterCategories } from "@/lib/filter-categories"

interface FilterNavigationProps {
  onCategoryChange: (category: string | null) => void
  onSubcategoryChange: (subcategory: string | null) => void
  activeCategory: string | null
  activeSubcategory: string | null
}

export function FilterNavigation({
  onCategoryChange,
  onSubcategoryChange,
  activeCategory,
  activeSubcategory,
}: FilterNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      onCategoryChange(null)
      onSubcategoryChange(null)
      setOpenDropdown(null)
    } else {
      onCategoryChange(categoryId)
      onSubcategoryChange(null)
      setOpenDropdown(categoryId)
    }
  }

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (activeSubcategory === subcategoryId) {
      onSubcategoryChange(null)
    } else {
      onSubcategoryChange(subcategoryId)
    }
  }

  const activeSubcategories = activeCategory
    ? filterCategories.find((c) => c.id === activeCategory)?.subcategories || []
    : []

  return (
    <nav className="bg-background sticky top-16 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-8 py-4 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide border-b border-border/30">
          {/* Category Buttons */}
          {filterCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`relative text-base font-serif uppercase tracking-wider transition-colors whitespace-nowrap pb-1 ${
                activeCategory === category.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.name}
              {activeCategory === category.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
              )}
            </button>
          ))}
        </div>

        {activeSubcategories.length > 0 && (
          <div className="flex items-center gap-4 py-3 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide">
            {activeSubcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => handleSubcategoryClick(subcategory.id)}
                className={`px-6 py-2 rounded text-sm transition-colors whitespace-nowrap ${
                  activeSubcategory === subcategory.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
