import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, ScrollView } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { CategorieFiltrePharmacie } from "../data/pharmacies";

type OptionFiltre = {
  cle: CategorieFiltrePharmacie;
  libelle: string;
  icone: ComponentProps<typeof Ionicons>["name"];
};

const FILTRES: OptionFiltre[] = [
  { cle: "toutes", libelle: "Toutes (8)", icone: "checkmark" },
  { cle: "24h", libelle: "Ouvertes 24h/24", icone: "time-outline" },
  { cle: "nuit", libelle: "Garde de nuit", icone: "moon-outline" },
];

export type FiltresListePharmaciesProps = {
  actif: CategorieFiltrePharmacie;
  onChange: (categorie: CategorieFiltrePharmacie) => void;
};

/** Puces de filtrage horizontales (Toutes, Ouvertes 24h/24, Garde de nuit). */
export function FiltresListePharmacies({
  actif,
  onChange,
}: FiltresListePharmaciesProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: espacements.s }}
    >
      {FILTRES.map((filtre) => {
        const estActif = filtre.cle === actif;
        const couleur = estActif ? "primaire" : "texteSecondaire";

        return (
          <Pressable
            key={filtre.cle}
            accessibilityRole="button"
            accessibilityLabel={filtre.libelle}
            accessibilityState={{ selected: estActif }}
            onPress={() => onChange(filtre.cle)}
            style={{
              minHeight: 34,
              flexDirection: "row",
              alignItems: "center",
              gap: espacements.xs + 2,
              paddingHorizontal: espacements.s + espacements.xs + 2,
              paddingVertical: espacements.xs + 2,
              borderRadius: rayons.complet,
              backgroundColor: estActif
                ? couleurs.primaireConteneur
                : couleurs.surface,
              borderWidth: 1,
              borderColor: estActif ? couleurs.primaire : couleurs.bordure,
            }}
          >
            <Ionicons name={filtre.icone} size={15} color={couleurs[couleur]} />
            <Texte
              variante="legende"
              poids={estActif ? "semiGras" : "moyen"}
              couleur={couleur}
            >
              {filtre.libelle}
            </Texte>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
