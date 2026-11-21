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

import { Bouton, ChampSaisie, Texte } from "@/components/ui";
import { useTheme } from "@/theme";
import { formaterTelephone } from "@/utils/validation";

import { EnteteInscription } from "../components/EnteteInscription";
import { IndicateurForceMotDePasse } from "../components/IndicateurForceMotDePasse";
import { PrefixeTelephone } from "../components/PrefixeTelephone";
import { SelecteurRole } from "../components/SelecteurRole";
import { useFormulaireInscription } from "../hooks/useFormulaireInscription";

/** Écran 3 — Inscription : formulaire validé avec React Hook Form & Zod. */
export function EcranInscription() {
  const { couleurs, espacements, rayons } = useTheme();
  const router = useRouter();
  const { control, force, soumettre } = useFormulaireInscription(() =>
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
          contentContainerStyle={{ padding: espacements.m, gap: espacements.l }}
        >
          <EnteteInscription />

          <View style={{ gap: espacements.xs }}>
            <Texte variante="titre1" accessibilityRole="header">
              Inscription
            </Texte>
            <Texte variante="secondaire" couleur="texteSecondaire">
              Rejoignez le réseau d’officines et d’urgence 24/7 de garde à
              Yaoundé et Douala.
            </Texte>
          </View>

          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <SelecteurRole valeur={value} onChange={onChange} />
            )}
          />

          <View
            style={{
              gap: espacements.m,
              padding: espacements.m,
              borderRadius: rayons.grand,
              borderWidth: 1,
              borderColor: couleurs.bordure,
              backgroundColor: couleurs.surface,
            }}
          >
            <Controller
              control={control}
              name="nom"
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <ChampSaisie
                  etiquette="Nom complet"
                  indice="ex: Mr. Jean Eboa"
                  iconeGauche="id-card-outline"
                  placeholder="Dr / M. Jean Eboa"
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  erreur={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="telephone"
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <ChampSaisie
                  etiquette="Numéro de téléphone"
                  indice="WhatsApp / SMS d'urgence"
                  prefixe={<PrefixeTelephone />}
                  suffixe={
                    <Ionicons
                      name="phone-portrait-outline"
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

            <View style={{ gap: espacements.s }}>
              <Controller
                control={control}
                name="motDePasse"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState,
                }) => (
                  <ChampSaisie
                    etiquette="Mot de passe"
                    indice="Min. 8 caractères"
                    iconeGauche="lock-closed-outline"
                    placeholder="••••••••"
                    secureTextEntry
                    autoComplete="new-password"
                    textContentType="newPassword"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    erreur={fieldState.error?.message}
                  />
                )}
              />
              <IndicateurForceMotDePasse force={force} />
            </View>
          </View>

          <View style={{ gap: espacements.m }}>
            <Bouton
              libelle="Créer mon compte"
              iconeDroite="arrow-forward"
              onPress={soumettre}
            />
            <Texte
              variante="legende"
              couleur="texteSecondaire"
              style={{ textAlign: "center" }}
            >
              {"En créant un compte, vous acceptez les\n"}
              <Texte variante="legende" poids="semiGras" couleur="primaire">
                conditions d’utilisation médicale.
              </Texte>
            </Texte>
          </View>

          <View
            style={{
              alignItems: "center",
              gap: espacements.xs,
              padding: espacements.m,
              borderRadius: rayons.grand,
              backgroundColor: couleurs.surface,
              borderWidth: 1,
              borderColor: couleurs.bordure,
            }}
          >
            <Texte variante="legende" couleur="texteSecondaire">
              Déjà inscrit sur la plateforme ?
            </Texte>
            <Pressable
              accessibilityRole="link"
              hitSlop={espacements.s}
              onPress={() => router.replace("/connexion")}
              style={{
                minHeight: espacements.xxl - espacements.s,
                justifyContent: "center",
              }}
            >
              <Texte variante="secondaire" poids="semiGras" couleur="primaire">
                Se connecter directement ›
              </Texte>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
