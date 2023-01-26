import { useEffect } from "react";
import { useAuth } from "../src/context/UserContext";

export default function Home() {
  const { user, isAuth } = useAuth();
  console.log(user?.role);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
