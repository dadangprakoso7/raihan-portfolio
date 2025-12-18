export interface FilterCategory {
  id: string
  name: string
  folderPath: string
  subcategories: {
    id: string
    name: string
  }[]
}

export const filterCategories: FilterCategory[] = [
  {
    id: "works",
    name: "WORKS",
    folderPath: "/Works",
    subcategories: [
      { id: "luminos-entertain", name: "Luminos Entertain" },
      { id: "amigos-show", name: "Amigos Show" },
      { id: "family-mart", name: "Family Mart" },
      { id: "its-studio", name: "Its Studio" },
    ],
  },
  {
    id: "stages",
    name: "STAGES",
    folderPath: "/Stages",
    subcategories: [
      { id: "enamore", name: "Enamore" },
      { id: "themilo", name: "Themilo" },
      { id: "titilaras", name: "Titilaras" },
    ],
  },
  {
    id: "projects",
    name: "PROJECTS",
    folderPath: "/Projects",
    subcategories: [
      { id: "director-osfak", name: "Director Osfak" },
      { id: "director-unitomofest", name: "Director UnitomoFest" },
    ],
  },
  {
    id: "portrait",
    name: "PORTRAIT",
    folderPath: "/Portrait",
    subcategories: [{ id: "wisuda", name: "Wisuda" }],
  },
  {
    id: "videos",
    name: "VIDEOS",
    folderPath: "/Videos",
    subcategories: [
      { id: "luminos", name: "Luminos" },
      { id: "titilaras", name: "Titilaras" },
      { id: "amigos", name: "Amigos Show" },
    ],
  },
]
