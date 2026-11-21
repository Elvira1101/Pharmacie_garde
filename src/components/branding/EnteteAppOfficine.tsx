import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { LogoApp } from "@/components/branding";
import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

export type EnteteAppOfficineProps = {
  titre: string;
  surTitre?: string;
  onRetour?: () => void;
};

/** En-tête supérieur commun aux écrans Détail de l'officine et Réservation. */
export function EnteteAppOfficine({
  titre,
  surTitre,
  onRetour,
}: EnteteAppOfficineProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        minHeight: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: espacements.m,
        paddingVertical: espacements.s,
        backgroundColor: couleurs.surface,
        borderBottomWidth: 1,
        borderBottomColor: couleurs.bordure,
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
        {onRetour ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retour"
            hitSlop={espacements.s}
            onPress={onRetour}
            style={{
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={couleurs.textePrincipal}
            />
          </Pressable>
        ) : null}

        <LogoApp taille={34} />

        <View style={{ flex: 1 }}>
          {surTitre ? (
            <Texte
              variante="legende"
              poids="gras"
              couleur="primaire"
              style={{ fontSize: 10, letterSpacing: 0.6 }}
            >
              {surTitre}
            </Texte>
          ) : null}
          <Texte variante="corps" poids="gras" numberOfLines={1}>
            {titre}
          </Texte>
        </View>
      </View>

      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel="Profil utilisateur"
        style={{
          width: 34,
          height: 34,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.primaire,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="person-outline"
          size={18}
          color={couleurs.surPrimaire}
        />
      </View>
    </View>
  );
}
