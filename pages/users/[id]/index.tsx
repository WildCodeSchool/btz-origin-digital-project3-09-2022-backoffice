import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TUser } from "../../../src/types/types";
import userFetcher from "../../../services/userFetcher";

export default function User() {
  const router = useRouter();

  const [user, setUser] = useState<TUser>({});

  useEffect(() => {
    if (router.query.id) {
      userFetcher
        .getUserById(router.query.id)
        .then((response) => setUser(response));
    }
  }, [router]);

  return (
    <div>
      <h1>{user.firstname}</h1>
      <h1>{user.lastname}</h1>
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
      <h1>{user.role}</h1>
    </div>
  );
}
