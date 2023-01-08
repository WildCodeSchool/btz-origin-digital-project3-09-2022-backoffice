import React, { useState, useEffect } from "react";
import Image from "next/image";
import categoryFetcher from "../../services/categoryFetcher";
import plus from "../../src/assets/plus.svg";
import { TAdvertsing, TSectionDynamic } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";

function Categories() {
  const [categories, setCategories] = useState<
    TAdvertsing[] | TSectionDynamic[] | TSectionDynamic[]
  >([]);

  useEffect(() => {
    categoryFetcher.getCategories().then((response) => {
      setCategories(response);
    });
  }, []);

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar />
      <div className="rounded-xl">
        <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
          <thead className="h-[50px] rounded-t-[10px]">
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody className="rounded-b-[10px]">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
              >
                <td className="border border-black px-5 last:rounded-bl-[10px]">
                  {category.title}
                </td>
                <td className="border px-5">{category.description}</td>
                <td className="border text-center">
                  <a href={`/categories/${category.id}`}>📝</a>
                </td>
                <td className="border text-center last:rounded-br-[10px]">
                  <button type="button">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[50px] mt-[1em] ml-[5%]">
        <a href="/videos/new-category">
          <Image src={plus} alt="logo-plus" />
        </a>
      </div>
    </div>
  );
}

export default Categories;
