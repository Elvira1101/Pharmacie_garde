import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, View } from "react-native";

import { Badge, Bouton, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { PharmacieGarde } from "../data/pharmacies";

export type CartePharmacieFavoriteProps = {
  pharmacie: PharmacieGarde;
  onRetirerFavori: (id: string) => void;
  onOuvrirDetail: (pharmacie: PharmacieGarde) => void;
};

/** Carte d'une pharmacie enregistrée dans l'onglet « Mes Favoris ». */
export function CartePharmacieFavorite({
  pharmacie,
  onRetirerFavori,
  onOuvrirDetail,
}: CartePharmacieFavoriteProps) {
  const { couleurs, espacements, rayons } = useTheme();
  const estOuverte = pharmacie.estOuverte;

  return (
    <View
      style={{
        backgroundColor: couleurs.surface,
        borderRadius: rayons.grand,
        borderWidth: 1,
        borderColor: couleurs.bordure,
        padding: espacements.m,
        gap: espacements.s + espacements.xs,
        opacity: estOuverte ? 1 : 0.9,
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* En-tête : Badges statut & bouton signet actif */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: espacements.s,
        }}
      >
        <View style={{ flex: 1, gap: espacements.xs }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: espacements.xs + 2,
            }}
          >
            <Badge
              ton={estOuverte ? "primaire" : "neutre"}
              point
              libelle={pharmacie.statutFavori ?? pharmacie.statut}
            />
            {pharmacie.prioritaire ? (
              <Badge ton="neutre" icone="pin-outline" libelle="Prioritaire" />
            ) : null}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Voir la fiche de ${pharmacie.nom}`}
            onPress={() => onOuvrirDetail(pharmacie)}
          >
            <Texte variante="corps" poids="gras" numberOfLines={1}>
              {pharmacie.nom}
            </Texte>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Retirer ${pharmacie.nom} des favoris`}
          hitSlop={espacements.s}
          onPress={() => onRetirerFavori(pharmacie.id)}
          style={{
            width: 34,
            height: 34,
            borderRadius: rayons.complet,
            backgroundColor: couleurs.primaireConteneur,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="bookmark" size={18} color={couleurs.primaire} />
        </Pressable>
      </View>

      {/* Adresse, horaire & distance */}
      <View style={{ gap: espacements.xs }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.xs + 2,
          }}
        >
          <Ionicons
            name="location-outline"
            size={15}
            color={couleurs.texteSecondaire}
          />
          <Texte
            variante="legende"
            couleur="texteSecondaire"
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {`${pharmacie.adresseCourte} • `}
            <Texte
              variante="legende"
              poids="semiGras"
              couleur={estOuverte ? "primaire" : "textePrincipal"}
            >
              {pharmacie.distanceValeur}
            </Texte>
          </Texte>
        </View>

        {pharmacie.infoFavori ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: espacements.xs + 2,
            }}
          >
            <Ionicons
              name={estOuverte ? "time-outline" : "calendar-outline"}
              size={15}
              color={estOuverte ? couleurs.primaire : couleurs.texteSecondaire}
            />
            <Texte
              variante="legende"
              poids={estOuverte ? "moyen" : "regulier"}
              couleur={estOuverte ? "textePrincipal" : "texteSecondaire"}
            >
              {pharmacie.infoFavori}
            </Texte>
          </View>
        ) : null}
      </View>

      {/* Actions Appeler & Itinéraire / Détails */}
      <View style={{ flexDirection: "row", gap: espacements.s }}>
        <Bouton
          type="secondaire"
          libelle="Appeler"
          icone="call-outline"
          onPress={() => Linking.openURL(`tel:${pharmacie.telephone}`)}
          style={{ flex: 1 }}
        />
        <Bouton
          type={estOuverte ? "primaire" : "secondaire"}
          libelle={estOuverte ? "Itinéraire" : "Détails"}
          icone={estOuverte ? "navigate-outline" : "information-circle-outline"}
          onPress={() => onOuvrirDetail(pharmacie)}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
