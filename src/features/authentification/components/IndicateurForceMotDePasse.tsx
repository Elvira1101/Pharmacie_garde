import { View } from "react-native";

import { useTheme } from "@/theme";

const LIBELLES = ["Aucun", "Faible", "Moyen", "Bon", "Fort"] as const;

export type IndicateurForceMotDePasseProps = {
  /** Force de 0 à 4 (voir `forceMotDePasse`). */
  force: 0 | 1 | 2 | 3 | 4;
};

/** Quatre segments qui se remplissent selon la robustesse du mot de passe. */
export function IndicateurForceMotDePasse({
  force,
}: IndicateurForceMotDePasseProps) {
  const { couleurs, espacements, rayons } = useTheme();
  const couleurRemplie = force <= 1 ? couleurs.erreur : couleurs.primaire;

  return (
    <View
      accessible
      accessibilityLabel={`Robustesse du mot de passe : ${LIBELLES[force]}`}
      style={{ flexDirection: "row", gap: espacements.xs }}
    >
      {[1, 2, 3, 4].map((segment) => (
        <View
          key={segment}
          style={{
            flex: 1,
            height: 4,
            borderRadius: rayons.complet,
            backgroundColor:
              segment <= force ? couleurRemplie : couleurs.bordure,
          }}
        />
      ))}
    </View>
  );
}
