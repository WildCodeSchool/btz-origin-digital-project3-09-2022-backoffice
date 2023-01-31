import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";

type TChildren = { children: React.ReactNode };

function MainContent({ children }: TChildren) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [cooldown, setCooldown] = useState<number>(5);

  useEffect(() => {
    if (user && user.role === "USER") {
      const interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      if (cooldown === 0) {
        signOut();
        setCooldown(5);
      }
      return () => clearInterval(interval);
    }
    return () => {};
  }, [cooldown, user, router]);

  return (
    <div className="w-full  h-full">
      {(user && user.role !== "USER") || router.asPath === "/auth/signin" ? (
        <div className="w-full h-full overflow-auto">{children}</div>
      ) : (
        <div className="w-screen  h-full fixed left-0 bg-bg1">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-5xl text-text1 mt-[-20vh]">Please sign in</h1>
          </div>
        </div>
      )}
      {user && user.role === "USER" && (
        <div className="w-screen  h-full fixed left-0 bg-bg1">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-5xl text-text1 mt-[-20vh]">
              Please sign in with a count allowed
            </h1>
            <h1 className="text-5xl text-text1 mt-4">
              You will be disconnected in {cooldown} seconds.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
