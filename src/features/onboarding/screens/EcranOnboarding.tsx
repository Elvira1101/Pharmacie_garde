import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BandeauUrgence, FondHalo, LogoApp } from "@/components/branding";
import { Badge, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import { CarteFonctionnalite } from "../components/CarteFonctionnalite";
import { PaginationPoints } from "../components/PaginationPoints";
import { onboardingService } from "../services/onboardingService";

/** Écran 0 — Introduction : présentation des atouts de l'application. */
export function EcranOnboarding() {
  const { couleurs, espacements } = useTheme();
  const router = useRouter();
  const fonctionnalites = onboardingService.listerFonctionnalites();

  return (
    <View style={{ flex: 1, backgroundColor: couleurs.arrierePlan }}>
      <FondHalo />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: espacements.m,
            gap: espacements.l,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Badge ton="neutre" libelle="Réseau officiel • Cameroun" point />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Passer l'introduction"
              hitSlop={espacements.s}
              onPress={() => router.replace("/bienvenue")}
              style={{ minHeight: espacements.xxl, justifyContent: "center" }}
            >
              <Texte variante="secondaire" poids="semiGras" couleur="primaire">
                Passer ›
              </Texte>
            </Pressable>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", gap: espacements.l }}
          >
            <View style={{ alignItems: "center", gap: espacements.s }}>
              <LogoApp />
              <Texte variante="titre1" style={{ textAlign: "center" }}>
                Pharmacies de garde
              </Texte>
              <Texte
                variante="secondaire"
                couleur="texteSecondaire"
                style={{ textAlign: "center" }}
              >
                Votre guide d’urgence médicale de nuit et de week-end au
                Cameroun
              </Texte>
            </View>

            <View style={{ gap: espacements.s }}>
              {fonctionnalites.map((f) => (
                <CarteFonctionnalite key={f.cle} {...f} />
              ))}
            </View>

            <PaginationPoints total={3} actif={0} />
          </View>

          <BandeauUrgence libelle="Urgence vitale : SAMU 1510 (Sans compte)" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
