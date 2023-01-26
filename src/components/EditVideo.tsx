import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { TVideo, TCategory } from "../types/types";
import categoryFetcher from "../../services/categoryFetcher";
import videoFetcher from "../../services/videoFetcher";

interface IProps {
  video: TVideo;
}

function EditVideo({ video }: IProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<TCategory[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation(
    (data: FieldValues) =>
      videoFetcher.updateVideo(video.id, {
        title: data.title,
        description: data.description,
        display: data.display,
        isPublic: data.isPublic,
        categoryId: data.categoryId,
      }),
    {
      onSuccess: () => {
        router.push("/videos");
      },
    }
  );

  useEffect(() => {
    categoryFetcher.getCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    setValue("categoryId", video.categoryId);
    setValue("isPublic", video.isPublic);
    setValue("display", video.display);
  }, []);

  const onSubmit = (data: FieldValues) => {
    mutate(data);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <form
        className="w-full h-4/5 flex flex-col justify-around mt-[5em]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row w-4/5 h-full self-center">
          <div className="w-full h-full border-2 border-black ">
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-full sticky top-0 bg-lightgrey font-bold z-10 border-b-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                <p className="py-1 px-4 bl-lightgrey">Informations</p>
              </div>

              <div className="container-fields">
                <label htmlFor="title" className="title-field">
                  Title
                  <input
                    className="input-field"
                    id="title"
                    type="text"
                    defaultValue={video.title}
                    {...register("title", { required: "Title is required..." })}
                  />
                </label>
              </div>
              <div className="container-fields">
                <label htmlFor="description" className="title-field">
                  Description
                  <textarea
                    className="input-field overflow-y-auto overflow-x-hidden text-left text-top h-40"
                    id="description"
                    defaultValue={video.description}
                    {...register("description", {
                      required: "Description is required...",
                    })}
                  />
                </label>
              </div>
              <div className="container-fields">
                <label htmlFor="categoryId" className="title-field">
                  Category
                  <select
                    className="input-field bg-white"
                    id="categoryId"
                    {...register("categoryId")}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="container-fields">
                <label htmlFor="isPublic" className="title-field">
                  Is public ?
                  <input
                    className="mx-2"
                    id="isPublic"
                    type="checkbox"
                    {...register("isPublic")}
                  />
                </label>
              </div>
              <div className="container-fields">
                <label htmlFor="display" className="title-field">
                  Is displayed ?
                  <input
                    className="mx-2"
                    id="display"
                    type="checkbox"
                    {...register("display")}
                  />
                </label>
              </div>
              <div className="container-fields">
                <Image
                  src={video.teaserUrl}
                  alt="thumbnail"
                  width="300"
                  height="300"
                />
              </div>
              <div className="flex flex-col my-[2em] w-[100%] justify-center items-center">
                <button
                  className="w-[50%] h-[50px] bg-[#D9D9D9] border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditVideo;
