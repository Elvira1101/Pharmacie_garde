import { StyleSheet, View } from "react-native";

import { useTheme } from "@/theme";

/** Halo émeraude diffus en haut d'écran (dégradé radial, sans dépendance native). */
export function FondHalo() {
  const { couleurs } = useTheme();

  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundImage: `radial-gradient(circle at 50% 38%, ${couleurs.primaireConteneur} 0%, ${couleurs.primaireConteneur}00 65%)`,
          opacity: 0.7,
        },
      ]}
    />
  );
}
