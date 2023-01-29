import { AxiosResponse } from "axios";
import { TNewUser, TUser } from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "userFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const userFetcher = {
  createUser: async (data: TNewUser) => {
    try {
      const resp = await axiosInstance.post<TNewUser>(`/auth/signup`, data);
      return resp.data;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("createUser successful");
    }
  },

  getUsers: async () => {
    try {
      const resp = await axiosInstance
        .get<TUser[]>(`/users`)
        .then(responseBody);
      return resp;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getUsers successful");
    }
  },

  getUserById: async (id: string) => {
    try {
      await axiosInstance.get<TUser[]>(`/users/${id}`);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getUserById successful");
    }
  },

  updateUser: async (id: string, data: TNewUser) => {
    try {
      await axiosInstance.put<TNewUser>(`/users/${id}`, data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("updateUser successful", data);
    }
  },

  deleteUserById: async (id: string) => {
    try {
      await axiosInstance
        .delete<TUser>(`/users/${id}`)
        .then(() => console.log("Delete successful"));
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("deleteUserById successful");
    }
  },
};

export default userFetcher;
