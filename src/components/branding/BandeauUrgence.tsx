import { Linking, Pressable } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

export const NUMERO_SAMU = "1510";

export type BandeauUrgenceProps = {
  libelle: string;
  numero?: string;
};

/** Lien d'urgence vitale (rouge) : un appui lance l'appel, sans compte requis. */
export function BandeauUrgence({
  libelle,
  numero = NUMERO_SAMU,
}: BandeauUrgenceProps) {
  const { espacements } = useTheme();

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${libelle}. Appeler le ${numero}`}
      hitSlop={espacements.s}
      onPress={() => Linking.openURL(`tel:${numero}`)}
      style={{ minHeight: espacements.xxl, justifyContent: "center" }}
    >
      <Texte
        variante="legende"
        poids="semiGras"
        couleur="erreur"
        style={{ textAlign: "center" }}
      >
        {`✱ ${libelle}`}
      </Texte>
    </Pressable>
  );
}
