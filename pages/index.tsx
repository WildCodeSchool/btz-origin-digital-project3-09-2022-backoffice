import { useAuth } from "../src/context/UserContext";

export default function Home() {
  const { user } = useAuth();
  console.log(user?.role);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
