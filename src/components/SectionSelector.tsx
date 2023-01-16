import Link from "next/link";
import { TSectionSelector } from "../types/types";

const items: TSectionSelector[] = [
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

export default function SectionSelector() {
  const handleClick = (item: TSectionSelector) => {
    localStorage.setItem("sectionName", item.name);
    localStorage.setItem("section", item.section);
  };
  return (
    <div>
      <ul className="w-full flex ml-[5%] m-4 font-bold">
        {items.map((item) => (
          <li
            key={item.id}
            className={
              typeof window !== "undefined" &&
              localStorage.getItem("sectionName") === item.name
                ? "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around underline"
                : "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] items-center justify-around hover:underline"
            }
          >
            <Link href={item.url} onClick={() => handleClick(item)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
