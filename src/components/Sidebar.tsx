import React from "react";
import Link from "next/link";

type TItem = {
  id: number;
  name: string;
  url: string;
};

const items: TItem[] = [
  {
    id: 1,
    name: "Categories",
    url: "/categories",
  },
  {
    id: 2,
    name: "Videos",
    url: "/videos",
  },
  {
    id: 3,
    name: "Sections",
    url: "/sections",
  },
  {
    id: 4,
    name: "Pages",
    url: "/pages",
  },
  {
    id: 5,
    name: "Users",
    url: "/users",
  },
];

function Sidebar() {
  return (
    <div className="w-[350px]  h-full flex p-5 bg-bg1 text-text1 text-xl">
      <ul className="w-full h-full flex flex-col mt-[160px] list-none">
        {items.map((el) => (
          <li
            key={el.id}
            className="w-[300px] h-[60px] flex text-xl border-t-[1px] last:border-b-[1px] items-center justify-around"
          >
            <Link href={el.url}>{el.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
