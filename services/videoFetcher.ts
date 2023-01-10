import { AxiosResponse } from "axios";
import { TNewVideo, TVideo } from "../src/types/types";
import axiosInstance from "./axiosinstance";

// Creation of the "videoFetcher" object which contains the different API call methods
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const videoFetcher = {
  createVideo: async (data: TNewVideo) =>
    axiosInstance.post<TNewVideo>(`/videos`, data),

  getVideos: async () =>
    axiosInstance.get<TVideo[]>(`/videos`).then(responseBody),

  getVideoById: async (id: string) => {
    try {
      const resp = await axiosInstance.get<TVideo[]>(`/videos/${id}`);
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  },

  updateVideo: async (id: string, data: TNewVideo) =>
    axiosInstance.put<TNewVideo>(`/videos/${id}`, data),

  deleteVideoById: async (id: string) =>
    axiosInstance
      .delete<TVideo>(`/videos/${id}`)
      .then(() => console.log("Delete successful")),
};

export default videoFetcher;
