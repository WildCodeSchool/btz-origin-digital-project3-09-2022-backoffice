import Link from "next/link";
import { TSectionSelector } from "../types/types";
import sectionsTypes from "../types/sectionsTypes";

export default function SectionSelector() {
  const handleClick = (item: TSectionSelector) => {
    localStorage.setItem("sectionName", item.name);
    localStorage.setItem("section", item.section);
  };
  return (
    <div>
      <ul className="w-full flex ml-[5%] m-4 font-bold">
        {sectionsTypes.map((item) => (
          <li
            key={item.id}
            className={
              typeof window !== "undefined" &&
              localStorage.getItem("sectionName") === item.name
                ? "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] last:border-r-[2px] items-center justify-around underline"
                : "h-[60px] px-4 flex text-xl border-x-[1px] first:border-l-[2px] last:border-r-[2px] items-center justify-around hover:underline"
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
