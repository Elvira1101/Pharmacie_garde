import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, Pressable, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

/** Encart d'accès immédiat aux numéros d'urgence vitale (SAMU 1510, Pompiers 118). */
export function CarteUrgenceConnexion() {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        padding: espacements.m,
        borderRadius: rayons.moyen,
        backgroundColor: couleurs.surfaceSecondaire,
        borderWidth: 1,
        borderColor: couleurs.bordure,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: espacements.s + espacements.xs,
        }}
      >
        <MaterialCommunityIcons
          name="alarm-light"
          size={22}
          color={couleurs.erreur}
        />

        <View style={{ flex: 1, gap: espacements.xs }}>
          <Texte variante="secondaire" poids="semiGras">
            Urgence médicale absolue ?
          </Texte>
          <Texte variante="legende" couleur="texteSecondaire">
            Accès sans compte aux numéros d’urgence vitale.
          </Texte>

          <View
            style={{
              flexDirection: "row",
              gap: espacements.s,
              marginTop: espacements.xs,
            }}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Appeler le SAMU au 1510"
              onPress={() => Linking.openURL("tel:1510")}
              style={{
                flex: 1,
                minHeight: 38,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: espacements.xs,
                borderRadius: rayons.petit,
                backgroundColor: couleurs.surface,
                borderWidth: 1,
                borderColor: couleurs.bordure,
              }}
            >
              <Ionicons name="call" size={14} color={couleurs.erreur} />
              <Texte variante="legende" poids="semiGras">
                SAMU (1510)
              </Texte>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Appeler les Pompiers au 118"
              onPress={() => Linking.openURL("tel:118")}
              style={{
                flex: 1,
                minHeight: 38,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: espacements.xs,
                borderRadius: rayons.petit,
                backgroundColor: couleurs.surface,
                borderWidth: 1,
                borderColor: couleurs.bordure,
              }}
            >
              <Ionicons name="flame" size={14} color={couleurs.erreur} />
              <Texte variante="legende" poids="semiGras">
                Pompiers (118)
              </Texte>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
