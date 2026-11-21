import { Tabs, useRouter } from "expo-router";

import { BarreOnglets } from "@/components/ui";
import { useTheme } from "@/theme";

/** Navigateur d'onglets principal (Accueil, Liste, Favoris, Profil). */
export default function LayoutOnglets() {
  const { couleurs } = useTheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: couleurs.arrierePlan },
      }}
      tabBar={({ state, emitter, navigateToTab, insets }) => {
        const routeActive = state.routes[state.index];

        return (
          <BarreOnglets
            actif={routeActive?.name ?? "accueil"}
            margeBas={insets.bottom}
            onChange={(cle) => {
              const cible = state.routes.find((r) => r.name === cle);
              if (!cible) return;

              const estActif = cible.key === routeActive?.key;
              const event = emitter.emit({
                type: "tabPress",
                target: cible.key,
                canPreventDefault: true,
              });

              if (!estActif && !event.defaultPrevented) {
                navigateToTab(cible.key);
              } else if (
                estActif &&
                cle === "accueil" &&
                !event.defaultPrevented
              ) {
                router.dismissTo("/accueil/index");
              }
            }}
          />
        );
      }}
    >
      <Tabs.Screen name="accueil" options={{ title: "Accueil" }} />
      <Tabs.Screen name="liste" options={{ title: "Liste" }} />
      <Tabs.Screen name="favoris" options={{ title: "Favoris" }} />
      <Tabs.Screen name="profil" options={{ title: "Profil" }} />
    </Tabs>
  );
}
