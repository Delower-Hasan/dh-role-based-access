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

### Access Control Middleware for React and Next.js

## Step 1: Import the Middleware

```bash
import { AccessControlMiddleware,IAccessRules } from 'dh-role-based-access';
```

## Step 2: Define Access Rules

```bash
  const accessRules:IAccessRules = {
    global: {
      restricted: ['/dashboard/*'],
      restrictAuthUser: ['/login', '/register'],
      isAuthenticated: true,
    },
    roles: {
      user: {
        restricted: ['/admin-panel'],
      },
      admin: {
        restricted: [],
      },
      guest: {
        restricted: ['/profile'],
      }
    }
  };

```

### Step 3: Configure the Middleware in Your Application

For React:

```bash
 import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import { AccessControlMiddleware, UserRoleProvider } from 'install dh-role-based-access';
import AdminPanel from './components/AdminPanel';

function App() {

  return (
    <UserRoleProvider initialRole="guest">
      <Router>
        <AccessControlMiddleware rules={accessRules}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin-panel" component={AdminPanel} />
            {/* other routes */}
          </Switch>
        </AccessControlMiddleware>
      </Router>
    </UserRoleProvider>
  );
}

export default App;

```

For Next.js:

```bash
 import { AppProps } from 'next/app';
import { AccessControlMiddleware, UserRoleProvider } from 'install dh-role-based-access';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserRoleProvider initialRole="guest">
      <AccessControlMiddleware rules={accessRules} >
        <Component {...pageProps} />
      </AccessControlMiddleware>
    </UserRoleProvider>
  );
}

export default MyApp;


```

## User Authentication and Path Restriction Notes

- **Authenticated User Access**:

  - If the user is authenticated (`authenticated: true`), they can access global restricted pages.
  - If the user is **not** authenticated, they cannot access any of the global restricted pages.

- **User Restricted Paths**:

  - If a path is listed in the **user restricted array**, it will be restricted for that user, regardless of their authentication status (authenticated or not).

- **Restrict Authenticated Users**:
  - The **restrictAuthUser** setting is used for paths that are restricted to authenticated users.
  - If the user is authenticated, these are the pages they cannot access.
