import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TVideo } from "../../../src/types/types";
import videoFetcher from "../../../services/videoFetcher";

export default function Video() {
  const router = useRouter();

  const [video, setVideo] = useState<TVideo>({});

  useEffect(() => {
    if (router.query.id) {
      videoFetcher
        .getVideoById(router.query.id)
        .then((response) => setVideo(response));
    }
  }, [router]);

  return (
    <div>
      <h1>{video.id}</h1>
      <h1>{video.title}</h1>
      <h1>{video.description}</h1>
      <h1>{video.duration}</h1>
      <h1>{video.videoUrl}</h1>
    </div>
  );
}
