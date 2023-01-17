import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import cloud from "../../src/assets/cloud.svg";
import categoryFetcher from "../../services/categoryFetcher";
import { TCategory } from "../../src/types/types";

function NewVideo() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    categoryFetcher.getCategories().then((data) => {
      if (data) setCategories(data);
    });
  }, []);

  const handleData = (data: any) => {
    console.log(data);

    const formData = new FormData();
    if (data) {
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("display", data.display);
      formData.append("public", data.public);
    }
  };
  return (
    <div className="w-full h-full flex">
      <form
        className="w-1/2 h-full flex flex-col items-center"
        onSubmit={handleSubmit((data) => handleData(data))}
      >
        <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
          <label htmlFor="title" className="w-[80%] text-[20px] font-bold">
            Title
            <input
              id="title"
              type="text"
              className="w-[100%] h-[50px] flex flex-col font-normal bg-white border-b bg-transparent border-b-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="font-normal text-[#FF0000]">Title is required.</p>
            )}
          </label>
        </div>

        <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
          <label
            htmlFor="description"
            className="w-[80%] text-[20px] font-bold"
          >
            Description
            <input
              id="description"
              type="text"
              className="w-[100%] h-[192px] flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="font-normal text-[#FF0000]">
                Description is required.
              </p>
            )}
          </label>
        </div>

        <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
          <label htmlFor="category" className="w-[80%] text-[20px] font-bold">
            Category
            <select
              id="category"
              className="w-[100%] h-[50px] flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
              {...register("category", { required: true })}
            >
              <option value="">---</option>
              {categories &&
                categories.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="font-normal text-[#FF0000]">
                Category is required.
              </p>
            )}
          </label>
        </div>

        <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
          <label htmlFor="display" className="w-[80%] text-[20px] font-bold">
            Display
            <input
              type="checkbox"
              className="mx-2 w-5 h-4"
              {...register("display", { required: true })}
            />
          </label>
        </div>

        <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
          <label htmlFor="public" className="w-[80%] text-[20px] font-bold">
            Public video ?
            <input
              type="checkbox"
              className="mx-2 w-5 h-4"
              {...register("public", { required: true })}
            />
          </label>
        </div>
        <div className="w-full h-full flex justify-center items-center m-5">
          <div className="flex flex-col w-[70%] h-100 bg-[#D9D9D9] border-dashed border-2 border-black rounded-xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
            <input
              className="absolute w-full h-full"
              type="file"
              {...register("file", { required: true })}
            />
            <Image
              src={cloud}
              alt="cloud"
              className="w-[80%] self-center bg-slate-300 p-5"
            />
            <p className="text-[20px] self-center font-bold p-5">
              Choose a file or drag it here.
            </p>
            {errors.file && (
              <p className="self-center">Please provide a file</p>
            )}
          </div>
        </div>
        {/* <div className="flex flex-col my-[2em] w-[100%] justify-center items-center"> */}
        <button
          type="submit"
          className="w-[50%] h-[50px] bg-[#D9D9D9] border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
        >
          Send
        </button>
        {/* </div> */}
      </form>
    </div>
  );
}

export default NewVideo;
