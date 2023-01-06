import { AxiosResponse } from "axios";
import { TnewUser, TUser } from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "userFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const userFetcher = {
  getUsers: async () => axiosInstance.get<TUser[]>(`/users`).then(responseBody),

  getUsersById: async (id: string) => {
    try {
      const resp = await axiosInstance.get<TUser[]>(`/users/${id}`);
      console.log("resp.data in function:", resp.data);
      return resp.data;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  },

  deleteUserById: async (id: string) =>
    axiosInstance
      .delete<TUser>(`/users/${id}`)
      .then(() => console.log("Delete successful")),

  createUser: async (data: TnewUser) =>
    axiosInstance.post<TnewUser>(`/auth/signup`, data),

  updateUser: async (id: string, data: TnewUser) =>
    axiosInstance.put<TnewUser>(`/users/${id}`, data),
};

export default userFetcher;
