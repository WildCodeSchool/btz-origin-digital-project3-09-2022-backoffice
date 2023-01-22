import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TVideo } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import videoFetcher from "../../services/videoFetcher";
import plus from "../../src/assets/plus.svg";

function Videos() {
  const [videos, setVideos] = useState<TVideo[]>([]);

  useEffect(() => {
    videoFetcher.getVideos().then((response) => {
      setVideos(response);
    });
  }, []);

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar />
      <div className="rounded-xl">
        <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
          <thead className="h-[50px] rounded-t-[10px]">
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Video</th>
            <th>Display</th>
            <th>Is public</th>
            <th>Views</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody className="rounded-b-[10px]">
            {videos
              .sort((a, b) => (a.title > b.title ? 1 : -1))
              .map((video) => (
                <tr
                  key={video.id}
                  className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
                >
                  <td className="border border-black px-5 last:rounded-bl-[10px]">
                    {video.title}
                  </td>
                  <td className="border px-5">{video.description}</td>
                  <td className="border px-5">{video.duration}</td>
                  <td className="border p-2">
                    <video controls className="m-auto" width="200" height="200">
                      <source src={video.videoUrl} type="video/mp4" />
                      <track src={video.videoUrl} kind="captions" />
                    </video>
                  </td>
                  <td className="border px-5">{video.display}</td>
                  <td className="border px-5">{video.isPublic}</td>
                  <td className="border px-5">{video.nbViews}</td>
                  <td className="border text-center">
                    <a href={`/videos/${video.id}`}>📝</a>
                  </td>
                  <td className="border text-center last:rounded-br-[10px]">
                    <button
                      type="button"
                      onClick={() =>
                        videoFetcher
                          .deleteVideoById(video.id)
                          .then(() =>
                            videoFetcher
                              .getVideos()
                              .then((data) => setVideos(data))
                          )
                      }
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-[50px] mt-[1em] ml-[5%]">
        <a href="/videos/new-video">
          <Image src={plus} alt="logo-plus" />
        </a>
      </div>
    </div>
  );
}

export default Videos;
