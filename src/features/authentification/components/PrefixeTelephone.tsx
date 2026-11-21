import { View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

/** Préfixe du champ téléphone : drapeau et indicatif du Cameroun. */
export function PrefixeTelephone() {
  const { couleurs, espacements } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: espacements.xs,
        paddingRight: espacements.s,
        borderRightWidth: 1,
        borderRightColor: couleurs.bordure,
      }}
    >
      <Texte variante="corps" accessibilityElementsHidden>
        🇨🇲
      </Texte>
      <Texte variante="secondaire" poids="semiGras">
        +237
      </Texte>
    </View>
  );
}
