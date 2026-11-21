import { createContext, useContext, useState, type ReactNode } from "react";

import type { PharmacieGarde } from "../data/pharmacies";
import { pharmaciesService } from "../services/pharmaciesService";

type ContexteFavorisValeur = {
  estFavori: (id: string) => boolean;
  basculerFavori: (id: string) => void;
  pharmaciesFavorites: PharmacieGarde[];
  nombreFavoris: number;
};

const ContexteFavoris = createContext<ContexteFavorisValeur | null>(null);

/** État partagé des pharmacies favorites entre Accueil, Liste, Détail, Favoris et Profil. */
export function FavorisProvider({ children }: { children: ReactNode }) {
  const [favoris, setFavoris] = useState<Record<string, boolean>>(() =>
    pharmaciesService.obtenirFavorisInitiaux(),
  );

  function estFavori(id: string) {
    return Boolean(favoris[id]);
  }

  function basculerFavori(id: string) {
    setFavoris((actuels) => ({ ...actuels, [id]: !actuels[id] }));
  }

  const pharmaciesFavorites = pharmaciesService
    .listerPharmacies()
    .filter((p) => Boolean(favoris[p.id]));

  return (
    <ContexteFavoris.Provider
      value={{
        estFavori,
        basculerFavori,
        pharmaciesFavorites,
        nombreFavoris: pharmaciesFavorites.length,
      }}
    >
      {children}
    </ContexteFavoris.Provider>
  );
}

/** Accède aux favoris partagés dans toute l'application. */
export function useFavoris(): ContexteFavorisValeur {
  const contexte = useContext(ContexteFavoris);
  if (!contexte) {
    throw new Error("useFavoris doit être utilisé dans un FavorisProvider.");
  }
  return contexte;
}
