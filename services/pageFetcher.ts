import { TPage, TNewPage } from "../src/types/types";
import axiosInstance from "./axiosinstance";

interface PageFetcher {
  createPage: (data: TNewPage) => Promise<void>;
  getPages: () => Promise<TPage[]>;
  getPageById: (id: string) => Promise<TPage | null>;
  updatePageById: (id: string, data: TNewPage) => Promise<void>;
  deletePageById: (id: string) => Promise<void>;
}

const pageFetcher: PageFetcher = {
  createPage: async (data: TNewPage) => {
    try {
      await axiosInstance.post<TPage>(`/pages/new-with-sections`, data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("createPage successful");
    }
  },

  getPages: async () => {
    try {
      const allPages: TPage[] | null = [];
      const resp = await axiosInstance.get(`/pages`);
      if (resp.data !== null) {
        resp.data.forEach((element: TPage) => {
          allPages.push({
            id: element.id,
            title: element.title,
            display: element.display,
          });
        });
      }
      return allPages;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getPages successful");
    }
  },

  getPageById: async (id: string) => {
    try {
      const resp = await axiosInstance.get<TPage>(`/pages/${id}`);
      return resp.data;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getPageById successful");
    }
  },

  updatePageById: async (id: string, data: TNewPage) => {
    try {
      await axiosInstance
        .put<TPage>(`/pages/${id}`, data)
        .then(() => console.log("Update successful", data));
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("updatePageById successful");
    }
  },

  deletePageById: async (id: string) => {
    try {
      await axiosInstance
        .delete<TPage>(`/pages/${id}`)
        .then(() => console.log("Delete successful"));
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("deletePageById successful");
    }
  },
};

export default pageFetcher;
