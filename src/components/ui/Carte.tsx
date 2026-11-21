import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/theme";

import { Badge } from "./Badge";
import { Bouton } from "./Bouton";
import { Texte } from "./Texte";

export type CarteProps = {
  nom: string;
  adresse: string;
  /** Ex. « 650 m · 8 min à pied ». */
  distance: string;
  /** Ex. « De garde jusqu'à 8h ». */
  statut: string;
  onAppeler?: () => void;
  onItineraire?: () => void;
};

/** Carte d'officine : infos, badge de garde et actions Appeler / Itinéraire. */
export function Carte({
  nom,
  adresse,
  distance,
  statut,
  onAppeler,
  onItineraire,
}: CarteProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        backgroundColor: couleurs.surface,
        borderColor: couleurs.bordure,
        borderWidth: 1,
        borderRadius: rayons.moyen,
        padding: espacements.s,
        gap: espacements.s,
      }}
    >
      <View style={[styles.ligne, { gap: espacements.m }]}>
        <View
          style={[
            styles.vignette,
            {
              backgroundColor: couleurs.primaireConteneur,
              borderRadius: rayons.moyen,
            },
          ]}
        >
          <Ionicons name="medkit-outline" size={28} color={couleurs.primaire} />
        </View>

        <View style={styles.infos}>
          <View style={[styles.ligne, styles.entete]}>
            <Texte
              variante="corps"
              poids="semiGras"
              numberOfLines={1}
              style={styles.infos}
            >
              {nom}
            </Texte>
            <Badge libelle={statut} />
          </View>
          <Texte
            variante="secondaire"
            couleur="texteSecondaire"
            numberOfLines={1}
          >
            {adresse}
          </Texte>
          <View style={[styles.ligne, { gap: espacements.xs }]}>
            <Ionicons
              name="location-outline"
              size={14}
              color={couleurs.primaire}
            />
            <Texte variante="legende" couleur="texteSecondaire">
              {distance}
            </Texte>
          </View>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: couleurs.bordure }} />

      <View style={[styles.ligne, { gap: espacements.s }]}>
        <Bouton
          type="secondaire"
          libelle="Appeler"
          icone="call-outline"
          onPress={onAppeler}
          style={styles.action}
        />
        <Bouton
          libelle="Itinéraire"
          icone="map-outline"
          onPress={onItineraire}
          style={styles.action}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ligne: { alignItems: "center", flexDirection: "row" },
  entete: { justifyContent: "space-between" },
  vignette: {
    alignItems: "center",
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  infos: { flex: 1 },
  action: { flex: 1 },
});
