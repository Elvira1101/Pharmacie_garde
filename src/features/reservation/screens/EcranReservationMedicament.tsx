import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EnteteAppOfficine } from "@/components/branding";
import { Bouton, ChampSaisie, Texte } from "@/components/ui";
import { pharmaciesService } from "@/features/pharmacies";
import { useTheme } from "@/theme";

import { ZoneOrdonnance } from "../components/ZoneOrdonnance";
import { useFormulaireReservation } from "../hooks/useFormulaireReservation";

/** Modale — Réserver un médicament : formulaire React Hook Form + Zod. */
export function EcranReservationMedicament() {
  const { couleurs, espacements, rayons } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const pharmacie = pharmaciesService.obtenirPharmacieParId(id);

  const formulaire = useFormulaireReservation();

  function fermerModale() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.dismissTo("/accueil/index");
    }
  }

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1, backgroundColor: couleurs.arrierePlan }}
    >
      {/* Barre supérieure de modale : ← Logo Détails Pharmacie | Avatar */}
      <EnteteAppOfficine titre="Détails Pharmacie" onRetour={fermerModale} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            padding: espacements.m,
            gap: espacements.m + espacements.xs,
          }}
        >
          {/* Lien secondaire ← Retour */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retour aux détails de la pharmacie"
            hitSlop={espacements.s}
            onPress={fermerModale}
            style={{
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              gap: espacements.xs + 2,
              paddingVertical: espacements.xs,
            }}
          >
            <Ionicons name="arrow-back" size={18} color={couleurs.primaire} />
            <Texte variante="secondaire" poids="semiGras" couleur="primaire">
              Retour
            </Texte>
          </Pressable>

          {/* Titre et sous-titre */}
          <View style={{ gap: espacements.xs }}>
            <Texte variante="titre2" poids="gras" accessibilityRole="header">
              Réserver un médicament
            </Texte>
            <Texte variante="secondaire" couleur="texteSecondaire">
              Indiquez les détails de votre ordonnance ou du produit nécessaire
              pour cette nuit.
            </Texte>
          </View>

          {/* Champ 1 : Nom du médicament (validé par Zod + React Hook Form) */}
          <Controller
            control={formulaire.control}
            name="nomMedicament"
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <ChampSaisie
                etiquette="Nom du médicament"
                indice="Requis"
                placeholder="Ex: Paracétamol 1000mg, Amoxicilline..."
                value={value}
                onBlur={onBlur}
                onChangeText={(texte) => {
                  onChange(texte);
                  if (formulaire.derniereDemande) {
                    formulaire.reinitialiserConfirmation();
                  }
                }}
                erreur={fieldState.error?.message}
                suffixe={
                  <Ionicons
                    name={
                      formulaire.nomValide
                        ? "checkmark-circle"
                        : "alert-circle-outline"
                    }
                    size={20}
                    color={
                      formulaire.nomValide ? couleurs.primaire : couleurs.erreur
                    }
                  />
                }
              />
            )}
          />

          {/* Champ 2 : Quantité */}
          <Controller
            control={formulaire.control}
            name="quantite"
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <ChampSaisie
                etiquette="Quantité"
                placeholder="1 boîte"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                erreur={fieldState.error?.message}
                suffixe={
                  <Ionicons
                    name="archive-outline"
                    size={20}
                    color={couleurs.texteSecondaire}
                  />
                }
              />
            )}
          />

          {/* Zone de dépôt en pointillés : photo de l'ordonnance */}
          <ZoneOrdonnance
            fichierJoint={formulaire.ordonnance}
            onJoindre={formulaire.basculerOrdonnance}
            onRetirer={formulaire.retirerOrdonnance}
          />

          {/* Encart de réassurance du pharmacien de garde */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: espacements.s + espacements.xs,
              padding: espacements.m - espacements.xs,
              borderRadius: rayons.moyen,
              backgroundColor: couleurs.surfaceSecondaire,
              borderWidth: 1,
              borderColor: couleurs.bordure,
            }}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={couleurs.primaire}
            />
            <Texte
              variante="legende"
              couleur="texteSecondaire"
              style={{ flex: 1 }}
            >
              Le pharmacien de garde vérifiera immédiatement la disponibilité et
              sécurisera votre lot pour retrait nocturne.
            </Texte>
          </View>

          {/* Message de confirmation après soumission valide + dismissTo */}
          {formulaire.derniereDemande ? (
            <View
              accessibilityLiveRegion="polite"
              style={{
                gap: espacements.s,
                padding: espacements.m - espacements.xs,
                borderRadius: rayons.moyen,
                backgroundColor: couleurs.primaireConteneur,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: espacements.s,
                }}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={couleurs.primaire}
                />
                <Texte
                  variante="legende"
                  poids="semiGras"
                  couleur="primaire"
                  style={{ flex: 1 }}
                >
                  {`Demande transmise à ${pharmacie.nom} (${formulaire.derniereDemande.nomMedicament} · ${formulaire.derniereDemande.quantite}).`}
                </Texte>
              </View>

              <Bouton
                type="secondaire"
                libelle="Retourner sur la carte"
                icone="map-outline"
                onPress={() => router.dismissTo("/accueil/index")}
              />
            </View>
          ) : null}

          {/* Bouton principal : Continuer › */}
          <View style={{ paddingTop: espacements.xs }}>
            <Bouton
              libelle="Continuer"
              iconeDroite="chevron-forward"
              onPress={formulaire.soumettre}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
