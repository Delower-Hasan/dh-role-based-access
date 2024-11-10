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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const goBack = () => {
    navigate(-1);
  };

  return { goBack, currentPath };
}
