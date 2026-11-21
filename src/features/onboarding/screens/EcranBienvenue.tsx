import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BandeauUrgence, FondHalo, LogoApp } from "@/components/branding";
import { Badge, Bouton, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

const TAILLE_TITRE_HERO = 32;

/** Écran 1 — Bienvenue : choix entre connexion et création de compte. */
export function EcranBienvenue() {
  const { couleurs, espacements } = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: couleurs.arrierePlan }}>
      <FondHalo />
      <SafeAreaView
        style={{ flex: 1, padding: espacements.m, gap: espacements.l }}
      >
        <View style={{ alignItems: "center" }}>
          <Badge
            ton="neutre"
            libelle="Réseau d'officines officiel • Cameroun"
            point
          />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: espacements.m,
          }}
        >
          <LogoApp taille={72} halo />
          <Texte
            variante="titre1"
            style={{
              fontSize: TAILLE_TITRE_HERO,
              lineHeight: TAILLE_TITRE_HERO + espacements.s,
            }}
          >
            Pharma-Garde
          </Texte>
          <Texte
            variante="corps"
            couleur="texteSecondaire"
            style={{ textAlign: "center" }}
          >
            {"La pharmacie de garde la plus proche,\nà toute heure"}
          </Texte>
          <Badge
            icone="checkmark-circle"
            libelle="Bastos & Yaoundé • Disponible 24/7 hors-ligne"
          />
        </View>

        <View style={{ gap: espacements.s }}>
          <Bouton
            libelle="Se connecter"
            icone="log-in-outline"
            onPress={() => router.push("/connexion")}
          />
          <Bouton
            type="secondaire"
            libelle="Créer un compte"
            icone="person-add-outline"
            onPress={() => router.push("/inscription")}
          />
          <BandeauUrgence libelle="Urgences de nuit directes sans compte" />
        </View>
      </SafeAreaView>
    </View>
  );
}
