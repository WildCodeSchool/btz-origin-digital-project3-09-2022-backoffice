"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import sectionFetcher from "../../../services/sectionFetcher";
import { TCategory, TVideo, TVideoIds } from "../../../src/types/types";
import categoryFetcher from "../../../services/categoryFetcher";
import TableVideosStaticSection from "../../../src/components/TableVideosStaticSection";
import videoFetcher from "../../../services/videoFetcher";

export default function SectionItem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [videos, setVideos] = useState<TVideo[]>([]);
  const [videoIds, setVideoIds] = useState<TVideoIds[]>([]);

  useEffect(() => {
    if (router.query.section) {
      categoryFetcher.getCategories().then((data) => {
        setCategories(data);
        setIsLoadingCategories(!isLoadingCategories);
      });

      videoFetcher.getVideos().then((data) => {
        setVideos(data);
        setIsLoadingVideos(!isLoadingVideos);
      });
    }
  }, [router.query.section, router.query.id]);

  return (
    <div className="w-full h-full flex flex-col">
      {isLoadingCategories || isLoadingVideos ? (
        <h1>Loading...</h1>
      ) : (
        <form
          className="w-full h-4/5 flex flex-col justify-around mt-[5em]"
          onSubmit={handleSubmit((data) => {
            const { title, description } = data;

            sectionFetcher
              .createSectionWithVideos(router.query.section as string, {
                title,
                description,
                isHero: true,
                videoIds,
              })
              .then(() => {
                router.push("/sections");
              })
              .catch((error) => {
                console.log(error);
              });
          })}
        >
          <div className="flex flex-row w-4/5 h-full self-center">
            <div className="w-1/2 h-full border-2 border-y-black border-l-black border-r-transparent">
              <div
                className={
                  router.query.section === "static-sections"
                    ? "w-full h-full flex flex-col items-center"
                    : "w-full h-full flex flex-col items-center"
                }
              >
                <div className="w-full sticky top-0 bg-lightgrey font-bold z-10 border-b-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                  <p className="py-2 px-4 bl-lightgrey">Informations</p>
                </div>

                <div className="container-fields">
                  <p className="title-field">Type of section</p>
                  <p className="input-field">
                    {localStorage.getItem("sectionName")}
                  </p>
                </div>

                <div className="container-fields">
                  <label htmlFor="title" className="title-field">
                    Title
                    <input className="input-field" {...register("title")} />
                  </label>
                </div>

                <div className="container-fields mt-10">
                  <label htmlFor="description" className="title-field">
                    Description
                    <textarea
                      className="input-field h-[10em]"
                      {...register("description")}
                    />
                  </label>
                </div>

                {router.query.section === "dynamic-sections" && (
                  <div className="container-fields">
                    <label htmlFor="max" className="title-field">
                      Max videos (10 by default)
                      <input className="input-field" {...register("max")} />
                    </label>
                  </div>
                )}

                {router.query.section === "dynamic-sections" && (
                  <div className="container-fields">
                    <label htmlFor="category" className="title-field">
                      Please choose a category
                      <select
                        id="category"
                        placeholder="Please choose a category"
                        className="input-field bg-white"
                        {...register("categoryId", { required: true })}
                      >
                        <option>...</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
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
                )}

                {router.query.section === "advertisings" && (
                  <div className="container">
                    <label htmlFor="imageUrl" className="title-field">
                      Image to upload
                      <input type="file" {...register("imageUrl")} />
                    </label>
                  </div>
                )}

                {router.query.section === "advertisings" && (
                  <div className="container">
                    <label htmlFor="linkTo" className="title-field">
                      Link to
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Please insert here the link you want the user follows"
                        {...register("linkTo")}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {isLoadingCategories || isLoadingVideos ? (
              <div>
                <h1>Loading...</h1>
              </div>
            ) : (
              <div className="w-1/2 h-full flex flex-col items-start overflow-auto sticky border">
                <TableVideosStaticSection
                  videos={videos}
                  videoIds={videoIds}
                  setVideoIds={setVideoIds}
                  sectionItems={undefined}
                />
              </div>
            )}
          </div>
          <div className="w-2/5 flex  self-center">
            <input id="submit" type="submit" className="submit-btn w-full" />
          </div>
        </form>
      )}
    </div>
  );
}
