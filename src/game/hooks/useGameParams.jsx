import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useGameParams = () => {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState({
    themes: null,
  });

  useEffect(() => {
    const themes = searchParams.getAll("themes").join(",");

    if (themes) {
      setParams({ themes });
    }
  }, []);

  return params;
};
