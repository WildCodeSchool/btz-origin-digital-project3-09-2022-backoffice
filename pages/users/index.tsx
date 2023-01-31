import React, { useState, useEffect } from "react";
import json2csv from "json2csv";
import Image from "next/image";
import Link from "next/link";
import { TRole, TUser } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import userFetcher from "../../services/userFetcher";
import ModalOnDelete from "../../src/components/modal/ModalOnDelete";

function Users() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<string | null>();
  const [userRole, setUserRole] = useState<TRole>();

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

  const handleItemToEdit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (editMode) {
      setEditMode(false);
    }
    setItemToEdit(e.currentTarget.id);
    setEditMode(() => !editMode);
  };

  const handleItemToEditCancel = (): void => {
    setEditMode(false);
    setItemToEdit(null);
  };

  const handleItemToUpdate = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (userRole) {
      userFetcher.updateUsersRoleById(e.currentTarget.id, userRole).then(() => {
        userFetcher.getUsers().then((data) => setUsers(data));
      });
    }
    setEditMode(false);
  };

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
          <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
            <thead className="h-[50px]">
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>User name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="rounded-b-[10px]">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="h-[45px] odd:bg-lightgrey even:bg-white"
                >
                  <td className="border border-black px-5">{user.firstname}</td>
                  <td className="border px-5">{user.lastname}</td>
                  <td className="border px-5">{user.username}</td>
                  <td className="border px-5">{user.email}</td>

                  {editMode && itemToEdit === user.id ? (
                    <td className="border border-black px-5">
                      <select
                        className="w-full bg-green-200"
                        onChange={(e) => setUserRole(e.target.value)}
                        defaultValue={user.role}
                      >
                        <option className="w-full bg-green-200" value="ADMIN">
                          ADMIN
                        </option>
                        <option className="w-full bg-green-200" value="USER">
                          USER
                        </option>
                        <option
                          className="w-full bg-green-200"
                          value="SUPER_ADMIN"
                        >
                          SUPER_ADMIN
                        </option>
                      </select>
                    </td>
                  ) : (
                    <td className="border px-5 text-center">{user.role}</td>
                  )}
                  {editMode && itemToEdit === user.id ? (
                    <td className="border text-center bg-[#008000]">
                      <button
                        id={user.id}
                        type="button"
                        onClick={handleItemToUpdate}
                      >
                        SAVE
                      </button>
                    </td>
                  ) : (
                    <td className="border text-center">
                      <button
                        id={user.id}
                        type="button"
                        onClick={handleItemToEdit}
                      >
                        📝
                      </button>
                    </td>
                  )}
                  {editMode && itemToEdit === user.id ? (
                    <td className="border text-center last:rounded-br-[10px] bg-[#FF0000]">
                      <button
                        className="w-full h-full bg-red"
                        type="button"
                        onClick={handleItemToEditCancel}
                      >
                        CANCEL
                      </button>
                    </td>
                  ) : (
                    <td className="border text-center last:rounded-br-[10px]">
                      <button
                        id={user.id}
                        type="button"
                        onClick={handleItemToDelete}
                      >
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-[1em] ml-[5%] flex">
        <button type="submit" onClick={exportToCsv}>
          <Image width={50} height={50} src="/csv-icon.svg" alt="logo-plus" />
        </button>
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
