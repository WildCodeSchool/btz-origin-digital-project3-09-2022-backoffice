import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import cloud from "../src/assets/cloud.svg";

function videos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log();
  };
  return (
    <div className="w-full h-full flex">
      <form
        className="w-1/2 h-full flex flex-col items-center"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
          <label htmlFor="title" className="w-[80%] text-[20px] font-bold">
            Title
            <input
              id="title"
              type="text"
              className="w-[100%] h-[60px] flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
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
            />
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
            <select
              id="display"
              className="w-[100%] h-[50px] flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
              {...register("display", { required: true })}
            />
            {errors.display && (
              <p className="font-normal text-[#FF0000]">Display is required.</p>
            )}
          </label>
        </div>

        <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
          <label htmlFor="public" className="w-[80%] text-[20px] font-bold">
            Public video ?
            <select
              id="public"
              className="w-[100%] h-[50px] flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
              {...register("public", { required: true })}
            />
            {errors.public && (
              <p className="font-normal text-[#FF0000]">Public is required.</p>
            )}
          </label>
        </div>

        <div className="flex flex-col my-[2em] w-[100%] justify-center items-center">
          <input
            id="submit"
            type="submit"
            className="w-[50%] h-[50px] bg-[#D9D9D9] border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
          />
        </div>
      </form>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="flex flex-col w-[70%] h-100 p-5 bg-[#D9D9D9] border-dashed border-2 border-black rounded-xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
          <Image
            src={cloud}
            alt="cloud"
            className="w-[80%] self-center bg-slate-300"
          />
          <p className="text-[20px] self-center font-bold">
            Choose a file or drag it here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default videos;
