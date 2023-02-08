import { GetServerSideProps } from "next";
import axios from "axios";
import { TVideo } from "../../../src/types/types";
import EditVideo from "../../../src/components/EditVideo";

interface IProps {
  video: TVideo;
}

export default function Video({ video }: IProps) {
  return <EditVideo video={video} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/${query.id}`
  );

  return {
    props: {
      video: data,
    },
  };
};
