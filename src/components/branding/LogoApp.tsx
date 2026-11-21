import { Image } from "expo-image";
import { View } from "react-native";

import { useTheme } from "@/theme";

const logoSource = require("@/assets/images/logo.png");

export type LogoAppProps = {
  /** Côté du carré en px (défaut : 68). */
  taille?: number;
  /** Ajoute le grand carré teinté autour du logo (écran d'accueil). */
  halo?: boolean;
};

/** Logo officiel de l'application Pharmacies de garde. */
export function LogoApp({ taille = 68, halo = false }: LogoAppProps) {
  const { couleurs } = useTheme();

  const logo = (
    <Image
      source={logoSource}
      contentFit="contain"
      accessibilityLabel="Logo Pharma-Garde"
      style={{
        width: taille,
        height: taille,
      }}
    />
  );

  if (!halo) return logo;

  const tailleHalo = Math.round(taille * 1.45);
  return (
    <View
      style={{
        width: tailleHalo,
        height: tailleHalo,
        borderRadius: Math.round(tailleHalo * 0.26),
        backgroundColor: couleurs.primaireConteneur,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {logo}
    </View>
  );
}
