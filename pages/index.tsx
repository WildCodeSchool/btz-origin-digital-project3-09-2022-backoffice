import { useAuth } from "../src/context/UserContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <h1>{user?.username}</h1>
    </div>
  );
}
