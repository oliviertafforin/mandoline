import React, { createContext, useState, ReactNode } from "react";
import { ResultatRecherche } from "../services/recherche";

interface ContextProps {
  resultats: ResultatRecherche[];
  setResultats: (results: ResultatRecherche[]) => void;
  // Ajoutez d'autres états ou fonctions globales ici
}

export const Context = createContext<ContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resultats, setResultats] = useState<ResultatRecherche[]>([]);

  return (
    <Context.Provider value={{ resultats, setResultats }}>
      {children}
    </Context.Provider>
  );
};
