import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TUser } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import userFetcher from "../../services/userFetcher";
import plus from "../../src/assets/plus.svg";

function Users() {
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    userFetcher.getUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar />
      <div className="rounded-xl">
        <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
          <thead className="h-[50px] rounded-t-[10px]">
            <th className="rounded-tl-[10px]">First name</th>
            <th>Last name</th>
            <th>User name</th>
            <th>Email</th>
            <th>Edit</th>
            <th className="rounded-tr-[10px]">Delete</th>
          </thead>
          <tbody className="rounded-b-[10px]">
            {users.map((user) => (
              <tr
                key={user.id}
                className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
              >
                <td className="border border-black px-5 last:rounded-bl-[10px]">
                  {user.firstname}
                </td>
                <td className="border px-5">{user.lastname}</td>
                <td className="border px-5">{user.username}</td>
                <td className="border px-5">{user.email}</td>
                <td className="border text-center">
                  <a href={`/users/${user.id}`}>📝</a>
                </td>
                <td className="border text-center last:rounded-br-[10px]">
                  <button
                    type="button"
                    onClick={() =>
                      userFetcher
                        .deleteUserById(user.id)
                        .then(() =>
                          userFetcher.getUsers().then((data) => setUsers(data))
                        )
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[50px] mt-[1em] ml-[5%]">
        <a href="/users/new-user">
          <Image src={plus} alt="logo-plus" />
        </a>
      </div>
    </div>
  );
}

export default Users;
