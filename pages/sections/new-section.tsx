import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import sectionsTypes from "../../src/types/sectionsTypes";
import sectionFetcher from "../../services/sectionFetcher";
import { TCategory } from "../../src/types/types";
import categoryFetcher from "../../services/categoryFetcher";

function NewSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [typeOfSection, setTypeOfSection] = useState<string>("");
  const [nameOfSection, setNameOfSection] = useState<string>("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const router = useRouter();
  const [testLocalStorage, setTestLocalStorage] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      categoryFetcher.getCategories().then((data) => setCategories(data));
    }
    if (localStorage.getItem("section")) {
      setTypeOfSection(localStorage.getItem("section") as string);
      setNameOfSection(localStorage.getItem("sectionName") as string);
      setTestLocalStorage(true);
    }
  }, []);

  const handleChange = (e: FieldValues) => {
    setTypeOfSection(e.target.value.split("/")[0]);
    setNameOfSection(e.target.value.split("/")[1]);
  };

  const handleData = (data: FieldValues) => {
    const formData = new FormData();

    switch (typeOfSection) {
      case "static-sections":
        sectionFetcher.createSection(typeOfSection, {
          title: data.title,
          description: data.description,
          max: +data.max,
          isHero: nameOfSection === "Hero Slider",
        });
        router.push(`/sections`);
        break;

      case "dynamic-sections":
        sectionFetcher.createSection(typeOfSection, {
          title: data.title,
          description: data.description,
          max: +data.max,
          isGrid: nameOfSection === "Grid Dynamic",
          categoryId: data.categoryId,
        });
        router.push(`/sections`);
        break;

      case "advertisings":
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("linkTo", data.linkTo);
        formData.append("file", data.file[0]);
        axios.post("http://localhost:4000/api/v1/advertisings", formData);
        router.push(`/sections`);
        break;
      default:
        // alert("please select a type");
        break;
    }

    reset();
  };

  return (
    <div className="w-full h-full flex">
      <form
        className="w-full h-full flex flex-col items-center"
        onSubmit={handleSubmit((data) => handleData(data))}
      >
        <div className="flex flex-col mt-[1.5em] w-[100%] justify-center items-center">
          <label htmlFor="type" className="w-[80%] text-[20px] font-bold">
            Type of section
            {testLocalStorage ? (
              <select
                id="type"
                placeholder="Please choose a type of section"
                className="w-[100%] py-3 px-4 flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
                {...register("type", { required: true })}
                onChange={(e) => handleChange(e)}
                value={`${localStorage.getItem(
                  "section"
                )}/${localStorage.getItem("sectionName")}`}
              >
                <option
                  value={`${localStorage.getItem(
                    "section"
                  )}/${localStorage.getItem("sectionName")}`}
                >
                  {localStorage.getItem("sectionName")}
                </option>
              </select>
            ) : (
              <select
                id="type"
                placeholder="Please choose a type of section"
                className="w-[100%] py-3 px-4 flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
                {...register("type", { required: true })}
                onChange={(e) => handleChange(e)}
              >
                <option value="default">Please choose a type of section</option>
                {sectionsTypes.map((section) => (
                  <option
                    key={section.id}
                    value={`${section.section}/${section.name}`}
                  >
                    {section.name}
                  </option>
                ))}
              </select>
            )}
            {errors.category && (
              <p className="font-normal text-[#FF0000]">
                Type of section is required.
              </p>
            )}
          </label>
        </div>

        <div className="flex flex-col mt-[1.5em] w-[100%] justify-center items-center">
          <label
            htmlFor="title"
            className="flex flex-col w-[80%] text-[20px] font-bold"
          >
            Title
            <input
              type="text"
              className="py-3 px-4 border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
              {...register("title")}
            />
          </label>
        </div>

        <div className="flex flex-col mt-[1.5em] w-[100%] justify-center items-center">
          <label
            htmlFor="description"
            className="flex flex-col w-[80%] text-[20px] font-bold"
          >
            Description
            <textarea
              className="h-[10em] input-field overflow-y-auto overflow-x-hidden text-left text-top"
              {...register("description")}
            />
          </label>
        </div>

        {((typeof window !== "undefined" &&
          localStorage.getItem("section") === "dynamic-sections") ||
          typeOfSection === "dynamic-sections") && (
          <div className="flex flex-col mt-[1.5em] w-[100%] justify-center items-center">
            <label
              htmlFor="max"
              className="flex flex-col w-[80%] text-[20px] font-bold"
            >
              Max videos (10 by default)
              <input
                type="number"
                className="py-3 px-4 border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] font-normal"
                {...register("max")}
              />
            </label>
          </div>
        )}

        {((typeof window !== "undefined" &&
          localStorage.getItem("section") === "dynamic-sections") ||
          typeOfSection === "dynamic-sections") && (
          <div className="flex flex-col w-[80%] mt-[1.5em] text-[20px] font-bold">
            <label htmlFor="category" className="w-full text-[20px] font-bold">
              Please choose a category
              <select
                id="category"
                placeholder="Please choose a category"
                className="w-[100%] py-3 px-4 flex flex-col font-normal bg-white border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
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

        {((typeof window !== "undefined" &&
          localStorage.getItem("section") === "advertisings") ||
          typeOfSection === "advertisings") && (
          <div className="flex flex-col mt-[1.5em] w-[100%] justify-center items-center">
            <p className="flex flex-col w-[80%] text-[20px] font-bold">
              File to upload
            </p>
            <input
              className=" w-[80%] py-3 px-4 border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] font-normal"
              type="file"
              {...register("file", { required: true })}
            />
            <label
              htmlFor="linkTo"
              className="flex flex-col w-[80%] mt-[1.5em] text-[20px] font-bold"
            >
              Link to
              <input
                type="text"
                placeholder="Please insert here the link you want the user follows"
                className="py-3 px-4 border border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] font-normal"
                {...register("linkTo")}
              />
            </label>
          </div>
        )}

        <div className="flex flex-col my-[2em] w-[100%] justify-center items-center">
          <button
            id="submit"
            type="button"
            onClick={handleSubmit(handleData)}
            className="w-[50%] h-[50px] bg-[#D9D9D9] border-solid border-black border-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewSection;
