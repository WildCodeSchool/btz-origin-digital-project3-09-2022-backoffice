import { useRouter } from "next/router";
import { useAuth } from "../context/UserContext";

type TChildren = { children: React.ReactNode };

function MainContent({ children }: TChildren) {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="w-full  h-full">
      {user || router.asPath === "/auth/signin" ? (
        <div className="w-full h-full overflow-auto">{children}</div>
      ) : (
        <div className="w-screen  h-full fixed left-0 bg-bg1">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-5xl text-text1 mt-[-20vh]">Please sign in</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
