import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EnteteAppOfficine } from "@/components/branding";
import { Texte } from "@/components/ui";
import { useFavoris } from "@/features/pharmacies";
import { useTheme } from "@/theme";

import { BlocUrgencesProfil } from "../components/BlocUrgencesProfil";
import { CarteProfilUtilisateur } from "../components/CarteProfilUtilisateur";
import { LigneParametre } from "../components/LigneParametre";

/** Onglet 4 — Profil : compte certifié, activité, thème sombre en direct et urgences. */
export function EcranProfil() {
  const { couleurs, espacements, rayons, estSombre, basculerTheme } =
    useTheme();
  const router = useRouter();
  const { pharmaciesFavorites, nombreFavoris } = useFavoris();

  const resumeFavoris =
    nombreFavoris === 0
      ? "Aucune officine enregistrée"
      : nombreFavoris === 1
        ? pharmaciesFavorites[0].nom
        : `${pharmaciesFavorites[0].nom} (+${nombreFavoris - 1})`;

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: couleurs.arrierePlan }}
    >
      <EnteteAppOfficine titre="Profil" surTitre="CAMEROUN URGENCE" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: espacements.m,
          gap: espacements.m + espacements.xs,
        }}
      >
        {/* Identité du compte */}
        <CarteProfilUtilisateur />

        {/* Section Activité Officine */}
        <View style={{ gap: espacements.s }}>
          <Texte
            variante="legende"
            poids="semiGras"
            couleur="texteSecondaire"
            style={{ letterSpacing: 0.5, paddingHorizontal: espacements.xs }}
          >
            ACTIVITÉ OFFICINE
          </Texte>

          <LigneParametre
            icone="bag-handle-outline"
            titre="Mes réservations"
            sousTitre="2 commandes en cours"
            sousTitrePrimaire
            accent
            onPress={() => router.push("/reservation")}
          />

          <LigneParametre
            icone="heart-outline"
            titre="Pharmacies favorites"
            sousTitre={resumeFavoris}
            accent
            onPress={() => router.replace("/favoris")}
          />
        </View>

        {/* Section Préférences Système */}
        <View style={{ gap: espacements.s }}>
          <Texte
            variante="legende"
            poids="semiGras"
            couleur="texteSecondaire"
            style={{ letterSpacing: 0.5, paddingHorizontal: espacements.xs }}
          >
            PRÉFÉRENCES SYSTÈME
          </Texte>

          <LigneParametre
            icone="language-outline"
            titre="Langue"
            valeurDroite="Français"
          />

          <LigneParametre
            icone={estSombre ? "sunny-outline" : "moon-outline"}
            titre="Thème sombre"
            sousTitre={estSombre ? "Mode sombre actif" : "Mode clair actif"}
            elementDroite={
              <Switch
                accessibilityLabel="Activer ou désactiver le thème sombre"
                value={estSombre}
                onValueChange={basculerTheme}
                trackColor={{
                  false: couleurs.bordure,
                  true: couleurs.primaire,
                }}
                thumbColor={couleurs.surface}
              />
            }
          />
        </View>

        {/* Section Assistance & Numéros d'urgence */}
        <BlocUrgencesProfil />

        {/* Déconnexion */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Se déconnecter"
          onPress={() => router.replace("/connexion")}
          style={{
            minHeight: espacements.xxl,
            borderRadius: rayons.moyen,
            backgroundColor: couleurs.erreurConteneur,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: espacements.s,
          }}
        >
          <Ionicons name="log-out-outline" size={20} color={couleurs.erreur} />
          <Texte variante="corps" poids="semiGras" couleur="erreur">
            Se déconnecter
          </Texte>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
