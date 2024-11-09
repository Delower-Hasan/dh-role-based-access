import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { UserRoleType } from "./types";

interface UserRoleContextType<T extends UserRoleType> {
  role: T;
  setRole: Dispatch<SetStateAction<T>>;
}

interface UserRoleProviderProps<T extends UserRoleType> {
  children: ReactNode;
  initialRole: T;
}

// Create a context with a generic type parameter
const UserRoleContext = createContext<UserRoleContextType<any> | undefined>(
  undefined
);

export const UserRoleProvider = <T extends UserRoleType>({
  children,
  initialRole,
}: UserRoleProviderProps<T>) => {
  const [role, setRole] = useState<T>(initialRole);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

// Custom hook to use the context with generic role type
export const useUserRole = <
  T extends UserRoleType
>(): UserRoleContextType<T> => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context as UserRoleContextType<T>;
};
