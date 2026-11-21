import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";

import { BarreRechercheCarte } from "../components/BarreRechercheCarte";
import { CarteBastos } from "../components/CarteBastos";
import { FichePharmacieActive } from "../components/FichePharmacieActive";
import { pharmaciesService } from "../services/pharmaciesService";

/** Onglet 1 — Accueil : carte interactive de Bastos et fiche de garde. */
export function EcranAccueil() {
  const { couleurs, espacements } = useTheme();
  const router = useRouter();
  const pharmacies = pharmaciesService.listerPharmacies();
  const [recherche, setRecherche] = useState("Pharmacies de garde à Bastos");
  const [idActif, setIdActif] = useState(pharmacies[0].id);

  const pharmacieActive = pharmaciesService.obtenirPharmacieParId(idActif);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: couleurs.carteFond }}
    >
      <View style={{ flex: 1, backgroundColor: couleurs.carteFond }}>
        {/* Carte stylisée de Bastos et marqueurs d'officines */}
        <CarteBastos
          pharmacies={pharmacies}
          idActif={pharmacieActive.id}
          onSelectPharmacie={setIdActif}
          onRecentrer={() => setIdActif(pharmacies[0].id)}
        />

        {/* Barre de recherche flottante en pilule */}
        <View
          style={{
            position: "absolute",
            top: espacements.s + espacements.xs,
            left: espacements.m,
            right: espacements.m,
            zIndex: 30,
          }}
        >
          <BarreRechercheCarte valeur={recherche} onChangeText={setRecherche} />
        </View>

        {/* Fiche modale de la pharmacie sélectionnée (Bottom Sheet) */}
        <FichePharmacieActive
          pharmacie={pharmacieActive}
          onOuvrirDetail={(pharmacie) =>
            router.push({
              pathname: "/accueil/[id]",
              params: { id: pharmacie.id },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
