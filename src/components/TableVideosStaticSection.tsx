import React, { useEffect, useState } from "react";
import Table, { TData } from "./table";
import { TSection, TVideo } from "../types/types";

type Props = {
  videos: TVideo[];
  videoIds: { id: string; status: boolean }[];
  setVideoIds: React.Dispatch<
    React.SetStateAction<{ id: string; status: boolean }[]>
  >;
  sectionItem: TSection | undefined;
};

export default function TableVideos({
  videos,
  videoIds,
  setVideoIds,
  sectionItem,
}: Props) {
  const [data, setData] = useState<TData[]>([]);
  const columns = [
    {
      Header: "Select",
      accessor: "select" as keyof TData,
    },
    {
      Header: "Title",
      accessor: "title" as keyof TData,
    },
    {
      Header: "Video",
      accessor: "video" as keyof TData,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = videoIds;
    const status = e.target.checked;
    const newId = e.target.value;

    arr.forEach((element, index) => {
      if (element.id === newId) {
        // note this will expect a 'truthy' value i.e. except for false, 0, "", null, undefined, and NaN
        arr.splice(index, 1); // removing the id from array because value exists
      }
    });
    arr.push({ id: newId, status }); // adding to array because value doesnt exists

    setVideoIds(arr);
  };

  useEffect(() => {
    setData([]);
    videos.map((video) => {
      setData((element) => [
        ...element,
        {
          id: video.id,
          select: (
            <input
              className="w-6 h-6 m-[2em]"
              type="checkbox"
              value={video.id}
              defaultChecked={
                typeof sectionItem !== "undefined" &&
                typeof sectionItem.videos !== "undefined"
                  ? sectionItem.videos.filter((e) => e.id === video.id).length >
                    0
                  : false
              }
              onChange={(e) => handleChange(e)}
            />
          ),
          title: video.title,
          video: (
            <video controls className="m-auto" width="250" height="200">
              <source src={video.teaserUrl} type="video/mp4" />
              <track src={video.teaserUrl} kind="captions" />
            </video>
          ),
        },
      ]);
      return true;
    });
  }, []);

  return (
    <div className="w-full h-full">
      <Table
        columns={columns}
        data={data.sort((a, b) => (a.title > b.title ? 1 : -1))}
      />
    </div>
  );
}
