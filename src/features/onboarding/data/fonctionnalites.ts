import type { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type Fonctionnalite = {
  cle: string;
  icone: ComponentProps<typeof MaterialCommunityIcons>["name"];
  titre: string;
  tag: string;
  description: string;
};

/** Arguments clés présentés sur l'écran d'introduction. */
export const FONCTIONNALITES: Fonctionnalite[] = [
  {
    cle: "geolocalisation",
    icone: "navigation-variant-outline",
    titre: "Géolocalisation 24h/24 & 7j/7",
    tag: "En direct",
    description:
      "Trouve l'officine de garde la plus proche à Yaoundé et Bastos en temps réel.",
  },
  {
    cle: "hors-ligne",
    icone: "cloud-off-outline",
    titre: "Disponibilité Hors-ligne",
    tag: "Sans data",
    description:
      "Consultation des plannings de garde et numéros d'urgence même sans connexion Internet.",
  },
  {
    cle: "ordonnance",
    icone: "clipboard-text-outline",
    titre: "Réservation d'ordonnance",
    tag: "Express",
    description:
      "Télétransmission rapide pour un retrait express prioritaire au guichet de nuit.",
  },
];
