import { useEffect, useState } from "react";

export const useGameParams = (onParamsLoaded) => {
  const [params, setParams] = useState({
    mode: null,
    materia: null,
    tema: null,
    token: null,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.get("mode");
    const materia = searchParams.get("materia");
    const tema = searchParams.get("tema");
    const token = searchParams.get("token");

    if (mode === "conPreguntas" && materia && tema && token) {
      setParams({ mode, materia, tema, token });
      onParamsLoaded?.({ mode, materia, tema, token });
    }
  }, []);

  return params;
};
