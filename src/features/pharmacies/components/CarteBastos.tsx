import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { PharmacieGarde } from "../data/pharmacies";

export type CarteBastosProps = {
  pharmacies: PharmacieGarde[];
  idActif: string;
  onSelectPharmacie: (id: string) => void;
  onRecentrer?: () => void;
};

/**
 * Carte vectorielle stylisée du quartier Bastos (Yaoundé) réalisée en vues natives,
 * compatible Mode Clair / Mode Sombre sans dépendance native supplémentaire.
 */
export function CarteBastos({
  pharmacies,
  idActif,
  onSelectPharmacie,
  onRecentrer,
}: CarteBastosProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View style={[styles.conteneur, { backgroundColor: couleurs.carteFond }]}>
      {/* Espaces verts / Parcs stylisés de Bastos */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "10%",
          left: "-12%",
          width: 220,
          height: 170,
          borderRadius: 96,
          backgroundColor: couleurs.carteParc,
          transform: [{ rotate: "-12deg" }],
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "2%",
          right: "-10%",
          width: 190,
          height: 130,
          borderRadius: 72,
          backgroundColor: couleurs.carteParc,
          transform: [{ rotate: "8deg" }],
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "38%",
          right: "-15%",
          width: 230,
          height: 240,
          borderRadius: 110,
          backgroundColor: couleurs.carteParc,
          transform: [{ rotate: "-18deg" }],
        }}
      />

      {/* Réseau de voies secondaires */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "-5%",
          left: "16%",
          width: 8,
          height: "110%",
          backgroundColor: couleurs.carteRouteSecondaire,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "26%",
          left: "-5%",
          width: "110%",
          height: 8,
          backgroundColor: couleurs.carteRouteSecondaire,
          transform: [{ rotate: "-3deg" }],
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "12%",
          left: "52%",
          width: "65%",
          height: 7,
          backgroundColor: couleurs.carteRouteSecondaire,
          transform: [{ rotate: "62deg" }],
        }}
      />

      {/* Axes principaux */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "45%",
          left: "-10%",
          width: "120%",
          height: 14,
          backgroundColor: couleurs.carteRoute,
          transform: [{ rotate: "-2deg" }],
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "-10%",
          left: "48%",
          width: 14,
          height: "120%",
          backgroundColor: couleurs.carteRoute,
          transform: [{ rotate: "-6deg" }],
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "35%",
          left: "-15%",
          width: "140%",
          height: 15,
          backgroundColor: couleurs.carteRoute,
          transform: [{ rotate: "-46deg" }],
        }}
      />

      {/* Rond-Point Bastos */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "38%",
          left: "61%",
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.carteRoute,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: rayons.complet,
            backgroundColor: couleurs.carteParc,
          }}
        />
      </View>

      {/* Libellés discrets des voies */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "23%",
          left: "59%",
          transform: [{ rotate: "-46deg" }],
        }}
      >
        <Texte
          variante="legende"
          poids="semiGras"
          couleur="texteSecondaire"
          style={{ fontSize: 9, letterSpacing: 0.5 }}
        >
          RUE 1.750 (BASTOS)
        </Texte>
      </View>

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "43%",
          left: "52%",
        }}
      >
        <Texte
          variante="legende"
          poids="semiGras"
          couleur="texteSecondaire"
          style={{ fontSize: 9, letterSpacing: 0.3 }}
        >
          Rond-Point Bastos
        </Texte>
      </View>

      {/* Punaises des pharmacies de garde */}
      {pharmacies.map((pharmacie) => {
        const estActive = pharmacie.id === idActif;

        return (
          <Pressable
            key={pharmacie.id}
            accessibilityRole="button"
            accessibilityLabel={`${pharmacie.nom}, ${pharmacie.statut}`}
            accessibilityState={{ selected: estActive }}
            hitSlop={espacements.s}
            onPress={() => onSelectPharmacie(pharmacie.id)}
            style={{
              position: "absolute",
              top: pharmacie.position.top,
              left: pharmacie.position.left,
              alignItems: "center",
              transform: [{ translateX: -20 }, { translateY: -20 }],
              zIndex: estActive ? 20 : 10,
            }}
          >
            <View
              style={{
                width: estActive ? 42 : 32,
                height: estActive ? 42 : 32,
                borderRadius: rayons.complet,
                backgroundColor: estActive
                  ? couleurs.primaire
                  : couleurs.texteSecondaire,
                borderWidth: estActive ? 2.5 : 1.5,
                borderColor: couleurs.surface,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(15, 23, 42, 0.22)",
              }}
            >
              <Ionicons
                name="add"
                size={estActive ? 24 : 18}
                color={estActive ? couleurs.surPrimaire : couleurs.surface}
              />
            </View>

            {estActive ? (
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: couleurs.primaire,
                  marginTop: -5,
                  transform: [{ rotate: "45deg" }],
                }}
              />
            ) : (
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: rayons.complet,
                  backgroundColor: couleurs.texteSecondaire,
                  marginTop: 2,
                }}
              />
            )}
          </Pressable>
        );
      })}

      {/* Point bleu de géolocalisation utilisateur : « Vous êtes ici (Bastos) » */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "54%",
          left: "38%",
          alignItems: "center",
          transform: [{ translateX: -65 }, { translateY: -18 }],
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: rayons.complet,
            backgroundColor: couleurs.localisationHalo,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: rayons.complet,
              backgroundColor: couleurs.surface,
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.2)",
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: rayons.complet,
                backgroundColor: couleurs.localisation,
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: espacements.xs,
            paddingHorizontal: espacements.s + 2,
            paddingVertical: 2,
            borderRadius: rayons.complet,
            backgroundColor: couleurs.surface,
            borderWidth: 1,
            borderColor: couleurs.bordure,
          }}
        >
          <Texte
            variante="legende"
            poids="semiGras"
            style={{ fontSize: 10, color: couleurs.localisation }}
          >
            Vous êtes ici (Bastos)
          </Texte>
        </View>
      </View>

      {/* Bouton flottant de recentrage de la position */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Recentrer sur ma position"
        onPress={onRecentrer}
        style={{
          position: "absolute",
          right: espacements.m,
          bottom: espacements.m,
          width: 44,
          height: 44,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.surface,
          borderWidth: 1,
          borderColor: couleurs.bordure,
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.14)",
        }}
      >
        <Ionicons name="locate" size={20} color={couleurs.primaire} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
  },
});
