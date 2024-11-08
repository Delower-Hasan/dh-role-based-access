# Role-Based Access for React and Next.js

`dh-role-based-access` is a TypeScript package for React and Next.js that provides role-based access control components. Use it to manage component visibility based on user roles, making it easy to restrict access to certain parts of your app.

## Installation

Install the package using npm:

```bash
npm install dh-role-based-access
```

Or with Yarn:

```bash
yarn add dh-role-based-access
```

## Setup

1. **Wrap Your App with `UserRoleProvider`**: To provide global user role context, wrap your app with `UserRoleProvider`.
2. **Specify the Initial Role**: Pass an initial role to the provider. You can also define custom roles to fit your app's needs.

### Example

```tsx
// App.tsx or _app.tsx (in a Next.js app)
import React from "react";
import { UserRoleProvider } from "dh-role-based-access";

// Define custom roles for your app
type MyUserRoles = "admin" | "user" | "guest" | "editor" | "viewer";

function MyApp({ Component, pageProps }) {
  return (
    <UserRoleProvider<MyUserRoles> initialRole="guest">
      <Component {...pageProps} />
    </UserRoleProvider>
  );
}

export default MyApp;
```

## Usage

### `RoleBasedAccess` Component

The `RoleBasedAccess` component controls component visibility based on user roles. It accepts two props: `can` and `canNot`. Only one of these should be used at a time.

### Example

```tsx
import React from "react";
import { RoleBasedAccess } from "dh-role-based-access";

const Dashboard = () => {
  return (
    <div>
      <RoleBasedAccess can={["admin", "editor"]}>
        <div>Admin and Editor Content</div>
      </RoleBasedAccess>

      <RoleBasedAccess canNot={["guest"]}>
        <div>Content for Registered Users</div>
      </RoleBasedAccess>
    </div>
  );
};

export default Dashboard;
```

### `useUserRole` Hook

The `useUserRole` hook allows you to access and update the current user role within the app.

### Example

```tsx
import React from "react";
import { useUserRole } from "dh-role-based-access";

const UserProfile = () => {
  const { role, setRole } = useUserRole();

  const changeRole = () => {
    setRole("admin"); // Update the role dynamically
  };

  return (
    <div>
      <p>Current Role: {role}</p>
      <button onClick={changeRole}>Change Role to Admin</button>
    </div>
  );
};

export default UserProfile;
```

## API Reference

### `UserRoleProvider`

- **Props**:
  - `initialRole`: A string representing the initial user role, which should match your custom role types.
  - `children`: Components that the provider wraps to give them access to the role context.

### `RoleBasedAccess`

- **Props**:
  - `can` (optional): Array of roles that are allowed to view the children.
  - `canNot` (optional): Array of roles that are restricted from viewing the children.
  - `children`: The components to render conditionally based on role.

### `useUserRole`

- **Returns**:
  - `role`: The current role of the user.
  - `setRole`: Function to update the current user role.

## Customization

Define custom roles in your app by specifying your role types (e.g., `type MyRoles = 'admin' | 'editor' | 'viewer'`) and pass them to the `UserRoleProvider` and `RoleBasedAccess` components.

## Contributing

Contributions, issues, and feature requests are welcome. Check the [issues page](https://github.com/delower-hasan/dh-role-based-access/issues) if you'd like to contribute.

## License

This project is licensed under the MIT License.
