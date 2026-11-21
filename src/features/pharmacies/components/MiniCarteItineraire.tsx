import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { PharmacieGarde } from "../data/pharmacies";

export type MiniCarteItineraireProps = {
  pharmacie: PharmacieGarde;
};

/** Mini-carte d'aperçu d'itinéraire avec bouton d'ouverture directe du GPS. */
export function MiniCarteItineraire({ pharmacie }: MiniCarteItineraireProps) {
  const { couleurs, espacements, rayons } = useTheme();

  function ouvrirGps() {
    const requete = encodeURIComponent(
      `${pharmacie.nom} ${pharmacie.adresseCourte} Yaoundé`,
    );
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${requete}`,
    );
  }

  return (
    <View
      style={{
        height: 92,
        borderRadius: rayons.grand,
        overflow: "hidden",
        backgroundColor: couleurs.carteFond,
        borderWidth: 1,
        borderColor: couleurs.bordure,
        justifyContent: "center",
        paddingHorizontal: espacements.m,
      }}
    >
      {/* Trame routière stylisée de la mini-carte */}
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}
      >
        <View
          style={{
            position: "absolute",
            top: -15,
            left: "20%",
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: couleurs.carteParc,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: -20,
            right: "15%",
            width: 110,
            height: 80,
            borderRadius: 40,
            backgroundColor: couleurs.carteParc,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: "48%",
            left: -10,
            right: -10,
            height: 10,
            backgroundColor: couleurs.carteRoute,
            transform: [{ rotate: "-6deg" }],
          }}
        />
        <View
          style={{
            position: "absolute",
            top: -10,
            bottom: -10,
            left: "52%",
            width: 10,
            backgroundColor: couleurs.carteRoute,
            transform: [{ rotate: "18deg" }],
          }}
        />
        <Texte
          variante="secondaire"
          poids="semiGras"
          couleur="textePrincipal"
          style={{
            position: "absolute",
            bottom: espacements.s,
            left: "44%",
            opacity: 0.75,
          }}
        >
          Yaoundé
        </Texte>
      </View>

      {/* Contenu superposé : Itinéraire + Bouton Ouvrir GPS */}
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
            paddingHorizontal: espacements.s + espacements.xs,
            paddingVertical: espacements.s,
            borderRadius: rayons.moyen,
            backgroundColor: couleurs.surface,
            borderWidth: 1,
            borderColor: couleurs.bordure,
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.1)",
          }}
        >
          <Ionicons
            name="return-up-forward"
            size={16}
            color={couleurs.primaire}
          />
          <Texte variante="legende" poids="semiGras">
            {pharmacie.itineraireRue}
          </Texte>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ouvrir l'itinéraire dans le GPS"
          onPress={ouvrirGps}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.xs + 2,
            paddingHorizontal: espacements.s + espacements.xs,
            paddingVertical: espacements.s,
            borderRadius: rayons.moyen,
            backgroundColor: pressed
              ? couleurs.primairePresse
              : couleurs.primaire,
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.16)",
          })}
        >
          <Texte variante="legende" poids="semiGras" couleur="surPrimaire">
            Ouvrir GPS
          </Texte>
          <Ionicons
            name="open-outline"
            size={15}
            color={couleurs.surPrimaire}
          />
        </Pressable>
      </View>
    </View>
  );
}
