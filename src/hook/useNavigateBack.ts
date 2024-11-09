import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type NavigationHook = {
  goBack: () => void;
  currentPath: string;
};

export function useNavigateBack(): NavigationHook {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );
  const [nextRouter, setNextRouter] = useState<any | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); // React Router's hook for tracking the current path

  useEffect(() => {
    setCurrentPath(location.pathname); // Update currentPath whenever location changes in React Router
  }, [location]); // React to location changes

  useEffect(() => {
    import("next/router")
      .then(({ useRouter }) => {
        const router = useRouter();
        setNextRouter(router);
        setCurrentPath(router.asPath);
      })
      .catch(() => {
        console.log("Not in a Next.js environment.");
      });
  }, []);

  const goBack = () => {
    if (nextRouter) {
      nextRouter.back();
    } else {
      navigate(-1);
    }
  };

  return { goBack, currentPath };
}
