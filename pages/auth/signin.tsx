import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../../src/context/UserContext";

export default function Signin() {
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center align-middle flex-col text-black flex-grow w-screen h-full bg-bg1 absolute left-0">
      <form className="flex space-y-5 flex-col mt-[-30%]">
        <div>
          <input
            className="px-2 py-1 rounded-lg"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email..."
            autoComplete="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="py-5">
          <input
            className="px-2 py-1 rounded-lg"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password..."
            autoComplete="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <h6 className="flex justify-center text-primary_font text-xs text-text1">
            Need an account ?
            <ul>
              <li>
                <Link className="text-text1" href="/signup">
                  SIGN UP
                </Link>
              </li>
            </ul>
          </h6>
        </div>
      </form>
      <div>
        <button
          className="text-text1 bg-footer px-5 py-1 rounded-lg"
          type="button"
          onClick={() => signIn(credentials)}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
}
