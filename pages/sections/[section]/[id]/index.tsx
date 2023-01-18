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
  const [typeOfSection, setTypeOfSection] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (router.query.section && router.query.id) {
      sectionFetcher
        .getSectionById(router.query.section, router.query.id)
        .then((response) => {
          setSectionItem(response);
          setIsLoadingSections(!isLoadingSections);
          console.log(response);
        });

      categoryFetcher.getCategories().then((data) => {
        setCategories(data);
        setIsLoadingCategories(!isLoadingCategories);
        console.log(data);
      });
    }
  }, [router.query.section, router.query.id]);

  return (
    <div className="w-full h-full flex">
      {isLoadingCategories && isLoadingSections ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="w-full h-full flex">
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
            <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
              <p className="w-[80%] text-[20px] font-bold">Type of section</p>
              <p className="w-[80%] text-[20px] font-bold bg-white">
                {typeOfSection}
              </p>
            </div>

            <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
              <label
                htmlFor="title"
                className="flex flex-col w-[80%] text-[20px] font-bold"
              >
                Title
                <input
                  defaultValue={sectionItem.title}
                  {...register("title")}
                />
              </label>
            </div>

            <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
              <label
                htmlFor="description"
                className="flex flex-col w-[80%] text-[20px] font-bold"
              >
                Description
                <input
                  className="h-[10em]"
                  defaultValue={sectionItem.description}
                  {...register("description")}
                />
              </label>
            </div>

            {router.query.section === "dynamic-sections" && (
              <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
                <label
                  htmlFor="max"
                  className="flex flex-col w-[80%] text-[20px] font-bold"
                >
                  Max videos (10 by default)
                  <input defaultValue={sectionItem.max} {...register("max")} />
                </label>
              </div>
            )}

            {router.query.section === "dynamic-sections" && (
              <div className="flex flex-col w-[80%] mt-[2em] text-[20px] font-bold">
                <label
                  htmlFor="category"
                  className="w-[80%] text-[20px] font-bold"
                >
                  Please choose a category
                  <select
                    id="category"
                    defaultValue={sectionItem.categoryId}
                    placeholder="Please choose a category"
                    className="w-[100%] h-[50px] flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
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
              <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
                <label
                  htmlFor="imageUrl"
                  className="flex flex-col w-[80%] text-[20px] font-bold"
                >
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
              <div className="flex flex-col mt-[2em] w-[100%] justify-center items-center">
                <label
                  htmlFor="linkTo"
                  className="flex flex-col w-[80%] text-[20px] font-bold"
                >
                  Link to
                  <input
                    type="text"
                    placeholder="Please insert here the link you want the user follows"
                    defaultValue={sectionItem.linkTo}
                    {...register("linkTo")}
                  />
                </label>
              </div>
            )}

            <div className="flex flex-col my-[2em] w-[100%] justify-center items-center">
              <input
                id="submit"
                type="submit"
                className="w-[50%] h-[50px] bg-[#D9D9D9] border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
