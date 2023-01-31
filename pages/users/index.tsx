import React, { useState, useEffect } from "react";
import json2csv from "json2csv";
import Image from "next/image";
import Link from "next/link";
import { TUser } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import userFetcher from "../../services/userFetcher";
import ModalOnDelete from "../../src/components/modal/ModalOnDelete";

function Users() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userFetcher.getUsers().then((response) => {
      setUsers(response);
      setIsLoading(false);
    });
  }, []);

  const exportToCsv = () => {
    const csv = json2csv.parse(users);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
  };

  const [itemToDelete, setItemToDelete] = useState<string | null>();
  const [showModal, setShowModal] = useState(false);

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
    setItemToDelete(e.currentTarget.id);
  };

  const handleDeleteConfirmed = (): void => {
    setIsLoading(true);
    userFetcher
      .deleteUserById(itemToDelete as string)
      .then(() => userFetcher.getUsers().then((data) => setUsers(data)));
    setShowModal(false);
    setIsLoading(false);
  };

  const handleDeleteCancelled = (): void => {
    setShowModal(false);
  };

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar />
      {isLoading ? (
        <div className="text-xl mt-3">Is loading...</div>
      ) : (
        <div className="rounded-xl">
          <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
            <thead className="h-[50px] rounded-t-[10px]">
              <tr>
                <th className="rounded-tl-[10px]">First name</th>
                <th>Last name</th>
                <th>User name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th className="rounded-tr-[10px]">Delete</th>
              </tr>
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
                  <td className="border px-5 text-center">{user.role}</td>
                  <td className="border text-center">
                    <Link href={`/users/${user.id}`}>📝</Link>
                  </td>
                  <td className="border text-center last:rounded-br-[10px]">
                    <button
                      id={user.id}
                      type="button"
                      onClick={handleItemToDelete}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-[1em] ml-[5%] flex">
        {/* <Link className="m-3" href="/users/new-user">
          <Image width={50} height={50} src="/plus.svg" alt="logo-plus" />
        </Link> */}

        <button type="submit" onClick={exportToCsv}>
          <Image width={50} height={50} src="/csv-icon.svg" alt="logo-plus" />
        </button>

        {/* ... */}
      </div>
      {showModal && (
        <ModalOnDelete
          handleDeleteConfirmed={handleDeleteConfirmed}
          handleDeleteCancelled={handleDeleteCancelled}
        />
      )}
    </div>
  );
}

export default Users;
