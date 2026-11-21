import { Linking, Pressable, View } from "react-native";

import { Badge, Bouton, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { PharmacieGarde } from "../data/pharmacies";

export type FichePharmacieActiveProps = {
  pharmacie: PharmacieGarde;
  onOuvrirDetail?: (pharmacie: PharmacieGarde) => void;
};

/** Fiche modale basse (Bottom Sheet) présentant l'officine sélectionnée sur la carte. */
export function FichePharmacieActive({
  pharmacie,
  onOuvrirDetail,
}: FichePharmacieActiveProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        backgroundColor: couleurs.surface,
        borderTopLeftRadius: rayons.grand + espacements.s,
        borderTopRightRadius: rayons.grand + espacements.s,
        borderTopWidth: 1,
        borderColor: couleurs.bordure,
        paddingHorizontal: espacements.m + espacements.xs,
        paddingTop: espacements.s + espacements.xs,
        paddingBottom: espacements.m + espacements.xs,
        gap: espacements.s,
        boxShadow: "0 -8px 24px rgba(15, 23, 42, 0.08)",
      }}
    >
      {/* Poignée de glissement (Drag handle) */}
      <View
        style={{
          width: 48,
          height: 4,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.bordure,
          alignSelf: "center",
          marginBottom: espacements.xs,
        }}
      />

      {/* Zone cliquable vers le détail de l'officine */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Voir les détails de ${pharmacie.nom}`}
        onPress={() => onOuvrirDetail?.(pharmacie)}
        style={{ gap: espacements.s }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: espacements.s,
          }}
        >
          <Texte
            variante="titre2"
            poids="gras"
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {pharmacie.nom}
          </Texte>
          <Badge libelle={pharmacie.statut} />
        </View>

        <View style={{ gap: 2 }}>
          <Texte variante="secondaire" poids="moyen" couleur="texteSecondaire">
            {pharmacie.adresse}
          </Texte>
          <Texte variante="legende" couleur="texteSecondaire">
            {pharmacie.distance}
          </Texte>
        </View>
      </Pressable>

      {/* Actions Appeler & Itinéraire (48 px) */}
      <View
        style={{
          flexDirection: "row",
          gap: espacements.s + espacements.xs,
          marginTop: espacements.xs,
        }}
      >
        <Bouton
          type="secondaire"
          libelle="Appeler"
          icone="call-outline"
          onPress={() => Linking.openURL(`tel:${pharmacie.telephone}`)}
          style={{ flex: 1 }}
        />
        <Bouton
          libelle="Itinéraire"
          icone="navigate-outline"
          onPress={() => onOuvrirDetail?.(pharmacie)}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
