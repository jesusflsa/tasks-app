"use client";

import { UserType } from "@/lib/types";
import { createContext, use, useContext, useOptimistic } from "react";

type AuthContextType = {
  auth: UserType | undefined;
  updateAuth: (auth: UserType) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: UserType | undefined, action: UserType): UserType | undefined {
  return action;
}

export function AuthProvider({
  children,
  authPromise,
}: {
  children: React.ReactNode;
  authPromise: Promise<UserType | undefined>;
}) {
  const initialAuth = use(authPromise);

  const [optimisticAuth, updateOptimisticAuth] = useOptimistic(initialAuth, authReducer);

  const updateAuth = (auth: UserType) => {
    updateOptimisticAuth(auth);
  };

  return (
    <AuthContext.Provider value={{ auth: optimisticAuth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
