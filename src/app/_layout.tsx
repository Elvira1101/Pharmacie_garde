import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { FavorisProvider } from "@/features/pharmacies";
import { ThemeProvider, policesACharger, useTheme } from "@/theme";

SplashScreen.preventAutoHideAsync();

function NavigateurRacine() {
  const { couleurs, estSombre } = useTheme();

  return (
    <>
      <StatusBar style={estSombre ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: couleurs.arrierePlan },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="bienvenue" />
        <Stack.Screen name="connexion" />
        <Stack.Screen name="inscription" />
        <Stack.Screen name="(onglets)" />
        <Stack.Screen
          name="reservation"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </>
  );
}

export default function LayoutRacine() {
  const [polices, erreurPolices] = useFonts(policesACharger);
  const pret = polices || erreurPolices;

  useEffect(() => {
    if (pret) SplashScreen.hide();
  }, [pret]);

  if (!pret) return null;

  return (
    <ThemeProvider>
      <FavorisProvider>
        <NavigateurRacine />
      </FavorisProvider>
    </ThemeProvider>
  );
}
