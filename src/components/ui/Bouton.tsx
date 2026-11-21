import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

import { Texte } from "./Texte";

type NomIcone = ComponentProps<typeof Ionicons>["name"];

export type BoutonProps = {
  libelle: string;
  onPress?: () => void;
  /** `primaire` : plein · `secondaire` : contour. */
  type?: "primaire" | "secondaire";
  /** État « désactivé » (les états normal / pressé sont gérés automatiquement). */
  desactive?: boolean;
  icone?: NomIcone;
  iconeDroite?: NomIcone;
  style?: StyleProp<ViewStyle>;
};

/** Bouton 48 px, rayon 12 — variantes primaire / secondaire × états normal, pressé, désactivé. */
export function Bouton({
  libelle,
  onPress,
  type = "primaire",
  desactive = false,
  icone,
  iconeDroite,
  style,
}: BoutonProps) {
  const { couleurs, espacements, rayons } = useTheme();
  const primaire = type === "primaire";
  const couleurTexte = primaire
    ? "surPrimaire"
    : desactive
      ? "texteSecondaire"
      : "primaire";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={libelle}
      accessibilityState={{ disabled: desactive }}
      disabled={desactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: espacements.xxl,
          borderRadius: rayons.moyen,
          gap: espacements.s,
          paddingHorizontal: espacements.m,
        },
        primaire
          ? {
              backgroundColor: pressed
                ? couleurs.primairePresse
                : couleurs.primaire,
              opacity: desactive ? 0.4 : 1,
            }
          : {
              backgroundColor: pressed
                ? couleurs.primaireConteneur
                : "transparent",
              borderColor: desactive ? couleurs.bordure : couleurs.primaire,
              borderWidth: 1.5,
            },
        style,
      ]}
    >
      {icone && (
        <Ionicons name={icone} size={20} color={couleurs[couleurTexte]} />
      )}
      <Texte variante="corps" poids="semiGras" couleur={couleurTexte}>
        {libelle}
      </Texte>
      {iconeDroite && (
        <Ionicons name={iconeDroite} size={20} color={couleurs[couleurTexte]} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
