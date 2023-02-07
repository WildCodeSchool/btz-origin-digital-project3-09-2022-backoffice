import { AxiosResponse } from "axios";
import { TNewVideo, TVideo } from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "videoFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const videoFetcher = {
  createVideo: async (data: TNewVideo) => {
    try {
      await axiosInstance.post<TNewVideo>(`/videos`, data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("createVideo successful");
    }
  },

  getVideos: async (): Promise<TVideo[]> => {
    try {
      const resp = await axiosInstance
        .get<TVideo[]>(`/videos`)
        .then(responseBody);
      return resp;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getVideos successful");
    }
  },

  getVideoById: async (id: string) => {
    try {
      const resp = await axiosInstance.get<TVideo[]>(`/videos/${id}`);
      return resp.data;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getVideoById successful");
    }
  },

  updateVideo: async (id: string, data: Partial<TNewVideo>) => {
    try {
      await axiosInstance.put<TVideo>(`/videos/${id}`, data);
      console.log(data, "id", id);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("updateVideo successful", data);
    }
  },

  deleteVideoById: async (id: string) => {
    try {
      await axiosInstance
        .delete<TVideo>(`/videos/${id}`)
        .then(() => console.log("Delete successful"));
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("deleteVideoById successful");
    }
  },
};

export default videoFetcher;
