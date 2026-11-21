import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LogoApp } from "@/components/branding";
import { Badge, Bouton, ChampSaisie, Texte } from "@/components/ui";
import { useTheme } from "@/theme";
import { formaterTelephone } from "@/utils/validation";

import { CarteUrgenceConnexion } from "../components/CarteUrgenceConnexion";
import { EncartGardeNuit } from "../components/EncartGardeNuit";
import { PrefixeTelephone } from "../components/PrefixeTelephone";
import { useFormulaireConnexion } from "../hooks/useFormulaireConnexion";

/** Écran 2 — Connexion : formulaire validé avec React Hook Form & Zod. */
export function EcranConnexion() {
  const { couleurs, espacements, rayons } = useTheme();
  const router = useRouter();
  const { control, soumettre } = useFormulaireConnexion(() =>
    router.replace("/accueil/index"),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: couleurs.arrierePlan }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            padding: espacements.m,
            gap: espacements.l,
          }}
        >
          {/* Bandeau supérieur de confiance */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Badge
              icone="shield-checkmark"
              libelle="Service Officiel • Cameroun"
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: espacements.xs,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: rayons.complet,
                  backgroundColor: couleurs.primaire,
                }}
              />
              <Texte variante="legende" couleur="texteSecondaire">
                Réseau actif 24h/7j
              </Texte>
            </View>
          </View>

          {/* En-tête : Logo + Titre + Sous-titre */}
          <View style={{ gap: espacements.s }}>
            <LogoApp taille={52} />
            <View style={{ gap: espacements.xs }}>
              <Texte variante="titre1" accessibilityRole="header">
                Connexion
              </Texte>
              <Texte variante="secondaire" couleur="texteSecondaire">
                Accédez aux pharmacies de garde ouvertes cette nuit
              </Texte>
            </View>
          </View>

          {/* Encart Flash Info Garde de nuit */}
          <EncartGardeNuit />

          {/* Formulaire vertical (React Hook Form + Zod) */}
          <View style={{ gap: espacements.m }}>
            <Controller
              control={control}
              name="telephone"
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <ChampSaisie
                  etiquette="Numéro de téléphone"
                  indice="Orange / MTN / Camtel"
                  prefixe={<PrefixeTelephone />}
                  suffixe={
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color={couleurs.texteSecondaire}
                    />
                  }
                  placeholder="6XX XX XX XX"
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  maxLength={12}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(texte) => onChange(formaterTelephone(texte))}
                  erreur={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="motDePasse"
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <ChampSaisie
                  etiquette="Mot de passe"
                  iconeGauche="lock-closed-outline"
                  placeholder="Votre mot de passe"
                  secureTextEntry
                  autoComplete="current-password"
                  textContentType="password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  erreur={fieldState.error?.message}
                />
              )}
            />

            <View style={{ alignItems: "flex-end" }}>
              <Pressable
                accessibilityRole="link"
                hitSlop={espacements.s}
                style={{ paddingVertical: espacements.xs }}
              >
                <Texte
                  variante="legende"
                  poids="semiGras"
                  couleur="texteSecondaire"
                >
                  Mot de passe oublié ?
                </Texte>
              </Pressable>
            </View>

            <Bouton
              libelle="Se connecter"
              iconeDroite="arrow-forward"
              onPress={soumettre}
            />
          </View>

          {/* Lien centré vers l'inscription */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: espacements.xs,
            }}
          >
            <Texte variante="secondaire" couleur="texteSecondaire">
              Pas encore de compte ?
            </Texte>
            <Pressable
              accessibilityRole="link"
              hitSlop={espacements.s}
              onPress={() => router.push("/inscription")}
            >
              <Texte variante="secondaire" poids="semiGras" couleur="primaire">
                Créer un compte
              </Texte>
            </Pressable>
          </View>

          {/* Aide d'urgence immédiate sans compte */}
          <CarteUrgenceConnexion />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
