import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import { BarreRechercheCarte } from "../components/BarreRechercheCarte";
import { CarteOfficineListe } from "../components/CarteOfficineListe";
import { EnteteListePharmacies } from "../components/EnteteListePharmacies";
import { FiltresListePharmacies } from "../components/FiltresListePharmacies";
import { useFavoris } from "../context/FavorisContext";
import type { CategorieFiltrePharmacie } from "../data/pharmacies";
import { pharmaciesService } from "../services/pharmaciesService";

/** Onglet 2 — Liste des pharmacies de garde : recherche, filtres et cartes d'officines. */
export function EcranListePharmacies() {
  const { couleurs, espacements } = useTheme();
  const router = useRouter();
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState<CategorieFiltrePharmacie>("toutes");
  const { estFavori, basculerFavori } = useFavoris();

  const pharmaciesFiltrees = pharmaciesService.rechercherPharmacies(
    filtre,
    recherche,
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: couleurs.arrierePlan }}
    >
      {/* En-tête fixe : Titre, barre de recherche et filtres horizontaux */}
      <View
        style={{
          paddingHorizontal: espacements.m,
          paddingTop: espacements.xs,
          paddingBottom: espacements.s + espacements.xs,
          gap: espacements.s + espacements.xs,
          backgroundColor: couleurs.arrierePlan,
        }}
      >
        <EnteteListePharmacies
          onOuvrirCarte={() => router.replace("/accueil/index")}
        />

        <BarreRechercheCarte
          valeur={recherche}
          onChangeText={setRecherche}
          placeholder="Rechercher officine, rue, médicament..."
        />

        <FiltresListePharmacies actif={filtre} onChange={setFiltre} />
      </View>

      {/* Liste défilante des cartes d'officines */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: espacements.m,
          paddingTop: espacements.xs,
          paddingBottom: espacements.l,
          gap: espacements.s + espacements.xs,
        }}
      >
        {pharmaciesFiltrees.map((pharmacie) => (
          <CarteOfficineListe
            key={pharmacie.id}
            pharmacie={pharmacie}
            favori={estFavori(pharmacie.id)}
            onBasculerFavori={basculerFavori}
            onOuvrirDetail={(officine) =>
              router.push({
                pathname: "/accueil/[id]",
                params: { id: officine.id },
              })
            }
          />
        ))}

        {pharmaciesFiltrees.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: espacements.xl,
              gap: espacements.xs,
            }}
          >
            <Texte variante="corps" poids="semiGras">
              Aucune officine trouvée
            </Texte>
            <Texte
              variante="secondaire"
              couleur="texteSecondaire"
              style={{ textAlign: "center" }}
            >
              Essayez un autre mot-clé ou réinitialisez le filtre actif.
            </Texte>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
