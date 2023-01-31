import { useAuth } from "../src/context/UserContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-5xl text-black mt-[-20vh]">
        Welcome {user?.username}
      </h1>
    </div>
  );
}
