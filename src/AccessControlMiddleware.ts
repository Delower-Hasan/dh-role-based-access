import { useEffect } from "react";
import { useUserRole } from "./UserRoleContext";
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

  const isAccessDenied = (): boolean => {
    const { global, roles } = rules;
    const roleRules = roles[role] || {};
    return (
      (!global.isAuthenticated &&
        matchesPath(global.restricted, currentPath)) ||
      matchesPath(roleRules.restricted, currentPath)
    );
  };

  useEffect(() => {
    const { global } = rules;
    if (
      global.isAuthenticated &&
      matchesPath(global.restrictAuthUser, currentPath)
    ) {
      goBack();
    }
    if (isAccessDenied() && !global.errorMessage) {
      goBack();
    }
  }, [rules, currentPath]);

  if (isAccessDenied() && rules.global.errorMessage) {
    return rules.global.errorMessage;
  }

  return children;
};
