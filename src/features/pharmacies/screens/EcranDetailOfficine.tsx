import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EnteteAppOfficine } from "@/components/branding";
import { Badge, Bouton, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import { BanniereDevanture } from "../components/BanniereDevanture";
import { BlocInfosOfficine } from "../components/BlocInfosOfficine";
import { MiniCarteItineraire } from "../components/MiniCarteItineraire";
import { useFavoris } from "../context/FavorisContext";
import { pharmaciesService } from "../services/pharmaciesService";

/** Route dynamique `/accueil/[id]` — Détail complet d'une officine de garde. */
export function EcranDetailOfficine() {
  const { couleurs, espacements, rayons } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { estFavori, basculerFavori } = useFavoris();

  const pharmacie = pharmaciesService.obtenirPharmacieParId(id);
  const favori = estFavori(pharmacie.id);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: couleurs.arrierePlan }}
    >
      {/* En-tête supérieur : CAMEROUN URGENCE / Accueil */}
      <EnteteAppOfficine titre="Accueil" surTitre="CAMEROUN URGENCE" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: espacements.m,
          gap: espacements.m,
        }}
      >
        {/* Barre de navigation locale : ← Retour | Détail de l'officine | ♥ */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retour à la carte"
            onPress={() =>
              router.canGoBack()
                ? router.back()
                : router.replace("/accueil/index")
            }
            style={{
              minHeight: 42,
              flexDirection: "row",
              alignItems: "center",
              gap: espacements.xs + 2,
              paddingHorizontal: espacements.s + espacements.xs,
              borderRadius: rayons.moyen,
              backgroundColor: couleurs.surfaceSecondaire,
              borderWidth: 1,
              borderColor: couleurs.bordure,
            }}
          >
            <Ionicons name="arrow-back" size={18} color={couleurs.primaire} />
            <Texte variante="legende" poids="semiGras">
              Retour
            </Texte>
          </Pressable>

          <Texte
            variante="corps"
            poids="gras"
            accessibilityRole="header"
            style={{ textAlign: "center" }}
          >
            {"Détail de l’officine"}
          </Texte>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              favori ? "Retirer des favoris" : "Ajouter aux favoris"
            }
            accessibilityState={{ selected: favori }}
            onPress={() => basculerFavori(pharmacie.id)}
            style={{
              width: 42,
              height: 42,
              borderRadius: rayons.complet,
              backgroundColor: couleurs.surfaceSecondaire,
              borderWidth: 1,
              borderColor: couleurs.bordure,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name={favori ? "heart" : "heart-outline"}
              size={20}
              color={couleurs.erreur}
            />
          </Pressable>
        </View>

        {/* Photo de la devanture avec note et statut d'ouverture */}
        <BanniereDevanture pharmacie={pharmacie} />

        {/* Titre de l'officine & badges pilules */}
        <View style={{ gap: espacements.s }}>
          <Texte variante="titre1" poids="gras">
            {pharmacie.nom}
          </Texte>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: espacements.s,
            }}
          >
            <Badge icone="moon-outline" libelle={pharmacie.statut} />
            <Badge
              ton="neutre"
              icone="shield-checkmark-outline"
              libelle="Certifiée MinSanté"
            />
          </View>
        </View>

        {/* Bloc structuré : Adresse, Plages de garde, Astreinte & Services */}
        <BlocInfosOfficine pharmacie={pharmacie} />

        {/* Mini-carte d'itinéraire et bouton Ouvrir GPS */}
        <MiniCarteItineraire pharmacie={pharmacie} />

        {/* Note d'information : Service prioritaire de nuit */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.s + 2,
            padding: espacements.s + espacements.xs,
            borderRadius: rayons.moyen,
            backgroundColor: couleurs.primaireConteneur,
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={couleurs.primaire}
          />
          <Texte variante="legende" style={{ flex: 1 }}>
            <Texte variante="legende" poids="gras" couleur="primaire">
              {"Service prioritaire de nuit : "}
            </Texte>
            Sonnez à la grille de garde si le rideau principal est clos.
          </Texte>
        </View>

        {/* Bouton d'action principal : ouvre la modale de réservation */}
        <Bouton
          libelle="Réserver un médicament"
          icone="medkit-outline"
          onPress={() =>
            router.push({
              pathname: "/reservation",
              params: { id: pharmacie.id },
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
