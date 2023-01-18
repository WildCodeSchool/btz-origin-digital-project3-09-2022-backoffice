import { TCategory } from "../src/types/types";
import axiosInstance from "./axiosinstance";

const categoryFetcher = {
  createCategory: async (data: string) => {
    try {
      await axiosInstance.post<TCategory>(
        `/categories`,
        JSON.parse(JSON.stringify({ name: data }))
      );
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      console.log("createCategory successful");
    }
  },

  getCategories: async () => {
    try {
      const allCategories: TCategory[] | null = [];
      const resp = await axiosInstance.get(`/categories`);
      if (resp.data !== null) {
        resp.data.forEach((element: TCategory) => {
          allCategories.push({
            id: element.id,
            name: element.name,
          });
        });
      }
      return allCategories;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      console.log("getCategories successful");
    }
  },

  getCategoryById: async (id: string) => {
    try {
      const resp = await axiosInstance.get<TCategory>(`/${id}`);
      return resp.data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      console.log("getCategoryById successful");
    }
  },

  updateCategoryById: async (id: string, data: string) => {
    try {
      await axiosInstance
        .put<TCategory>(
          `/categories/${id}`,
          JSON.parse(JSON.stringify({ name: data }))
        )
        .then(() => console.log("Update successful", data));
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      console.log("updateCategoryById successful");
    }
  },

  deleteCategoryById: async (id: string) => {
    try {
      await axiosInstance
        .delete<TCategory>(`/categories/${id}`)
        .then(() => console.log("Delete successful"));
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      console.log("deleteCategoryById successful");
    }
  },
};

export default categoryFetcher;
