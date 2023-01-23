import { TPage } from "../src/types/types";
import axiosInstance from "./axiosinstance";

const pageFetcher = {
  createPage: async (data: string) => {
    try {
      await axiosInstance.post<TPage>(
        `/pages`,
        JSON.parse(JSON.stringify({ name: data }))
      );
    } catch (err) {
      console.error(err);
      throw new Error(err);
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
          });
        });
      }
      return allPages;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      console.log("getPages successful");
    }
  },

  getPageById: async (id: string) => {
    try {
      const resp = await axiosInstance.get<TPage>(`/${id}`);
      return resp.data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      console.log("getPageById successful");
    }
  },

  updatePageById: async (id: string, data: string) => {
    try {
      await axiosInstance
        .put<TPage>(`/pages/${id}`, JSON.parse(JSON.stringify({ name: data })))
        .then(() => console.log("Update successful", data));
    } catch (err) {
      console.error(err);
      throw new Error(err);
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
      throw new Error(err);
    } finally {
      console.log("deletePageById successful");
    }
  },
};

export default pageFetcher;
