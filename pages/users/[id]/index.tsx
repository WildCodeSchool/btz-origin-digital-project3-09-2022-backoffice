import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TUser } from "../../../src/types/types";
import userFetcher from "../../../services/userFetcher";

export default function User() {
  const router = useRouter();

  const [user, setUser] = useState<TUser[]>({});

  useEffect(() => {
    userFetcher.getUsersById<TUser>(router.query.id).then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <div>
      <h1>{user.username}</h1>
    </div>
  );
}
