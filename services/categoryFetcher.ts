import { TCategory } from "../src/types/types";
import axiosInstance from "./axiosinstance";

const categoryFetcher = {
  createCategory: async (data: string) => {
    await axiosInstance
      .post<TCategory>(
        `/categories`,
        JSON.parse(JSON.stringify({ name: data }))
      )
      .then(() => console.log("Create successful"));
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
    }
  },

  getCategoryById: async (id: string) => {
    try {
      const resp = await axiosInstance.get<TCategory>(`/${id}`);
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  },

  updateCategoryById: async (id: string, data: string) => {
    await axiosInstance
      .put<TCategory>(
        `/categories/${id}`,
        JSON.parse(JSON.stringify({ name: data }))
      )
      .then(() => console.log("Update successful", data));
  },

  deleteCategoryById: async (id: string) =>
    axiosInstance
      .delete<TCategory>(`/categories/${id}`)
      .then(() => console.log("Delete successful")),
};

export default categoryFetcher;
