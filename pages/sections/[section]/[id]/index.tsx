"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import sectionFetcher from "../../../../services/sectionFetcher";
import { TCategory, TSection, TVideo } from "../../../../src/types/types";
import categoryFetcher from "../../../../services/categoryFetcher";
import TableVideosStaticSection from "../../../../src/components/TableVideosStaticSection";
import videoFetcher from "../../../../services/videoFetcher";

type TVideoIds = {
  id: string;
  status: boolean;
};

export default function SectionItem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [sectionItem, setSectionItem] = useState<TSection>();
  const router = useRouter();
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingSections, setIsLoadingSections] = useState(true);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [videos, setVideos] = useState<TVideo[]>([]);
  const [videoIds, setVideoIds] = useState<TVideoIds[]>([]);

  useEffect(() => {
    if (router.query.section && router.query.id) {
      sectionFetcher
        .getSectionById(router.query.section, router.query.id)
        .then((data) => {
          setSectionItem(data);
          setIsLoadingSections(!isLoadingSections);
        });

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

  const handleTypeOfSection = (): string => {
    if (router.query.section === "static-sections" && sectionItem) {
      if (sectionItem.isHero === true) {
        return "Hero Slider";
      }
      if (sectionItem.isHero === false) {
        return "Carrousel Static";
      }
    }
    if (router.query.section === "dynamic-sections" && sectionItem) {
      if (sectionItem.isGrid === true) {
        return "Grid Dynamic";
      }
      if (sectionItem.isGrid === false) {
        return "Carrousel Dynamic";
      }
    }
    if (router.query.section === "advertisings") return "Advertising";
    return "No section type";
  };

  return (
    <div className="w-full h-full flex flex-col">
      {isLoadingCategories || isLoadingSections || isLoadingVideos ? (
        <h1>Loading...</h1>
      ) : (
        <form
          className="w-full h-4/5 flex flex-col justify-around mt-[5em]"
          onSubmit={handleSubmit((data) => {
            const { title, description, max, imageUrl, linkTo, categoryId } =
              data;
            if (router.query.section && router.query.id && sectionItem) {
              switch (router.query.section) {
                case "static-sections":
                  sectionFetcher.updateSectionById(
                    router.query.section,
                    router.query.id as string,
                    {
                      title,
                      description,
                      isHero: sectionItem.isHero,
                    }
                  );
                  videoIds.forEach((videoId) => {
                    if (videoId.status) {
                      sectionFetcher.updateSectionByIdAddVideo(
                        router.query.section as string,
                        router.query.id as string,
                        { videoId: videoId.id }
                      );
                    }
                    if (!videoId.status) {
                      sectionFetcher.updateSectionByIdRemoveVideo(
                        router.query.section as string,
                        router.query.id as string,
                        { videoId: videoId.id }
                      );
                    }
                  });
                  router.push(`/sections`);
                  break;

                case "dynamic-sections":
                  sectionFetcher.updateSectionById(
                    router.query.section,
                    router.query.id,
                    {
                      title,
                      description,
                      max: +max,
                      isGrid: sectionItem.isGrid,
                      categoryId,
                    }
                  );

                  router.push(`/sections`);
                  break;

                case "advertisings":
                  sectionFetcher.updateSectionById(
                    router.query.section,
                    router.query.id,
                    {
                      title,
                      description,
                      imageUrl,
                      linkTo,
                    }
                  );
                  router.push(`/sections`);
                  break;
                default:
                  // alert("please select a type");
                  break;
              }
            }
          })}
        >
          {sectionItem !== undefined &&
            router.query.section === "static-sections" && (
              <div className="flex flex-row w-4/5 h-full self-center">
                <div className="w-1/2 h-full border-2 border-y-black border-l-black border-r-transparent">
                  <div className="w-full h-full flex flex-col items-center">
                    <div className="w-full sticky top-0 bg-lightgrey font-bold z-10 border-b-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                      <p className="py-2 px-4 bl-lightgrey">Informations</p>
                    </div>

                    <div className="container-fields">
                      <p className="title-field">Type of section</p>
                      <p className="input-field">{handleTypeOfSection()}</p>
                    </div>

                    <div className="container-fields">
                      <label htmlFor="title" className="title-field">
                        Title
                        <input
                          className="input-field"
                          defaultValue={sectionItem.title}
                          {...register("title")}
                        />
                      </label>
                    </div>

                    <div className="container-fields mt-10">
                      <label htmlFor="description" className="title-field">
                        Description
                        <textarea
                          className="input-field h-[10em]"
                          defaultValue={sectionItem.description}
                          {...register("description")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {router.query.section === "static-sections" &&
                  (isLoadingCategories ||
                  isLoadingSections ||
                  isLoadingVideos ? (
                    <div>
                      <h1>Loading...</h1>
                    </div>
                  ) : (
                    <div className="w-1/2 h-full flex flex-col items-start overflow-auto sticky border">
                      <TableVideosStaticSection
                        videos={videos}
                        videoIds={videoIds}
                        setVideoIds={setVideoIds}
                        sectionItem={sectionItem}
                      />
                    </div>
                  ))}
              </div>
            )}
          {sectionItem !== undefined &&
            router.query.section === "dynamic-sections" && (
              <div className="flex flex-row w-4/5 h-full self-center">
                <div className="w-full h-full border-2 border-black">
                  <div className="w-full h-full flex flex-col items-center">
                    <div className="w-full sticky top-0 bg-lightgrey font-bold z-10 border-b-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                      <p className="py-2 px-4 bl-lightgrey">Informations</p>
                    </div>

                    <div className="container-fields">
                      <p className="title-field">Type of section</p>
                      <p className="input-field">{handleTypeOfSection()}</p>
                    </div>

                    <div className="container-fields">
                      <label htmlFor="title" className="title-field">
                        Title
                        <input
                          className="input-field"
                          defaultValue={sectionItem.title}
                          {...register("title")}
                        />
                      </label>
                    </div>

                    <div className="container-fields">
                      <label htmlFor="description" className="title-field">
                        Description
                        <textarea
                          className="input-field h-[6em] overflow-y-scroll resize-none"
                          defaultValue={sectionItem.description}
                          {...register("description")}
                        />
                      </label>
                    </div>

                    <div className="container-fields">
                      <label htmlFor="max" className="title-field">
                        Max videos (10 by default)
                        <input
                          className="input-field"
                          defaultValue={sectionItem.max}
                          {...register("max")}
                        />
                      </label>
                    </div>

                    <div className="container-fields">
                      <label htmlFor="category" className="title-field">
                        Please choose a category
                        <select
                          id="category"
                          defaultValue={sectionItem.categoryId}
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
                  </div>
                </div>
              </div>
            )}
          {sectionItem !== undefined &&
            router.query.section === "advertisings" && (
              <div className="flex flex-row w-4/5 h-full self-center">
                <div className="w-full h-full border-2 border-black ">
                  <div className="w-full h-full flex flex-col items-center">
                    <div className="w-full sticky top-0 bg-lightgrey font-bold z-10 border-b-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                      <p className="py-2 px-4 bl-lightgrey">Informations</p>
                    </div>

                    <div className="container-fields">
                      <p className="title-field">Type of section</p>
                      <p className="input-field">{handleTypeOfSection()}</p>
                    </div>

                    <div className="container-fields">
                      <label htmlFor="title" className="title-field">
                        Title
                        <input
                          className="input-field"
                          defaultValue={sectionItem.title}
                          {...register("title")}
                        />
                      </label>
                    </div>

                    <div className="container-fields">
                      <label htmlFor="description" className="title-field">
                        Description
                        <textarea
                          className="input-field h-[6em] overflow-y-scroll resize-none"
                          defaultValue={sectionItem.description}
                          {...register("description")}
                        />
                      </label>
                    </div>

                    <div className="container-fields">
                      <label htmlFor="linkTo" className="title-field">
                        Link to
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Please insert here the link you want the user follows"
                          defaultValue={sectionItem.linkTo}
                          {...register("linkTo")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <div className="w-2/5 flex  self-center">
            <input id="submit" type="submit" className="submit-btn w-full" />
          </div>
        </form>
      )}
    </div>
  );
}
