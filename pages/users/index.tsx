import React, { useState, useEffect } from "react";
import json2csv from "json2csv";
import Image from "next/image";
import { TRole, TUser } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import userFetcher from "../../services/userFetcher";
import ModalOnDelete from "../../src/components/modal/ModalOnDelete";
import { useAuth } from "../../src/context/UserContext";
import ModalAlert from "../../src/components/modal/ModalAlert";

function Users() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<string | null>();
  const [userRole, setUserRole] = useState<"USER" | "ADMIN" | "SUPER_ADMIN">(
    "USER"
  );
  const { user } = useAuth();
  const [query, setQuery] = useState("");

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
    if (user && user.role !== "SUPER_ADMIN") {
      setShowModal(true);
      return;
    }
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
    const body: TRole = {
      role: userRole,
      usersRequiringRole: user?.role as "USER" | "ADMIN" | "SUPER_ADMIN",
    };

    if (userRole) {
      userFetcher.updateUsersRoleById(e.currentTarget.id, body).then(() => {
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

  const handleSearch = (search: string) => {
    setQuery(search);
  };

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar onSearch={handleSearch} />
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
              {users
                .filter((item) => {
                  if (query === "") {
                    return user;
                  }
                  if (
                    item.firstname
                      .toLowerCase()
                      .includes(query.toLowerCase()) ||
                    item.lastname.toLowerCase().includes(query.toLowerCase()) ||
                    item.username.toLowerCase().includes(query.toLowerCase()) ||
                    item.email.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return item;
                  }
                  return null;
                })
                .map((item) => (
                  <tr
                    key={item.id}
                    className="h-[45px] odd:bg-lightgrey even:bg-white"
                  >
                    <td className="border border-black px-5">
                      {item.firstname}
                    </td>
                    <td className="border px-5">{item.lastname}</td>
                    <td className="border px-5">{item.username}</td>
                    <td className="border px-5">{item.email}</td>

                    {editMode && itemToEdit === item.id ? (
                      <td className="border border-black px-5">
                        <select
                          className="w-full bg-green-200"
                          onChange={(e) =>
                            setUserRole(
                              e.target.value as "USER" | "ADMIN" | "SUPER_ADMIN"
                            )
                          }
                          defaultValue={item.role}
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
                      <td className="border px-5 text-center">{item.role}</td>
                    )}
                    {editMode && itemToEdit === item.id ? (
                      <td className="border text-center bg-[#008000]">
                        <button
                          id={item.id}
                          type="button"
                          onClick={handleItemToUpdate}
                        >
                          SAVE
                        </button>
                      </td>
                    ) : (
                      <td className="border text-center">
                        <button
                          id={item.id}
                          type="button"
                          onClick={handleItemToEdit}
                        >
                          📝
                        </button>
                      </td>
                    )}
                    {editMode && itemToEdit === item.id ? (
                      <td className="border text-center bg-[#FF0000]">
                        <button
                          className="w-full h-full bg-red"
                          type="button"
                          onClick={handleItemToEditCancel}
                        >
                          CANCEL
                        </button>
                      </td>
                    ) : (
                      <td className="border text-center">
                        <button
                          id={item.id}
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
      {user && showModal && user.role === "SUPER_ADMIN" && (
        <ModalOnDelete
          handleDeleteConfirmed={handleDeleteConfirmed}
          handleDeleteCancelled={handleDeleteCancelled}
        />
      )}
      {user && showModal && user.role !== "SUPER_ADMIN" && (
        <ModalAlert
          message="You are not allowed to do that !"
          handleDeleteCancelled={handleDeleteCancelled}
        />
      )}
    </div>
  );
}

export default Users;
