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

    if (global.restricted && matchesPath(global.restricted, currentPath)) {
      toast.error(`Access to this page is restricted`);
      goBack();
      return;
    }

    if (
      global.isAuthenticated &&
      matchesPath(global.restrictAuthUser, currentPath)
    ) {
      toast.error(`Authenticated users cannot access this page`);
      goBack();
      return;
    }

    if (
      roleRules.restricted &&
      matchesPath(roleRules.restricted, currentPath)
    ) {
      toast.error(`${role} has no access to this page`);
      goBack();
      return;
    }
  }, [rules, role, currentPath]);

  return children;
};
