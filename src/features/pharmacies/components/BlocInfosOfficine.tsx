import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { PharmacieGarde } from "../data/pharmacies";
import { pharmaciesService } from "../services/pharmaciesService";

export type BlocInfosOfficineProps = {
  pharmacie: PharmacieGarde;
};

/** Carte structurée : adresse, plages de garde, lignes d'astreinte et services disponibles. */
export function BlocInfosOfficine({ pharmacie }: BlocInfosOfficineProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        backgroundColor: couleurs.surfaceSecondaire,
        borderRadius: rayons.grand,
        borderWidth: 1,
        borderColor: couleurs.bordure,
        padding: espacements.m,
        gap: espacements.m,
      }}
    >
      {/* 1. Adresse & Quartier */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: espacements.s + espacements.xs,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: rayons.moyen,
            backgroundColor: couleurs.surface,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="location-outline"
            size={20}
            color={couleurs.primaire}
          />
        </View>

        <View style={{ flex: 1, gap: 2 }}>
          <Texte
            variante="legende"
            poids="semiGras"
            couleur="texteSecondaire"
            style={{ letterSpacing: 0.5 }}
          >
            ADRESSE & QUARTIER
          </Texte>
          <Texte variante="corps" poids="gras">
            {pharmacie.adresseCourte}
          </Texte>
          <Texte variante="secondaire" couleur="texteSecondaire">
            {pharmacie.repereQuartier}
          </Texte>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: espacements.xs,
              marginTop: espacements.xs,
            }}
          >
            <Ionicons name="walk-outline" size={16} color={couleurs.primaire} />
            <Texte variante="legende" poids="semiGras" couleur="primaire">
              {pharmacie.marche}
            </Texte>
          </View>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: couleurs.bordure }} />

      {/* 2. Plages de garde */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: espacements.s + espacements.xs,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: rayons.moyen,
            backgroundColor: couleurs.surface,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="time-outline" size={20} color={couleurs.primaire} />
        </View>

        <View style={{ flex: 1, gap: 2 }}>
          <Texte
            variante="legende"
            poids="semiGras"
            couleur="texteSecondaire"
            style={{ letterSpacing: 0.5 }}
          >
            PLAGES DE GARDE
          </Texte>
          <Texte variante="corps" poids="gras">
            {pharmacie.horairesNuit}
          </Texte>
          <Texte variante="secondaire" poids="moyen" couleur="primaire">
            {pharmacie.horairesWeekend}
          </Texte>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: couleurs.bordure }} />

      {/* 3. Ligne d'astreinte & Urgences */}
      <View style={{ gap: espacements.s }}>
        <Texte
          variante="legende"
          poids="semiGras"
          couleur="texteSecondaire"
          style={{ letterSpacing: 0.5 }}
        >
          {"LIGNE D'ASTREINTE & URGENCES"}
        </Texte>

        <View style={{ flexDirection: "row", gap: espacements.s }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Appeler le ${pharmacie.telephoneAffiche}`}
            onPress={() => Linking.openURL(`tel:${pharmacie.telephone}`)}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: espacements.xxl,
              borderRadius: rayons.moyen,
              backgroundColor: pressed
                ? couleurs.primairePresse
                : couleurs.primaire,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: espacements.xs + 2,
              paddingHorizontal: espacements.s,
            })}
          >
            <Ionicons
              name="call-outline"
              size={17}
              color={couleurs.surPrimaire}
            />
            <Texte
              variante="legende"
              poids="semiGras"
              couleur="surPrimaire"
              numberOfLines={1}
            >
              {pharmacie.telephoneAffiche}
            </Texte>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Appeler l'astreinte directe"
            onPress={() =>
              Linking.openURL(`tel:${pharmacie.telephoneAstreinte}`)
            }
            style={({ pressed }) => ({
              flex: 1,
              minHeight: espacements.xxl,
              borderRadius: rayons.moyen,
              backgroundColor: pressed
                ? couleurs.primaireConteneur
                : couleurs.surface,
              borderWidth: 1,
              borderColor: couleurs.bordure,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: espacements.xs + 2,
              paddingHorizontal: espacements.s,
            })}
          >
            <Ionicons
              name="headset-outline"
              size={17}
              color={couleurs.primaire}
            />
            <Texte
              variante="legende"
              poids="semiGras"
              couleur="primaire"
              numberOfLines={1}
            >
              Astreinte directe
            </Texte>
          </Pressable>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: couleurs.bordure }} />

      {/* 4. Services d'urgence disponibles */}
      <View style={{ gap: espacements.s }}>
        <Texte
          variante="legende"
          poids="semiGras"
          couleur="texteSecondaire"
          style={{ letterSpacing: 0.5 }}
        >
          {"SERVICES D'URGENCE DISPONIBLES"}
        </Texte>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: espacements.s,
          }}
        >
          {pharmaciesService.listerServicesUrgence().map((service) => (
            <View
              key={service.cle}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: espacements.xs + 2,
                paddingHorizontal: espacements.s + espacements.xs,
                paddingVertical: espacements.s,
                borderRadius: rayons.petit + 2,
                backgroundColor: couleurs.surface,
                borderWidth: 1,
                borderColor: couleurs.bordure,
              }}
            >
              <Ionicons
                name={service.icone}
                size={15}
                color={service.urgent ? couleurs.erreur : couleurs.primaire}
              />
              <Texte variante="legende" poids="moyen">
                {service.libelle}
              </Texte>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
