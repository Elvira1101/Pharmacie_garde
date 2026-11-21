import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

/** Encart informatif rassurant sur la synchronisation nocturne des gardes. */
export function EncartGardeNuit() {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: espacements.s + espacements.xs,
        padding: espacements.s + espacements.xs,
        borderRadius: rayons.moyen,
        backgroundColor: couleurs.surfaceSecondaire,
        borderWidth: 1,
        borderColor: couleurs.bordure,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: rayons.petit,
          backgroundColor: couleurs.surface,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="moon-outline" size={18} color={couleurs.primaire} />
      </View>

      <View style={{ flex: 1 }}>
        <Texte variante="secondaire" poids="semiGras" numberOfLines={1}>
          Garde de nuit synchronisée
        </Texte>
        <Texte variante="legende" couleur="texteSecondaire" numberOfLines={1}>
          Yaoundé, Douala, Bafoussam & environs
        </Texte>
      </View>
    </View>
  );
}
