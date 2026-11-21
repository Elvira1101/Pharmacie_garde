import { Stack } from "expo-router";

import { useTheme } from "@/theme";

/** Pile imbriquée de l'onglet Accueil : carte (`index`) et détail dynamique (`[id]`). */
export default function LayoutPileAccueil() {
  const { couleurs } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: couleurs.arrierePlan },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
