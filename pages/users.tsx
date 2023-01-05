import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { IUser } from "../src/interfaces/interfaces";
import { TnewUser } from "../src/types/types";
import SearchBar from "../src/components/SearchBar";
import userFetcher from "../services/userFetcher";
import plus from "../src/assets/plus.svg";

function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const initialValues: TnewUser = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    role: "USER",
    password: "test",
  };
  const [inputValue, setInputValue] = useState<TnewUser>(initialValues);
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    userFetcher.getUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  // reset datas in inputs if clic on CANCEL & hide the input row
  const handleAddUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.innerHTML === "CANCEL") {
      setInputValue(initialValues);
    }
    setAddUser(() => !addUser);
  };

  // take datas from inputs boxes on change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  }

  // function that add a new user in DB & get users
  function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    userFetcher
      .createUser(inputValue)
      .then(() => userFetcher.getUsers().then((data) => setUsers(data)));
    if (event.target.innerHTML === "SAVE") {
      setInputValue(initialValues);
    }
  }

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
            {users
              // .filter((user) => {
              //   if (query === "") {
              //     return user;
              //   }
              //   if (user.lastname.toLowerCase().includes(query.toLowerCase())) {
              //     return user;
              //   }
              // })
              .map((user) => (
                <tr
                  key={user.id}
                  className="h-[50px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
                >
                  <td className="border border-black px-5 last:rounded-bl-[10px]">
                    {user.firstname}
                  </td>
                  <td className="border px-5">{user.lastname}</td>
                  <td className="border px-5">{user.username}</td>
                  <td className="border px-5">{user.email}</td>
                  <td className="border text-center">📝</td>
                  <td className="border text-center last:rounded-br-[10px]">
                    <button
                      type="button"
                      onClick={() =>
                        userFetcher
                          .deleteUserById(user.id)
                          .then(() =>
                            userFetcher
                              .getUsers()
                              .then((data) => setUsers(data))
                          )
                      }
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            {addUser && (
              <tr className="h-[50px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]">
                <td className="border border-black px-5 last:rounded-bl-[10px]">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    className="w-[100%]"
                    placeholder="first name"
                    value={inputValue.firstname}
                    onChange={handleChange}
                  />
                </td>
                <td className="border px-5">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    className="w-[100%]"
                    placeholder="last name"
                    value={inputValue.lastname}
                    onChange={handleChange}
                  />
                </td>
                <td className="border px-5">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="w-[100%]"
                    placeholder="user name"
                    value={inputValue.username}
                    onChange={handleChange}
                  />
                </td>
                <td className="border px-5">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="w-[100%]"
                    placeholder="email"
                    value={inputValue.email}
                    onChange={handleChange}
                  />
                </td>
                <td className="bg-[#299652] border text-center px-5">
                  <button
                    type="button"
                    className="w-[100%] h-[100%] bg-[#299652] font-bold"
                    onClick={handleSubmit}
                  >
                    SAVE
                  </button>
                </td>
                <td className="bg-[#FF0000] border text-center px-5">
                  <button
                    type="button"
                    className="w-[100%] h-[100%] bg-[#FF0000] font-bold"
                    onClick={handleAddUser}
                  >
                    CANCEL
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        className="mt-[1em] ml-[5%]"
        type="button"
        name="cancel"
        onClick={handleAddUser}
      >
        <Image src={plus} alt="logo-plus" />
      </button>
    </div>
  );
}

export default Users;
