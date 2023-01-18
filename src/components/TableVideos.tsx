import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { TVideo } from "../types/types";

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
    <div
      style={{
        width: "80%",
        maxHeight: "80%",
        overflow: "auto",
        marginTop: "2em",
        border: "1px solid black",
      }}
    >
      <table
        style={{
          width: "100%",
        }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    height: "2em",
                    margin: "5em 2em 0 2em",
                    position: "sticky",
                    top: "0",
                    zIndex: 1,
                    background: "white",
                    border: "1px solid black",
                  }}
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
              <tr
                style={{
                  border: "1px solid black",
                }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{
                        padding: "0.5em",
                        margin: "auto",
                        border: "1px solid black",
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      /
    </div>
  );
}

type Props = { videos: TVideo[] };

function TableVideos({ videos }: Props) {
  const [data, setData] = useState<TData[]>([]);
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
  };

  useEffect(() => {
    setData([]);
    videos.map((video) => {
      setData((element) => [
        ...element,
        {
          id: video.id,
          select: (
            <input type="checkbox" value={video.id} onChange={handleChange} />
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

export default TableVideos;
