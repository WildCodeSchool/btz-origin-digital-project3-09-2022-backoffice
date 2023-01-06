import { AxiosResponse } from "axios";
import { TNewUser, TUser } from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "userFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const userFetcher = {
  createUser: async (data: TNewUser) =>
    axiosInstance.post<TNewUser>(`/auth/signup`, data),

  getUsers: async () => axiosInstance.get<TUser[]>(`/users`).then(responseBody),

  getUserById: async (id: string) => {
    try {
      const resp = await axiosInstance.get<TUser[]>(`/users/${id}`);
      console.log("resp.data in function:", resp.data);
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  },

  updateUser: async (id: string, data: TNewUser) =>
    axiosInstance.put<TNewUser>(`/users/${id}`, data),

  deleteUserById: async (id: string) =>
    axiosInstance
      .delete<TUser>(`/users/${id}`)
      .then(() => console.log("Delete successful")),
};

export default userFetcher;
