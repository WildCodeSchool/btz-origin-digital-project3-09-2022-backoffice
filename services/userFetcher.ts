import { AxiosResponse } from "axios";
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
  // post: <T>(url: string, body: {}) =>
  //   axios.post<T>(url, body).then(responseBody),
};

export default userFetcher;
