import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import magnifyingGlass from "../assets/Magnifying_glass.svg";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChange = handleSubmit((data) => {
    onSearch(data.search);
  });

  return (
    <div className="w-[75%] h-[60px] mt-[3em] ml-[5%] flex justify-between bg-white border border-solid border-black border-1 rounded-[10px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
      <form onChange={onChange} className="w-[100%] flex align-middle">
        <input
          {...register("search")}
          placeholder="search"
          className="w-[100%] pl-[2%] text-[20px] text-bold rounded-l-[10px]"
        />

        {errors?.search && <p>Not founded !</p>}
      </form>
      <Image
        className="w-[55px] h-[55px] rounded-r-[10px] bg-white border"
        width={60}
        height={60}
        priority
        src={magnifyingGlass}
        alt="magnifying glass"
      />
    </div>
  );
}
