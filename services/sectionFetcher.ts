import { AxiosResponse } from "axios";
import {
  TSectionDynamic,
  TSectionStatic,
  TAdvertsing,
  TSection,
  TNewVideo,
  TVideo,
} from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "categoryFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const categoryFetcher = {
  getSections: async () => {
    try {
      const allSections: TSection[] | null = [];
      let resp = await axiosInstance.get(`/advertisings`);
      if (resp.data !== null) {
        resp.data.forEach((element: TAdvertsing) => {
          allSections.push({
            id: element.id,
            title: element.title,
            description: element.description,
            section: "advertisings",
          });
        });
        resp = await axiosInstance.get(`/dynamic-sections`);
        resp.data.forEach((element: TSectionDynamic) => {
          allSections.push({
            id: element.id,
            title: element.title,
            description: element.description,
            section: "dynamic-sections",
            isGrid: element.isGrid,
          });
        });
        resp = await axiosInstance.get(`/static-sections`);
        resp.data.forEach((element: TSectionStatic) => {
          allSections.push({
            id: element.id,
            title: element.title,
            description: element.description,
            section: "static-sections",
            isHero: element.isHero,
          });
        });
      }
      return allSections;
    } catch (err) {
      console.error(err);
    }
  },
  getSectionById: async (type: string | string[], id: string | string[]) => {
    try {
      const resp = await axiosInstance.get(`/${type}/${id}`);
      console.log(resp.data);

      return resp.data;
    } catch (err) {
      console.error(err);
    }
  },

  updateSection: async (id: string, data: TNewVideo) =>
    axiosInstance.put<TNewVideo>(`/sections/${id}`, data),

  deleteSectionById: async (id: string) =>
    axiosInstance
      .delete<TVideo>(`/sections/${id}`)
      .then(() => console.log("Delete successful")),
};

export default categoryFetcher;
