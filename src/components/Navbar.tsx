import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../context/UserContext";

function Navbar() {
  const router = useRouter();
  const { isAuth, signOut } = useAuth();

  return (
    <div className="w-screen h-[10%] flex p-5 bg-bg1 text-text1 text-xl">
      <ul className="flex flex-row w-full">
        <li className="w-1/3 flex justify-center items-center align-middle flex-col">
          DASHBOARD
        </li>
        <li className="w-1/3 flex justify-center items-center align-middle flex-col">
          <Image
            src="/wyw_logo.svg"
            width={150}
            height={200}
            alt="logo"
            onClick={() => router.push("/")}
          />
        </li>

        {isAuth ? (
          <li className="w-1/3 flex justify-center items-center align-middle flex-col">
            <button
              className=" text-primary_font px-5 py-1 border-solid border-[text-primary_font] border-2 "
              type="submit"
              onClick={signOut}
            >
              SIGN OUT
            </button>
          </li>
        ) : (
          <li className="w-1/3 flex justify-center items-center align-middle flex-col">
            <button
              className=" text-primary_font px-5 py-1 border-solid border-[text-primary_font] border-2 "
              type="submit"
              onClick={() => router.push("/auth/signin")}
            >
              SIGN IN
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
