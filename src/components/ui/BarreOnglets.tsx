import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, View } from "react-native";

import { useTheme } from "@/theme";

import { Texte } from "./Texte";

type NomIcone = ComponentProps<typeof Ionicons>["name"];

export type OngletBarre = {
  cle: string;
  libelle: string;
  icone: NomIcone;
  iconeActive: NomIcone;
};

/** Les 4 onglets de l'application (Accueil, Liste, Favoris, Profil). */
export const ONGLETS_PAR_DEFAUT: OngletBarre[] = [
  {
    cle: "accueil",
    libelle: "Accueil",
    icone: "home-outline",
    iconeActive: "home",
  },
  {
    cle: "liste",
    libelle: "Liste",
    icone: "list-outline",
    iconeActive: "list",
  },
  {
    cle: "favoris",
    libelle: "Favoris",
    icone: "bookmark-outline",
    iconeActive: "bookmark",
  },
  {
    cle: "profil",
    libelle: "Profil",
    icone: "person-outline",
    iconeActive: "person",
  },
];

export type BarreOngletsProps = {
  actif: string;
  onChange: (cle: string) => void;
  onglets?: OngletBarre[];
  /** Marge inférieure issue de la zone sûre (insets.bottom). */
  margeBas?: number;
};

/**
 * Barre d'onglets (64 px, fond surface) branchée sur Expo Router `<Tabs tabBar={...}>`.
 * Chaque onglet utilise exactement la même pastille pilule (44×28 px, rayon complet)
 * autour de l'icône à l'état actif ou pressé.
 */
export function BarreOnglets({
  actif,
  onChange,
  onglets = ONGLETS_PAR_DEFAUT,
  margeBas = 0,
}: BarreOngletsProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={{
        backgroundColor: couleurs.surface,
        borderColor: couleurs.bordure,
        borderTopWidth: 1,
        paddingBottom: margeBas,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 64,
          paddingHorizontal: espacements.s,
          paddingVertical: espacements.xs,
        }}
      >
        {onglets.map((onglet) => {
          const estActif = onglet.cle === actif;

          return (
            <Pressable
              key={onglet.cle}
              accessibilityRole="tab"
              accessibilityLabel={onglet.libelle}
              accessibilityState={{ selected: estActif }}
              onPress={() => onChange(onglet.cle)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                gap: espacements.xs / 2,
              }}
            >
              {({ pressed }) => {
                const misEnAvant = estActif || pressed;
                const couleur = misEnAvant ? "primaire" : "texteSecondaire";

                return (
                  <>
                    <View
                      style={{
                        width: 44,
                        height: 28,
                        borderRadius: rayons.complet,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: misEnAvant
                          ? couleurs.primaireConteneur
                          : "transparent",
                      }}
                    >
                      <Ionicons
                        name={misEnAvant ? onglet.iconeActive : onglet.icone}
                        size={20}
                        color={couleurs[couleur]}
                      />
                    </View>
                    <Texte
                      variante="legende"
                      poids={misEnAvant ? "gras" : "moyen"}
                      couleur={couleur}
                    >
                      {onglet.libelle}
                    </Texte>
                  </>
                );
              }}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
