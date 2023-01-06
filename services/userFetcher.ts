import { AxiosResponse } from "axios";
import { TnewUser, TUser } from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "userFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const userFetcher = {
  getUsers: () => axiosInstance.get<TUser[]>(`/users`).then(responseBody),

  getUsersById: (id: string) =>
    axiosInstance.get<TUser>(`/users/${id}`).then(responseBody),

  deleteUserById: (id: string) =>
    axiosInstance
      .delete<TUser>(`/users/${id}`)
      .then(() => console.log("Delete successful")),

  createUser: (data: TnewUser) =>
    axiosInstance.post<TnewUser>(`/auth/signup`, data),

  updateUser: (id: string, data: TnewUser) =>
    axiosInstance.put<TnewUser>(`/users/${id}`, data),
};

export default userFetcher;
