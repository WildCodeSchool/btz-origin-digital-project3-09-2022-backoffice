import { TSectionSelector } from "./types";

const sectionsTypes: TSectionSelector[] = [
  {
    id: 1,
    name: "Hero Slider",
    url: "/sections/static-sections",
    section: "static-sections",
    isHero: true,
  },
  {
    id: 2,
    name: "Carrousel Static",
    url: "/sections/static-sections",
    section: "static-sections",
    isHero: false,
  },
  {
    id: 3,
    name: "Carrousel Dynamic",
    url: "/sections/dynamic-sections",
    section: "dynamic-sections",
    isGrid: false,
  },
  {
    id: 4,
    name: "Grid Dynamic",
    url: "/sections/dynamic-sections",
    section: "dynamic-sections",
    isGrid: true,
  },
  {
    id: 5,
    name: "Advertising",
    url: "/sections/advertisings",
    section: "advertisings",
  },
];

export default sectionsTypes;
