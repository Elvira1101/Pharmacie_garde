import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";
import { Pressable, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

type NomIcone = ComponentProps<typeof Ionicons>["name"];

export type LigneParametreProps = {
  icone: NomIcone;
  titre: string;
  sousTitre?: string;
  sousTitrePrimaire?: boolean;
  valeurDroite?: string;
  accent?: boolean;
  onPress?: () => void;
  elementDroite?: ReactNode;
};

/** Ligne d'action ou de réglage sur l'écran Profil (hauteur minimale 56 px). */
export function LigneParametre({
  icone,
  titre,
  sousTitre,
  sousTitrePrimaire = false,
  valeurDroite,
  accent = false,
  onPress,
  elementDroite,
}: LigneParametreProps) {
  const { couleurs, espacements, rayons } = useTheme();

  const contenu = (
    <View
      style={{
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: espacements.m - espacements.xs,
        borderRadius: rayons.moyen,
        backgroundColor: couleurs.surface,
        borderWidth: 1,
        borderColor: couleurs.bordure,
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
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: rayons.petit + 2,
            backgroundColor: accent
              ? couleurs.primaireConteneur
              : couleurs.surfaceSecondaire,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={icone}
            size={20}
            color={accent ? couleurs.primaire : couleurs.texteSecondaire}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Texte variante="corps" poids="semiGras" numberOfLines={1}>
            {titre}
          </Texte>
          {sousTitre ? (
            <Texte
              variante="legende"
              poids={sousTitrePrimaire ? "semiGras" : "regulier"}
              couleur={sousTitrePrimaire ? "primaire" : "texteSecondaire"}
              numberOfLines={1}
            >
              {sousTitre}
            </Texte>
          ) : null}
        </View>
      </View>

      {elementDroite ?? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.xs,
          }}
        >
          {valeurDroite ? (
            <Texte
              variante="legende"
              poids="semiGras"
              couleur="texteSecondaire"
            >
              {valeurDroite}
            </Texte>
          ) : null}
          <Ionicons
            name="chevron-forward"
            size={18}
            color={couleurs.texteSecondaire}
          />
        </View>
      )}
    </View>
  );

  if (!onPress) return contenu;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={titre}
      onPress={onPress}
    >
      {contenu}
    </Pressable>
  );
}
