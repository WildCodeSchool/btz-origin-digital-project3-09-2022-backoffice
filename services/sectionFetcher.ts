import axiosInstance from "./axiosinstance";
import {
  TSection,
  TAdvertsing,
  TSectionDynamic,
  TSectionStatic,
} from "../src/types/types";

const sectionFetcher = {
  createSection: async (type: string | string[], data: Partial<TSection>) => {
    try {
      await axiosInstance.post(`/${type}`, data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("createSection successful");
    }
  },

  createSectionWithVideos: async (
    type: string | string[],
    data: Partial<TSection>
  ) => {
    try {
      await axiosInstance.post(`/${type}/new-with-videos`, data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("createSectionWithVideos successful");
    }
  },

  getSections: async () => {
    try {
      const allSections: TSection[] | null = [];
      let resp = await axiosInstance.get(`/advertisings`);
      if (resp.data !== null) {
        resp.data.forEach((element: TAdvertsing) => {
          allSections.push({
            id: element.id,
            title: element.title,
            description: element.description,
            section: "advertisings",
          });
        });
        resp = await axiosInstance.get(`/dynamic-sections`);
        resp.data.forEach((element: TSectionDynamic) => {
          allSections.push({
            id: element.id,
            title: element.title,
            description: element.description,
            section: "dynamic-sections",
            isGrid: element.isGrid,
          });
        });
        resp = await axiosInstance.get(`/static-sections`);
        resp.data.forEach((element: TSectionStatic) => {
          allSections.push({
            id: element.id,
            title: element.title,
            description: element.description,
            section: "static-sections",
            isHero: element.isHero,
          });
        });
      }
      return allSections;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getSections successful");
    }
  },

  getSectionContent: async (type: string | string[]) => {
    try {
      const sectionContent: TSection[] | null = [];
      const resp = await axiosInstance.get(`/${type}`);
      if (resp.data !== null) {
        resp.data.forEach((element: TSection) => {
          sectionContent.push({
            id: element.id,
            title: element.title,
            description: element.description,
            section: type as string,
            isGrid: element.isGrid,
            isHero: element.isHero,
          });
        });
      }
      return sectionContent;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getSectionContent successful");
    }
  },

  getSectionById: async (type: string | string[], id: string | string[]) => {
    try {
      const resp = await axiosInstance.get<
        TAdvertsing | TSectionDynamic | TSectionStatic
      >(`/${type}/${id}`);
      return resp.data;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getSectionById successful");
    }
  },

  getSectionByTypeAndStatus: async (
    type: string | string[],
    status: boolean
  ) => {
    try {
      const sectionByTitle: TSection[] | null = [];
      const resp = await axiosInstance.get(`/${type}`);
      if (resp.data !== null) {
        switch (type) {
          case "advertisings":
            return resp.data;
          case "dynamic-sections":
            resp.data.forEach((element: TSectionDynamic) => {
              if (element.isGrid === status) {
                sectionByTitle.push({
                  id: element.id,
                  title: element.title,
                  description: element.description,
                  section: "dynamic-sections",
                  isGrid: element.isGrid,
                });
              }
            });
            break;
          case "static-sections":
            resp.data.forEach((element: TSectionStatic) => {
              if (element.isHero === status) {
                sectionByTitle.push({
                  id: element.id,
                  title: element.title,
                  description: element.description,
                  section: "static-sections",
                  isHero: element.isHero,
                });
              }
            });
            break;
          default:
            return null;
        }
      }

      return sectionByTitle;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("getSectionByTitle successful");
    }
  },

  updateSectionById: async (
    type: string | string[],
    id: string | string[],
    data: any
  ) => {
    try {
      await axiosInstance.put(`/${type}/${id}`, data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("updateSectionById successful");
    }
  },

  updateSectionByIdAddVideo: async (
    type: string,
    id: string,
    data: { videoId: string }
  ) => {
    try {
      await axiosInstance.put(`/${type}/${id}/add-video`, data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("updateSectionByIdAddVideo successful");
    }
  },

  updateSectionByIdRemoveVideo: async (
    type: string,
    id: string,
    data: { videoId: string }
  ) => {
    try {
      await axiosInstance.put(`/${type}/${id}/remove-video`, data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("updateSectionByIdRemoveVideo successful");
    }
  },

  deleteSectionById: async (type: string | string[], id: string | string[]) => {
    try {
      await axiosInstance.delete(`/${type}/${id}`);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      console.log("Delete successful");
    }
  },
};

export default sectionFetcher;
