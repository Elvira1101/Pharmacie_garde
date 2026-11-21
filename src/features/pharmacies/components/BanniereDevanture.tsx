import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { PharmacieGarde } from "../data/pharmacies";

export type BanniereDevantureProps = {
  pharmacie: PharmacieGarde;
};

/** Bannière visuelle de la devanture avec note d'avis et statut d'ouverture en direct. */
export function BanniereDevanture({ pharmacie }: BanniereDevantureProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        height: 168,
        borderRadius: rayons.grand,
        overflow: "hidden",
        backgroundColor: couleurs.primairePresse,
        borderWidth: 1,
        borderColor: couleurs.bordure,
        position: "relative",
      }}
    >
      {/* Décor architectural de secours (affiché sous la photo ou hors-ligne) */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: couleurs.primairePresse,
            gap: espacements.xs,
          },
        ]}
      >
        <Ionicons name="add-circle" size={38} color={couleurs.succes} />
        <Texte
          variante="corps"
          poids="gras"
          couleur="surPrimaire"
          style={{ letterSpacing: 1.2 }}
        >
          {pharmacie.nom.toUpperCase()}
        </Texte>
        <Texte variante="legende" couleur="surPrimaire">
          BASTOS · YAOUNDÉ
        </Texte>
      </View>

      {/* Photo de la devanture */}
      <Image
        source={{ uri: pharmacie.photoUrl }}
        contentFit="cover"
        transition={200}
        accessibilityLabel={`Devanture de ${pharmacie.nom}`}
        style={StyleSheet.absoluteFill}
      />

      {/* Badge supérieur droit : Note & Avis */}
      <View
        style={{
          position: "absolute",
          top: espacements.s + 2,
          right: espacements.s + espacements.xs,
          flexDirection: "row",
          alignItems: "center",
          gap: espacements.xs,
          paddingHorizontal: espacements.s + 2,
          paddingVertical: espacements.xs,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.surface,
          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.18)",
        }}
      >
        <Ionicons name="star" size={14} color={couleurs.etoile} />
        <Texte variante="legende" poids="gras">
          {pharmacie.note}
        </Texte>
        <Texte variante="legende" couleur="texteSecondaire">
          {`(${pharmacie.avis} avis)`}
        </Texte>
      </View>

      {/* Badge inférieur gauche : Ouvert maintenant */}
      <View
        style={{
          position: "absolute",
          bottom: espacements.s + 2,
          left: espacements.s + espacements.xs,
          flexDirection: "row",
          alignItems: "center",
          gap: espacements.xs + 2,
          paddingHorizontal: espacements.s + espacements.xs,
          paddingVertical: espacements.xs,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.surface,
          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.18)",
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
        <Texte variante="legende" poids="semiGras" couleur="primaire">
          Ouvert maintenant
        </Texte>
      </View>
    </View>
  );
}
