import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import sectionFetcher from "../../../../services/sectionFetcher";
import {
  TAdvertsing,
  TSectionDynamic,
  TSectionStatic,
} from "../../../../src/types/types";
import categoryFetcher from "../../../../services/categoryFetcher";

export default function SectionItem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [sectionItem, setSectionItem] = useState<
    TAdvertsing[] | TSectionDynamic[] | TSectionStatic[]
  >([]);
  const router = useRouter();
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingSections, setIsLoadingSections] = useState(true);
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (router.query.section && router.query.id) {
      sectionFetcher
        .getSectionById(router.query.section, router.query.id)
        .then((response) => {
          setSectionItem(response);
          setIsLoadingSections(!isLoadingSections);
        });

      categoryFetcher.getCategories().then((data) => {
        setCategories(data);
        setIsLoadingCategories(!isLoadingCategories);
      });
    }
  }, [router.query.section, router.query.id]);

  const handleTypeOfSection = (): string => {
    if (
      router.query.section === "static-sections" &&
      sectionItem.isHero === true
    ) {
      return "Hero Slider";
    }
    if (
      router.query.section === "static-sections" &&
      sectionItem.isHero === false
    ) {
      return "Carrousel Static";
    }
    if (
      router.query.section === "dynamic-sections" &&
      sectionItem.isGrid === true
    ) {
      return "Grid Dynamic";
    }
    if (
      router.query.section === "dynamic-sections" &&
      sectionItem.isGrid === false
    ) {
      return "Carrousel Dynamic";
    }
    if (router.query.section === "advertisings") return "Advertising";
    return "No section type";
  };

  return (
    <div className="w-full h-full flex">
      {isLoadingCategories && isLoadingSections ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="w-1/2 h-full flex">
          <form
            className="w-full h-full flex flex-col items-center"
            onSubmit={handleSubmit((data) => {
              const { title, description, max, imageUrl, linkTo, categoryId } =
                data;

              switch (router.query.section) {
                case "static-sections":
                  sectionFetcher.updateSectionById(
                    router.query.section,
                    router.query.id,
                    {
                      title,
                      description,
                      max: +max,
                      isHero: sectionItem.isHero,
                    }
                  );
                  router.push(`/sections/${router.query.section}`);
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
                  router.push(`/sections/${router.query.section}`);
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
                  router.push(`/sections/${router.query.section}`);
                  break;
                default:
                  // alert("please select a type");
                  break;
              }
            })}
          >
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
                  className="input-field h-[10em]"
                  defaultValue={sectionItem.description}
                  {...register("description")}
                />
              </label>
            </div>

            {router.query.section === "dynamic-sections" && (
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
            )}

            {router.query.section === "dynamic-sections" && (
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
            )}

            {router.query.section === "advertisings" && (
              <div className="container">
                <label htmlFor="imageUrl" className="title-field">
                  Image to upload
                  <input
                    defaultValue={sectionItem.imageUrl}
                    type="file"
                    {...register("imageUrl")}
                  />
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
                    defaultValue={sectionItem.linkTo}
                    {...register("linkTo")}
                  />
                </label>
              </div>
            )}

            <div className="flex flex-col my-[2em] w-[100%] justify-center items-center">
              <input id="submit" type="submit" className="submit-btn" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
