import { useAuth } from "../src/context/UserContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
