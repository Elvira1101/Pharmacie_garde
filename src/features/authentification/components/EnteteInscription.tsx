import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { LogoApp } from "@/components/branding";
import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

/** En-tête de l'inscription : marque à gauche, mention « Certifié » à droite. */
export function EnteteInscription() {
  const { couleurs, espacements } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: espacements.s,
        }}
      >
        <LogoApp taille={28} />
        <Texte variante="legende" poids="gras" couleur="primaire">
          GARDESANTÉ CAMEROUN
        </Texte>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: espacements.xs,
        }}
      >
        <Ionicons
          name="shield-checkmark-outline"
          size={16}
          color={couleurs.texteSecondaire}
        />
        <Texte variante="legende" couleur="texteSecondaire">
          Certifié
        </Texte>
      </View>
    </View>
  );
}
