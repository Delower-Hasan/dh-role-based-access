import { useEffect } from "react";
import { useUserRole } from "./UserRoleContext";
import { toast } from "react-toastify";
import { IAccessRules, UserRoleType } from "./types";

export const AccessControlMiddleware = ({
  rules,
  children,
}: {
  rules: IAccessRules;
  children: React.ReactNode;
}) => {
  const { role } = useUserRole<UserRoleType>();
  const router = useRouter ? useRouter() : null;
  const history = useHistory ? useHistory() : null;

  useEffect(() => {
    const path = router ? router.pathname : window.location.pathname;
    const { global, roles } = rules;
    const roleRules = roles[role] || {};

    const matchesPath = (patterns: string[] = []) =>
      patterns.some((pattern) => new RegExp(`^${pattern}`).test(path));

    // Check global restricted paths
    if (matchesPath(global.restricted)) {
      toast.error(`Access to this page is restricted`);
      router ? router.push("/") : history.goBack();
      return;
    }

    // Check if authenticated users are restricted from certain paths
    if (global.isAuthenticated && matchesPath(global.restrictAuthUser)) {
      toast.error(`Authenticated users cannot access this page`);
      router ? router.push("/") : history.goBack();
      return;
    }

    // Check role-specific restricted paths
    if (matchesPath(roleRules.restricted)) {
      toast.error(`${role} has no access to this page`);
      router ? router.push("/") : history.goBack();
      return;
    }
  }, [rules, role, router, history]);

  return children;
};
