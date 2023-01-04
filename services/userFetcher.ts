import { AxiosResponse } from "axios";
import { TnewUser } from "../src/types/types";
import { IUser } from "../src/interfaces/interfaces";
import axiosInstance from "./axiosinstance";

// Creation of the "userFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const userFetcher = {
  getUsers: () => axiosInstance.get<IUser[]>(`/users`).then(responseBody),

  deleteUserById: (id: string) =>
    axiosInstance
      .delete<IUser>(`/users/${id}`)
      .then(() => console.log("Delete successful")),

  createUser: (data: TnewUser) =>
    axiosInstance.post<TnewUser>(`/auth/signup`, data),
};

export default userFetcher;
