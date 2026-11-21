import { Ionicons } from "@expo/vector-icons";
import { useState, type ComponentProps, type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { famillePolice, useTheme } from "@/theme";

import { Texte } from "./Texte";

type NomIcone = ComponentProps<typeof Ionicons>["name"];

export type ChampSaisieProps = Omit<TextInputProps, "style"> & {
  etiquette: string;
  /** Texte d'aide aligné à droite de l'étiquette (ex. « Min. 8 caractères »). */
  indice?: string;
  /** Message d'erreur : si présent, le champ passe à l'état « erreur ». */
  erreur?: string;
  iconeGauche?: NomIcone;
  /** Élément affiché avant la saisie (ex. drapeau + indicatif). */
  prefixe?: ReactNode;
  /** Élément affiché à droite (ignoré si `secureTextEntry` : l'œil est ajouté). */
  suffixe?: ReactNode;
};

/** Champ de saisie 48 px, rayon 12 — états normal, focus (halo) et erreur (message). */
export function ChampSaisie({
  etiquette,
  indice,
  erreur,
  iconeGauche,
  prefixe,
  suffixe,
  secureTextEntry,
  onFocus,
  onBlur,
  ...reste
}: ChampSaisieProps) {
  const { couleurs, espacements, rayons, typographie } = useTheme();
  const [focus, setFocus] = useState(false);
  const [masque, setMasque] = useState(true);

  const estMotDePasse = Boolean(secureTextEntry);
  const couleurContour = erreur
    ? couleurs.erreur
    : focus
      ? couleurs.primaire
      : couleurs.contourChamp;

  return (
    <View style={{ gap: espacements.xs }}>
      <View style={styles.ligneEtiquette}>
        <Texte
          variante="secondaire"
          poids="semiGras"
          couleur={erreur ? "erreur" : "textePrincipal"}
        >
          {etiquette}
        </Texte>
        {indice ? (
          <Texte
            variante="legende"
            poids={erreur ? "semiGras" : "regulier"}
            couleur={erreur ? "erreur" : focus ? "primaire" : "texteSecondaire"}
          >
            {indice}
          </Texte>
        ) : null}
      </View>

      <View
        style={[
          styles.champ,
          {
            minHeight: espacements.xxl,
            borderRadius: rayons.moyen,
            borderColor: couleurContour,
            borderWidth: focus ? 2 : 1.5,
            backgroundColor: couleurs.surface,
            paddingHorizontal: espacements.m,
            gap: espacements.s,
          },
          focus &&
            !erreur && { boxShadow: `0 0 0 3px ${couleurs.primaireConteneur}` },
        ]}
      >
        {iconeGauche && (
          <Ionicons
            name={iconeGauche}
            size={20}
            color={couleurs.texteSecondaire}
          />
        )}
        {prefixe}
        <TextInput
          {...reste}
          accessibilityLabel={etiquette}
          secureTextEntry={estMotDePasse && masque}
          placeholderTextColor={couleurs.texteSecondaire}
          selectionColor={couleurs.primaire}
          onFocus={(e) => {
            setFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            onBlur?.(e);
          }}
          style={[
            styles.saisie,
            {
              color: couleurs.textePrincipal,
              fontFamily: famillePolice.regulier,
              fontSize: typographie.tailles.corps,
            },
          ]}
        />
        {estMotDePasse ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              masque ? "Afficher le mot de passe" : "Masquer le mot de passe"
            }
            hitSlop={espacements.s}
            onPress={() => setMasque((m) => !m)}
          >
            <Ionicons
              name={masque ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={couleurs.texteSecondaire}
            />
          </Pressable>
        ) : (
          suffixe
        )}
      </View>

      {erreur ? (
        <View
          style={[
            styles.ligneEtiquette,
            { justifyContent: "flex-start", gap: espacements.xs },
          ]}
        >
          <Ionicons name="ellipse" size={8} color={couleurs.erreur} />
          <Texte
            variante="legende"
            couleur="erreur"
            accessibilityLiveRegion="polite"
          >
            {erreur}
          </Texte>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ligneEtiquette: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  champ: {
    alignItems: "center",
    flexDirection: "row",
  },
  saisie: {
    flex: 1,
    paddingVertical: 0,
  },
});
