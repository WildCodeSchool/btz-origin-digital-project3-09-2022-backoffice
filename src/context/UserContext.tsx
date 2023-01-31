"use client";

/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/dot-notation */
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { TUserWithoutPassword, TCredentials, AuthState } from "../types/types";
import axiosInstance from "../../services/axiosinstance";

interface IUserContext {
  user: TUserWithoutPassword | null;
  isAuth: boolean;
  signIn: (credentials: TCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<IUserContext | null>(null);

type TUserContextProviderProps = {
  children: React.ReactNode;
};

function UserContextProvider({ children }: TUserContextProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuth: false,
  });

  const signIn = async ({ email, password }: TCredentials) => {
    try {
      const { data } = await axiosInstance.post("auth/signin", {
        email,
        password,
      });
      setAuthState(() => ({
        isAuth: true,
        user: data,
      }));

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = async () => {
    await axiosInstance.post("auth/signout");
    setAuthState(() => ({
      isAuth: false,
      user: null,
    }));
    router.push("/");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosInstance.post("auth/me");
        setAuthState(() => ({
          isAuth: true,
          user: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: authState.user,
        isAuth: authState.isAuth,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
