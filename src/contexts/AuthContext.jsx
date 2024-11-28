import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase"; // Importa tu instancia de Firebase Authentication

// * Create the context
const AuthContext = createContext();

// * Auth provider const
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // *State to save current userr
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escucha cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Clean the listenere once the component is unmounted
    return () => unsubscribe();
  }, []);

  // Cerrar sesión
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
