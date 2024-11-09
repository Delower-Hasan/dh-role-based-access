interface IRoleAccessControl {
  restricted: string[];
}

interface IGlobalRules {
  restricted?: string[];
  restrictAuthUser?: string[];
  isAuthenticated: boolean;
}

export default interface IAccessRules {
  global: IGlobalRules;
  roles: {
    [role: string]: IRoleAccessControl;
  };
}

export type UserRoleType = string;
