import { AxiosResponse } from "axios";
import {
  TSectionDynamic,
  TSectionStatic,
  TAdvertsing,
  TSection,
} from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "categoryFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sectionFetcher = {
  createSection: async (type: string | string[], data: any) => {
    try {
      await axiosInstance
        .post(`/${type}`, data)
        .then(() => console.log("Create successful"));
    } catch (err) {
      console.error(err);
    }
  },

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

  getSectionContent: async (type: string | string[]) => {
    try {
      const sectionContent: TSection[] | null = [];
      const resp = await axiosInstance.get(`/${type}`);
      if (resp.data !== null) {
        resp.data.forEach((element: TSection) => {
          sectionContent.push({
            id: element.id,
            title: element.title,
            description: element.description,
            section: type as string,
            isGrid: element.isGrid,
            isHero: element.isHero,
          });
        });
      }
      return sectionContent;
    } catch (err) {
      console.error(err);
    }
  },

  getSectionById: async (type: string | string[], id: string | string[]) => {
    try {
      const resp = await axiosInstance.get<
        TAdvertsing | TSectionDynamic | TSectionStatic
      >(`/${type}/${id}`);
      console.log("Fetch on ==> ", `/${type}/${id}`);

      return resp.data;
    } catch (err) {
      console.error(err);
    }
  },

  deleteSectionById: async (type: string | string[], id: string | string[]) =>
    axiosInstance
      .delete<TAdvertsing | TSectionDynamic | TSectionStatic>(`/${type}/${id}`)
      .then(() => console.log("Delete successful")),
};

export default sectionFetcher;
