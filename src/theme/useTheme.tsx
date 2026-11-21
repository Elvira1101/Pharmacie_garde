import { createContext, useContext, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";

import {
  couleurs,
  espacements,
  rayons,
  typographie,
  type ThemeClair,
  type ThemeSombre,
} from "./tokens";

export type CouleursActives = ThemeClair | ThemeSombre;
export type PreferenceTheme = "systeme" | "clair" | "sombre";

export type Theme = {
  couleurs: CouleursActives;
  espacements: typeof espacements;
  rayons: typeof rayons;
  typographie: typeof typographie;
  estSombre: boolean;
  preference: PreferenceTheme;
  basculerTheme: () => void;
};

type ContexteThemeValeur = {
  preference: PreferenceTheme;
  setPreference: (preference: PreferenceTheme) => void;
};

const ContexteTheme = createContext<ContexteThemeValeur | null>(null);

/** Fournisseur de thème global : suit le système par défaut et autorise la bascule manuelle. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<PreferenceTheme>("systeme");

  return (
    <ContexteTheme.Provider value={{ preference, setPreference }}>
      {children}
    </ContexteTheme.Provider>
  );
}

/** Retourne les tokens du thème actif (clair / sombre) et l'action de bascule. */
export function useTheme(): Theme {
  const schemaSysteme = useColorScheme();
  const contexte = useContext(ContexteTheme);
  const preference = contexte?.preference ?? "systeme";

  const estSombre =
    preference === "systeme"
      ? schemaSysteme === "dark"
      : preference === "sombre";

  function basculerTheme() {
    contexte?.setPreference(estSombre ? "clair" : "sombre");
  }

  return {
    couleurs: estSombre ? couleurs.sombre : couleurs.clair,
    espacements,
    rayons,
    typographie,
    estSombre,
    preference,
    basculerTheme,
  };
}
