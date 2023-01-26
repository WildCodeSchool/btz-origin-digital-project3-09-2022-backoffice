import { useEffect } from "react";
import { useAuth } from "../src/context/UserContext";

export default function Home() {
  const { user } = useAuth();
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Page HOME ==> ", user?.role);
      if (user) {
        window.location.href = "/";
      }
    }
  }, [user]);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
