import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { RoleInscription } from "../hooks/useFormulaireInscription";

type Option = {
  cle: RoleInscription;
  libelle: string;
  icone: ComponentProps<typeof Ionicons>["name"];
};

const OPTIONS: Option[] = [
  { cle: "utilisateur", libelle: "Utilisateur", icone: "person-outline" },
  {
    cle: "pharmacien",
    libelle: "Pharmacien",
    icone: "swap-horizontal-outline",
  },
];

export type SelecteurRoleProps = {
  valeur: RoleInscription;
  onChange: (role: RoleInscription) => void;
};

/** Contrôle segmenté : Utilisateur / Pharmacien. */
export function SelecteurRole({ valeur, onChange }: SelecteurRoleProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      style={{
        flexDirection: "row",
        padding: espacements.xs,
        gap: espacements.xs,
        borderRadius: rayons.moyen,
        borderWidth: 1,
        borderColor: couleurs.bordure,
        backgroundColor: couleurs.surface,
      }}
    >
      {OPTIONS.map((option) => {
        const actif = option.cle === valeur;
        const couleur = actif ? "surPrimaire" : "texteSecondaire";

        return (
          <Pressable
            key={option.cle}
            accessibilityRole="radio"
            accessibilityLabel={option.libelle}
            accessibilityState={{ selected: actif }}
            onPress={() => onChange(option.cle)}
            style={{
              flex: 1,
              minHeight: espacements.xxl - espacements.s,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: espacements.s,
              borderRadius: rayons.moyen - espacements.xs,
              backgroundColor: actif ? couleurs.primaire : "transparent",
            }}
          >
            <Ionicons name={option.icone} size={16} color={couleurs[couleur]} />
            <Texte variante="secondaire" poids="semiGras" couleur={couleur}>
              {option.libelle}
            </Texte>
          </Pressable>
        );
      })}
    </View>
  );
}
