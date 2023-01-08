import { AxiosResponse } from "axios";
import {
  TSectionDynamic,
  TSectionStatic,
  TAdvertsing,
  TCategory,
  TNewVideo,
  TVideo,
} from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "categoryFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const categoryFetcher = {
  getCategories: async () => {
    try {
      const allCategories: TCategory[] | null = [];
      let resp = await axiosInstance.get(`/advertisings`);
      if (resp.data !== null) {
        resp.data.forEach((element: TAdvertsing) => {
          allCategories.push({
            id: element.id,
            title: element.title,
            description: element.description,
            category: "advertisings",
          });
        });
        resp = await axiosInstance.get(`/dynamic-sections`);
        resp.data.forEach((element: TSectionDynamic) => {
          allCategories.push({
            id: element.id,
            title: element.title,
            description: element.description,
            category: "dynamic-sections",
            isGrid: element.isGrid,
          });
        });
        resp = await axiosInstance.get(`/static-sections`);
        resp.data.forEach((element: TSectionStatic) => {
          allCategories.push({
            id: element.id,
            title: element.title,
            description: element.description,
            category: "static-sections",
            isHero: element.isHero,
          });
        });
      }
      return allCategories;
    } catch (err) {
      console.error(err);
    }
  },
  getCategoryById: async (id: string) => {
    try {
      const resp = await axiosInstance.get(`/categories/${id}`);
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  },

  updateCategory: async (id: string, data: TNewVideo) =>
    axiosInstance.put<TNewVideo>(`/categories/${id}`, data),

  deleteCategoryById: async (id: string) =>
    axiosInstance
      .delete<TVideo>(`/categories/${id}`)
      .then(() => console.log("Delete successful")),
};

export default categoryFetcher;
