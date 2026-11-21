import { Text as RNText, type TextProps } from "react-native";

import {
  famillePolice,
  useTheme,
  type CouleursActives,
  type Typographie,
} from "@/theme";

type Variante = keyof Typographie["tailles"];
type Poids = keyof Typographie["poids"];

const hauteursDeLigne: Record<Variante, number> = {
  titre1: 32,
  titre2: 28,
  corps: 24,
  secondaire: 20,
  legende: 16,
};

const poidsParDefaut: Record<Variante, Poids> = {
  titre1: "gras",
  titre2: "semiGras",
  corps: "regulier",
  secondaire: "regulier",
  legende: "regulier",
};

export type TexteProps = TextProps & {
  variante?: Variante;
  poids?: Poids;
  /** Clé de couleur du thème (défaut : `textePrincipal`). */
  couleur?: keyof CouleursActives;
};

/** Texte typographié selon les tokens (taille, graisse, interligne, couleur du thème). */
export function Texte({
  variante = "corps",
  poids,
  couleur = "textePrincipal",
  style,
  ...reste
}: TexteProps) {
  const { couleurs, typographie } = useTheme();

  return (
    <RNText
      {...reste}
      style={[
        {
          fontFamily: famillePolice[poids ?? poidsParDefaut[variante]],
          fontSize: typographie.tailles[variante],
          lineHeight: hauteursDeLigne[variante],
          color: couleurs[couleur],
        },
        style,
      ]}
    />
  );
}
