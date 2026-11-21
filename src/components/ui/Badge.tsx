import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { useTheme } from "@/theme";

import { Texte } from "./Texte";

export type BadgeProps = {
  libelle: string;
  /** `primaire` : teinte émeraude (garde, statut) · `neutre` : contour discret. */
  ton?: "primaire" | "neutre";
  icone?: ComponentProps<typeof Ionicons>["name"];
  /** Affiche une petite pastille de statut avant le libell�. */
  point?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Pastille arrondie pour statuts et libellés courts. */
export function Badge({
  libelle,
  ton = "primaire",
  icone,
  point = false,
  style,
}: BadgeProps) {
  const { couleurs, espacements, rayons } = useTheme();
  const primaire = ton === "primaire";
  const couleurContenu = primaire ? "primaire" : "texteSecondaire";

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: primaire
            ? couleurs.primaireConteneur
            : couleurs.surface,
          borderColor: primaire ? couleurs.primaireConteneur : couleurs.bordure,
          borderRadius: rayons.complet,
          paddingHorizontal: espacements.s + espacements.xs / 2,
          paddingVertical: espacements.xs,
          gap: espacements.xs,
        },
        style,
      ]}
    >
      {point && (
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: rayons.complet,
            backgroundColor: couleurs.primaire,
          }}
        />
      )}
      {icone && (
        <Ionicons name={icone} size={14} color={couleurs[couleurContenu]} />
      )}
      <Texte variante="legende" poids="moyen" couleur={couleurContenu}>
        {libelle}
      </Texte>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    flexDirection: "row",
  },
});
