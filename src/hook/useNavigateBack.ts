import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type NavigationHook = {
  goBack: () => void;
  currentPath: string;
};

export function useNavigateBack(): NavigationHook {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [nextRouter, setNextRouter] = useState<any>(null);

  // Dynamically import next/router if available
  useEffect(() => {
    import("next/router")
      .then((routerModule) => {
        const router = routerModule.useRouter();
        setNextRouter(router); // Store the router in state
        setCurrentPath(router.asPath); // Use asPath for Next.js
      })
      .catch(() => {
        console.log("Not in a Next.js environment.");
      });
  }, []);

  const navigate = useNavigate();

  const goBack = () => {
    if (nextRouter && nextRouter.back) {
      nextRouter.back(); // Next.js goBack method
    } else if (navigate) {
      navigate(-1); // React Router goBack method
    } else {
      console.warn(
        "Neither Next.js router nor React Router navigate is available."
      );
    }
  };

  // For React Router, we can use window.location.pathname
  useEffect(() => {
    if (!nextRouter) {
      setCurrentPath(window.location.pathname); // Set path for React Router environment
    }
  }, [nextRouter]);

  return { goBack, currentPath };
}
