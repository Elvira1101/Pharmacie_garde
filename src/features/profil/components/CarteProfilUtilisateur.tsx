import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { Badge, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

/** Carte d'identité du praticien / utilisateur en haut de l'écran Profil. */
export function CarteProfilUtilisateur() {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        backgroundColor: couleurs.surface,
        borderRadius: rayons.grand,
        borderWidth: 1,
        borderColor: couleurs.bordure,
        padding: espacements.m,
        gap: espacements.m,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: espacements.m,
        }}
      >
        <View style={{ position: "relative" }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: rayons.complet,
              backgroundColor: couleurs.primaireConteneur,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="person" size={32} color={couleurs.primaire} />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 22,
              height: 22,
              borderRadius: rayons.complet,
              backgroundColor: couleurs.primaire,
              borderWidth: 2,
              borderColor: couleurs.surface,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="checkmark" size={12} color={couleurs.surPrimaire} />
          </View>
        </View>

        <View style={{ flex: 1, gap: espacements.xs }}>
          <Texte variante="titre2" poids="gras" numberOfLines={1}>
            Dr NGAHANE
          </Texte>
          <Texte variante="legende" couleur="texteSecondaire">
            +237 672 18 90 32
          </Texte>
          <Badge icone="shield-checkmark" libelle="Compte certifié" />
        </View>
      </View>

      {/* Bandeau Rôle officiel & Ville */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: espacements.s + espacements.xs,
          borderRadius: rayons.moyen,
          backgroundColor: couleurs.surfaceSecondaire,
          gap: espacements.s,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.s,
            flex: 1,
          }}
        >
          <Ionicons name="medkit-outline" size={20} color={couleurs.primaire} />
          <View style={{ flex: 1 }}>
            <Texte variante="legende" couleur="texteSecondaire">
              Rôle officiel
            </Texte>
            <Texte variante="secondaire" poids="semiGras" numberOfLines={1}>
              Praticien de Santé
            </Texte>
          </View>
        </View>

        <Badge icone="location-outline" libelle="Yaoundé, CM" />
      </View>
    </View>
  );
}
