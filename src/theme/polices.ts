import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { typographie } from "./tokens";

type Poids = keyof typeof typographie.poids;

/** Fichiers de police à charger au démarrage (voir `useFonts` dans `app/_layout.tsx`). */
export const policesACharger = {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
};

/**
 * React Native a besoin d'une famille distincte par graisse :
 * on associe donc chaque poids de `tokens.ts` à la police chargée correspondante.
 */
export const famillePolice: Record<Poids, keyof typeof policesACharger> = {
  regulier: "Roboto_400Regular",
  moyen: "Roboto_500Medium",
  semiGras: "Roboto_600SemiBold",
  gras: "Roboto_700Bold",
};
