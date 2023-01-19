import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { useRouter } from "next/router";
import { TVideo } from "../types/types";
import sectionFetcher from "../../services/sectionFetcher";

type TColumns = {
  Header: string;
  accessor: "select" | "title" | "video";
};

type TData = {
  select: JSX.Element;
  title: string;
  video: JSX.Element;
  id: string;
};

function Table({ columns, data }: { columns: TColumns[]; data: TData[] }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="w-[80%] h-[80%] overflow-auto mt-[2em] border border-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
      <table
        className="table-auto w-full text-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className=" sticky top-0 bg-lightgrey z-10"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="sticky top-0 px-4 py-2 bg-lightgrey"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="hover:bg-gray-100" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="px-4 py-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type Props = { videos: TVideo[] };

export default function TableVideos({ videos }: Props) {
  const router = useRouter();
  const [data, setData] = useState<TData[]>([]);
  const [count, setCount] = useState(0);
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const columns = [
    {
      Header: "Select",
      accessor: "select",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Video",
      accessor: "video",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      sectionFetcher.updateSectionByIdAddVideo(
        router.query.section as string,
        router.query.id as string,
        { videoId: e.target.value as string }
      );
      setCount(count + 1);
      setVideoIds((element) => [...element, e.target.value]);
    }
    if (!e.target.checked) {
      sectionFetcher.updateSectionByIdRemoveVideo(
        router.query.section as string,
        router.query.id as string,
        { videoId: e.target.value as string }
      );
      setCount(count - 1);
      setVideoIds((element) => element.filter((id) => id !== e.target.value));
    }
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
              className="m-[2em]"
              type="checkbox"
              value={video.id}
              checked={videoIds.includes(video.id)}
              onChange={(e) => handleChange(e)}
            />
          ),
          title: video.title,
          video: (
            <video controls className="m-auto" width="200" height="200">
              <source src={video.videoUrl} type="video/mp4" />
              <track src={video.videoUrl} kind="captions" />
            </video>
          ),
        },
      ]);
      return true;
    });
  }, []);

  return (
    <div className="w-full">
      <Table
        columns={columns}
        data={data.sort((a, b) => (a.title > b.title ? 1 : -1))}
      />
    </div>
  );
}
