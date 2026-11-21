import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, View } from "react-native";

import { Badge, Bouton, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { PharmacieGarde } from "../data/pharmacies";

export type CarteOfficineListeProps = {
  pharmacie: PharmacieGarde;
  favori: boolean;
  onBasculerFavori: (id: string) => void;
  onOuvrirDetail: (pharmacie: PharmacieGarde) => void;
};

/** Carte d'officine de la vue Liste : badges, favori, distance et actions Appeler / Itinéraire. */
export function CarteOfficineListe({
  pharmacie,
  favori,
  onBasculerFavori,
  onOuvrirDetail,
}: CarteOfficineListeProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        backgroundColor: couleurs.surface,
        borderRadius: rayons.grand,
        borderWidth: 1,
        borderColor: couleurs.bordure,
        padding: espacements.m,
        gap: espacements.s + espacements.xs,
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* Ligne 1 : Badges de statut & Bouton favori (signet) */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: espacements.s,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: espacements.s,
            flex: 1,
          }}
        >
          <Badge
            ton={pharmacie.tonStatut ?? "primaire"}
            point
            libelle={pharmacie.statut}
          />

          {pharmacie.badgeSecondaire ? (
            <Badge
              ton="neutre"
              icone="archive-outline"
              libelle={pharmacie.badgeSecondaire}
            />
          ) : null}

          {pharmacie.quartierCourt ? (
            <Texte variante="legende" poids="moyen" couleur="texteSecondaire">
              {`• ${pharmacie.quartierCourt}`}
            </Texte>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            favori
              ? `Retirer ${pharmacie.nom} des favoris`
              : `Enregistrer ${pharmacie.nom} dans les favoris`
          }
          accessibilityState={{ selected: favori }}
          hitSlop={espacements.s}
          onPress={() => onBasculerFavori(pharmacie.id)}
          style={{
            width: 34,
            height: 34,
            borderRadius: rayons.complet,
            backgroundColor: couleurs.surfaceSecondaire,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={favori ? "bookmark" : "bookmark-outline"}
            size={18}
            color={favori ? couleurs.primaire : couleurs.texteSecondaire}
          />
        </Pressable>
      </View>

      {/* Ligne 2 : Nom de l'officine et adresse (cliquables vers le détail) */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Voir la fiche de ${pharmacie.nom}`}
        onPress={() => onOuvrirDetail(pharmacie)}
        style={{ gap: espacements.xs }}
      >
        <Texte variante="corps" poids="gras">
          {pharmacie.nom}
        </Texte>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.xs + 2,
          }}
        >
          <Ionicons
            name="location-outline"
            size={16}
            color={couleurs.primaire}
          />
          <Texte
            variante="secondaire"
            couleur="texteSecondaire"
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {pharmacie.adresseCourte}
          </Texte>
        </View>
      </Pressable>

      {/* Séparateur */}
      <View style={{ height: 1, backgroundColor: couleurs.bordure }} />

      {/* Ligne 3 : Distance & Téléphone ou Services */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: espacements.s,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.xs + 2,
          }}
        >
          <Ionicons
            name={
              pharmacie.modeTransport === "marche"
                ? "walk-outline"
                : "car-outline"
            }
            size={16}
            color={couleurs.primaire}
          />
          <Texte variante="legende" poids="gras">
            {`${pharmacie.distanceValeur} `}
            <Texte variante="legende" couleur="texteSecondaire">
              {pharmacie.distanceDuree}
            </Texte>
          </Texte>
        </View>

        {pharmacie.telephoneInfo ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: espacements.xs,
            }}
          >
            <Ionicons
              name="call-outline"
              size={14}
              color={couleurs.texteSecondaire}
            />
            <Texte variante="legende" poids="moyen" couleur="texteSecondaire">
              {pharmacie.telephoneInfo}
            </Texte>
          </View>
        ) : pharmacie.infoDroite ? (
          <Texte
            variante="legende"
            poids="moyen"
            couleur="texteSecondaire"
            numberOfLines={1}
          >
            {pharmacie.infoDroite}
          </Texte>
        ) : null}
      </View>

      {/* Ligne 4 : Boutons d'action Appeler & Itinéraire */}
      <View
        style={{
          flexDirection: "row",
          gap: espacements.s + 2,
          paddingTop: 2,
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
          onPress={() => onOuvrirDetail(pharmacie)}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
