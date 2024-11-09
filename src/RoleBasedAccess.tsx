import React, { ReactNode } from "react";
import { useUserRole } from "./UserRoleContext";
import { UserRoleType } from "./types";

interface RoleBasedAccessProps<T extends UserRoleType> {
  can?: T[]; // Only these roles can see the component
  canNot?: T[]; // These roles cannot see the component
  children: ReactNode; // The children to render if the role matches
}

const RoleBasedAccess = <T extends UserRoleType>({
  can,
  canNot,
  children,
}: RoleBasedAccessProps<T>) => {
  const { role: userRole } = useUserRole<T>();

  // Check for mutually exclusive props
  if (can && canNot) {
    throw new Error(
      "RoleBasedAccess: Provide either 'can' or 'canNot', not both."
    );
  }

  // Determine if the component should render based on the 'can' prop
  if (can && !can.includes(userRole)) {
    return null;
  }

  // Determine if the component should render based on the 'canNot' prop
  if (canNot && canNot.includes(userRole)) {
    return null;
  }

  // If none of the conditions are met, render the children
  return <>{children}</>;
};

export default RoleBasedAccess;
