import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LogoApp } from "@/components/branding";
import { Badge, Bouton, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import { CartePharmacieFavorite } from "../components/CartePharmacieFavorite";
import { useFavoris } from "../context/FavorisContext";

/** Onglet 3 — Mes Favoris : officines enregistrées et alertes de garde. */
export function EcranFavoris() {
  const { couleurs, espacements, rayons } = useTheme();
  const router = useRouter();
  const { pharmaciesFavorites, nombreFavoris, basculerFavori } = useFavoris();

  const libelleCompteur =
    nombreFavoris > 1
      ? `${nombreFavoris} enregistrées`
      : `${nombreFavoris} enregistrée`;

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: couleurs.arrierePlan }}
    >
      {/* En-tête fixe : Logo, titre, quartier et badge compteur */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: espacements.m,
          paddingVertical: espacements.s + espacements.xs,
          backgroundColor: couleurs.surface,
          borderBottomWidth: 1,
          borderBottomColor: couleurs.bordure,
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
          <LogoApp taille={40} />
          <View style={{ flex: 1 }}>
            <Texte variante="titre2" poids="gras" accessibilityRole="header">
              Mes Favoris
            </Texte>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: espacements.xs + 2,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: rayons.complet,
                  backgroundColor: couleurs.primaire,
                }}
              />
              <Texte variante="legende" couleur="texteSecondaire">
                Yaoundé • Bastos
              </Texte>
            </View>
          </View>
        </View>

        <Badge libelle={libelleCompteur} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: espacements.m,
          gap: espacements.s + espacements.xs,
        }}
      >
        {/* Bannière d'alerte de garde */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: espacements.s + espacements.xs,
            padding: espacements.s + espacements.xs,
            borderRadius: rayons.grand,
            backgroundColor: couleurs.primaireConteneur,
            borderWidth: 1,
            borderColor: couleurs.bordure,
          }}
        >
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: rayons.complet,
              backgroundColor: couleurs.surface,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={18}
              color={couleurs.primaire}
            />
          </View>
          <Texte variante="legende" style={{ flex: 1 }}>
            {"Recevez une "}
            <Texte variante="legende" poids="gras">
              alerte immédiate
            </Texte>
            {
              " dès qu’une de vos officines habituelles passe en garde de nuit ou week-end."
            }
          </Texte>
        </View>

        {/* Cartes des officines favorites */}
        {pharmaciesFavorites.map((pharmacie) => (
          <CartePharmacieFavorite
            key={pharmacie.id}
            pharmacie={pharmacie}
            onRetirerFavori={basculerFavori}
            onOuvrirDetail={(officine) =>
              router.push({
                pathname: "/accueil/[id]",
                params: { id: officine.id },
              })
            }
          />
        ))}

        {pharmaciesFavorites.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              paddingVertical: espacements.xl,
              paddingHorizontal: espacements.m,
              gap: espacements.s,
            }}
          >
            <Ionicons
              name="bookmark-outline"
              size={36}
              color={couleurs.texteSecondaire}
            />
            <Texte variante="corps" poids="semiGras">
              Aucune officine en favori
            </Texte>
            <Texte
              variante="secondaire"
              couleur="texteSecondaire"
              style={{ textAlign: "center" }}
            >
              Ajoutez vos pharmacies habituelles depuis la liste ou la fiche
              détaillée pour y accéder plus rapidement la nuit.
            </Texte>
            <View style={{ width: "100%", marginTop: espacements.s }}>
              <Bouton
                libelle="Parcourir la liste"
                icone="list-outline"
                onPress={() => router.replace("/liste")}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
