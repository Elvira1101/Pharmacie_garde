import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { LogoApp } from "@/components/branding";
import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

export type EnteteListePharmaciesProps = {
  onOuvrirCarte?: () => void;
};

/** En-tête de l'écran Liste : logo, titre, compteur d'officines ouvertes et bouton carte. */
export function EnteteListePharmacies({
  onOuvrirCarte,
}: EnteteListePharmaciesProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: espacements.s,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: espacements.s + espacements.xs,
          flex: 1,
        }}
      >
        <LogoApp taille={42} />

        <View style={{ flex: 1 }}>
          <Texte
            variante="titre2"
            poids="gras"
            accessibilityRole="header"
            numberOfLines={1}
          >
            Pharmacies de garde
          </Texte>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: espacements.xs + 2,
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: rayons.complet,
                backgroundColor: couleurs.primaire,
              }}
            />
            <Texte
              variante="legende"
              couleur="texteSecondaire"
              numberOfLines={1}
            >
              {"Bastos • Yaoundé "}
              <Texte variante="legende" poids="semiGras" couleur="primaire">
                (8 ouvertes)
              </Texte>
            </Texte>
          </View>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Afficher la carte de Bastos"
        onPress={onOuvrirCarte}
        style={{
          width: 40,
          height: 40,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.primaireConteneur,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="paper-plane-outline"
          size={19}
          color={couleurs.primaire}
        />
      </Pressable>
    </View>
  );
}
