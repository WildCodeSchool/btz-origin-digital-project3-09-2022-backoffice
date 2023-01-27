import React, { DragEvent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import cloud from "../../src/assets/cloud.svg";
import categoryFetcher from "../../services/categoryFetcher";
import { TCategory } from "../../src/types/types";
import axiosInstance from "../../services/axiosinstance";
import getVideoInfos from "../../services/getVideosInfos";

function NewVideo() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  useEffect(() => {
    setSelectedFiles(watch("file"));
  }, [watch("file")]);

  useEffect(() => {
    categoryFetcher.getCategories().then((data) => {
      if (data) setCategories(data);
    });
  }, []);

  const handleData = async (data: FieldValues) => {
    const formData = new FormData();
    if (data) {
      const dataOk = [];

      if (data.file[0].name.substring(0, 2) !== "vi") {
        dataOk.push(data.file[0]);
      }
      if (data.file[1].name.substring(0, 2) !== "vi") {
        dataOk.push(data.file[1]);
      }
      if (data.file[2].name.substring(0, 2) !== "vi") {
        dataOk.push(data.file[2]);
      }
      if (data.file[0].name.substring(0, 2) === "vi") {
        dataOk.push(data.file[0]);
      }
      if (data.file[1].name.substring(0, 2) === "vi") {
        dataOk.push(data.file[1]);
      }
      if (data.file[2].name.substring(0, 2) === "vi") {
        dataOk.push(data.file[2]);
      }
      const infos = await getVideoInfos(dataOk[2]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("categoryId", data.category);
      formData.append("display", data.display);
      formData.append("isPublic", data.public);
      formData.append("duration", infos.duration.toString().replace(".", ","));
      formData.append("files", dataOk[0]);
      formData.append("files", dataOk[1]);
      formData.append("files", dataOk[2]);

      await axiosInstance.post("/videos", formData);
      reset();
      router.push("/videos");
    }
  };

  return (
    <div className="w-full h-screen flex ">
      <form
        className="w-full h-full flex flex-col items-center"
        onSubmit={handleSubmit((data) => handleData(data))}
      >
        <div className="flex flex-row w-full mb-10">
          <div className="flex flex-col mt-[2em] w-full justify-center items-center">
            <label htmlFor="title" className="w-[80%] text-[20px] font-bold">
              Title
              <input
                id="title"
                type="text"
                className="w-[100%] h-[50px] flex flex-col my-1font-normal bg-white border-b bg-transparent border-b-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="font-normal text-[#FF0000]">Title is required.</p>
              )}
            </label>

            <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
              <label
                htmlFor="description"
                className="w-[80%] text-[20px] font-bold"
              >
                Description
                <input
                  id="description"
                  type="text"
                  className="w-[100%] h-[192px] my-3 flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
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
              <label
                htmlFor="category"
                className="w-[80%] text-[20px] font-bold"
              >
                Category
                <select
                  id="category"
                  className="w-[100%] h-[50px] my-3 flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
                  {...register("category", { required: true })}
                >
                  <option value="">---</option>
                  {categories &&
                    categories
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((e) => (
                        <option key={e.id} value={e.id}>
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
              <label
                htmlFor="display"
                className="w-[80%] text-[20px] font-bold"
              >
                Display
                <input
                  id="diplay"
                  type="checkbox"
                  className="mx-2 w-5 h-4"
                  {...register("display")}
                />
              </label>
            </div>

            <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
              <label htmlFor="public" className="w-[80%] text-[20px] font-bold">
                Public video ?
                <input
                  id="public"
                  type="checkbox"
                  className="mx-2 w-5 h-4"
                  {...register("public")}
                />
              </label>
            </div>
          </div>
          <div className=" w-full h-full flex flex-col content-around mt-[10%]">
            <div
              onDragEnter={handleDrag}
              className="flex flex-col  w-[70%] h-[60%] bg-[#D9D9D9] border-dashed border-2 my-5 border-black rounded-xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
            >
              {dragActive && (
                <div
                  className="absolute w-screen h-screen top-0 right-0 bottom-0 left-0 "
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                />
              )}
              <input
                className="absolute w-full h-full z-50 opacity-0"
                type="file"
                multiple
                {...register("file", { required: true })}
              />
              <Image
                src={cloud}
                alt="cloud"
                className="w-[80%] h-full self-center bg-slate-300 p-5 "
              />
              {Object.entries(selectedFiles).length !== 0 ? (
                <p className="text-[20px] self-center font-bold p-5 ">
                  Selected Files :
                </p>
              ) : (
                <p className="text-[20px] self-center font-bold p-5 ">
                  Please select your thumbnail file, your teaser file and your
                  video file
                </p>
              )}
              {selectedFiles &&
                Object.entries(selectedFiles).map((e) => (
                  <div
                    key={e[1].name}
                    className="flex flex-col font-medium text-sm w-full m-2"
                  >
                    {e[1].name}
                  </div>
                ))}
              {errors.file && (
                <p className="self-center">Please provide a file</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-[100%] justify-center items-center">
          <input
            type="submit"
            className="w-[50%] h-[50px] bg-[#D9D9D9] border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
          />
        </div>
      </form>
    </div>
  );
}

export default NewVideo;
