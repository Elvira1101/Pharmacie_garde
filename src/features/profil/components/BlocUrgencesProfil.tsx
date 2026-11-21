import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, Pressable, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

/** Bloc d'assistance et d'appels d'urgence prioritaires (SAMU 1510, Police 117). */
export function BlocUrgencesProfil() {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View style={{ gap: espacements.s }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: espacements.xs,
        }}
      >
        <Texte
          variante="legende"
          poids="semiGras"
          couleur="erreur"
          style={{ letterSpacing: 0.5 }}
        >
          {"ASSISTANCE & NUMÉROS D’URGENCE"}
        </Texte>
        <View
          style={{
            paddingHorizontal: espacements.s,
            paddingVertical: 2,
            borderRadius: rayons.petit,
            backgroundColor: couleurs.erreurConteneur,
          }}
        >
          <Texte
            variante="legende"
            poids="gras"
            couleur="erreur"
            style={{ fontSize: 10 }}
          >
            24/7 DIRECT
          </Texte>
        </View>
      </View>

      <View
        style={{
          backgroundColor: couleurs.surface,
          borderRadius: rayons.grand,
          borderWidth: 1,
          borderColor: couleurs.bordure,
          padding: espacements.m,
          gap: espacements.s + espacements.xs,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.s + espacements.xs,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: rayons.petit + 2,
              backgroundColor: couleurs.erreurConteneur,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="alarm-light"
              size={22}
              color={couleurs.erreur}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Texte variante="corps" poids="semiGras">
              Lignes Nationales
            </Texte>
            <Texte variante="legende" couleur="texteSecondaire">
              Accès instantané prioritaire
            </Texte>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: espacements.s }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Appeler le SAMU au 1510"
            onPress={() => Linking.openURL("tel:1510")}
            style={{
              flex: 1,
              minHeight: espacements.xxl,
              borderRadius: rayons.moyen,
              backgroundColor: couleurs.erreurConteneur,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: espacements.xs + 2,
            }}
          >
            <Ionicons name="medkit-outline" size={18} color={couleurs.erreur} />
            <Texte variante="secondaire" poids="semiGras" couleur="erreur">
              SAMU 1510
            </Texte>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Appeler la Police au 117"
            onPress={() => Linking.openURL("tel:117")}
            style={{
              flex: 1,
              minHeight: espacements.xxl,
              borderRadius: rayons.moyen,
              backgroundColor: couleurs.surfaceSecondaire,
              borderWidth: 1,
              borderColor: couleurs.bordure,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: espacements.xs + 2,
            }}
          >
            <Ionicons
              name="shield-outline"
              size={18}
              color={couleurs.textePrincipal}
            />
            <Texte variante="secondaire" poids="semiGras">
              Police 117
            </Texte>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
