import { useEffect } from "react";
import { useUserRole } from "./UserRoleContext";
import { toast } from "react-toastify";
import { IAccessRules, UserRoleType } from "./types";
import { useNavigateBack } from "./hook/useNavigateBack";
import { matchesPath } from "./utils";

export const AccessControlMiddleware = ({
  rules,
  children,
}: {
  rules: IAccessRules;
  children: React.ReactNode;
}) => {
  const { role } = useUserRole<UserRoleType>();
  const { goBack, currentPath } = useNavigateBack();

  useEffect(() => {
    const { global, roles } = rules;
    const roleRules = roles[role] || {};

    if (
      !global.isAuthenticated &&
      matchesPath(global.restricted, currentPath)
    ) {
      // console.warn(`Access to this page is restricted`);
      goBack();
      return;
    }

    if (
      global.isAuthenticated &&
      matchesPath(global.restrictAuthUser, currentPath)
    ) {
      // console.warn(`Authenticated users cannot access this page`);
      goBack();
      return;
    }

    if (matchesPath(roleRules.restricted, currentPath)) {
      // console.warn(`${role} has no access to this page`);
      goBack();
      return;
    }
  }, [rules, role, currentPath]);

  return children;
};
