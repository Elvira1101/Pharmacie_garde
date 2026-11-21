import type { DimensionValue } from "react-native";

export type CategorieFiltrePharmacie = "toutes" | "24h" | "nuit";

export type PharmacieGarde = {
  id: string;
  nom: string;
  statut: string;
  statutFavori?: string;
  tonStatut?: "primaire" | "neutre";
  badgeSecondaire?: string;
  quartierCourt?: string;
  categorie: "24h" | "nuit";
  favoriInitial?: boolean;
  prioritaire?: boolean;
  estOuverte: boolean;
  infoFavori?: string;
  adresse: string;
  adresseCourte: string;
  repereQuartier: string;
  distance: string;
  distanceValeur: string;
  distanceDuree: string;
  modeTransport: "marche" | "voiture";
  marche: string;
  infoDroite?: string;
  telephoneInfo?: string;
  telephone: string;
  telephoneAffiche: string;
  telephoneAstreinte: string;
  note: string;
  avis: number;
  horairesNuit: string;
  horairesWeekend: string;
  itineraireRue: string;
  photoUrl: string;
  /** Coordonnées relatives sur la carte stylisée de Bastos. */
  position: {
    top: DimensionValue;
    left: DimensionValue;
  };
};

const PHOTO_DEVANTURE_SOLEIL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBbLqzdyKIybslDAeyEn0oVElg0OZ783Th6yWuz3RjPa0337S4_5zH2Uaaf4vkQtkIZCM_xaOBHWR1IVap2vrZNPQnzpcVPFXLN3cLFuFxIbhtA9GdGnfQhqBFo7qWPYABJSFMAl92LldMqLKtgL_FfgL4OxWOQ74V70c0m899LRrZ_IKM1YaWf2j4lZgvFuf1R6DZWl5o_yNVddanmSz8-njEcD8maXyOWDbUH6Ms";

/** Officines de garde géolocalisées autour du quartier Bastos (Yaoundé). */
export const PHARMACIES_BASTOS: PharmacieGarde[] = [
  {
    id: "soleil",
    nom: "Pharmacie du Soleil",
    statut: "De garde jusqu'à 8h",
    statutFavori: "De garde actuellement",
    tonStatut: "primaire",
    badgeSecondaire: "Stock vérifié 18:30",
    categorie: "nuit",
    favoriInitial: true,
    prioritaire: true,
    estOuverte: true,
    infoFavori: "Garde jusqu'à 8h00",
    adresse: "Rue 1.750, près du carrefour Bastos",
    adresseCourte: "Rue 1.750, carrefour Bastos",
    repereQuartier: "Yaoundé, face ambassade",
    distance: "650 m, environ 8 minutes à pied",
    distanceValeur: "650 m",
    distanceDuree: "(8 min à pied)",
    modeTransport: "marche",
    marche: "650 m • 8 min de marche",
    telephoneInfo: "+237 222 20 14 88",
    telephone: "+237222201488",
    telephoneAffiche: "+237 222 20 XX XX",
    telephoneAstreinte: "+237699112233",
    note: "4.9",
    avis: 128,
    horairesNuit: "Garde de nuit 20h00 - 08h00",
    horairesWeekend: "Samedi & Dimanche 24h/24 continu",
    itineraireRue: "Itinéraire via Rue 1.750",
    photoUrl: PHOTO_DEVANTURE_SOLEIL,
    position: { top: "30%", left: "61%" },
  },
  {
    id: "grande-bastos",
    nom: "Grande Pharmacie de Bastos",
    statut: "Ouverte 24h/24",
    statutFavori: "Ouverte 24h/24",
    tonStatut: "primaire",
    quartierCourt: "Bastos",
    categorie: "24h",
    favoriInitial: true,
    estOuverte: true,
    infoFavori: "Livraison d'urgence disponible",
    adresse: "Avenue Rosa Parks, face ambassade",
    adresseCourte: "Avenue Rosa Parks",
    repereQuartier: "Yaoundé, Haut-Bastos",
    distance: "1,2 km, environ 4 minutes en voiture",
    distanceValeur: "1.2 km",
    distanceDuree: "(4 min)",
    modeTransport: "voiture",
    marche: "1,2 km • 14 min de marche",
    infoDroite: "Accès PMR • Parking gardé",
    telephone: "+237222210512",
    telephoneAffiche: "+237 222 21 05 12",
    telephoneAstreinte: "+237699112233",
    note: "4.8",
    avis: 94,
    horairesNuit: "Ouverte 24h/24 et 7j/7",
    horairesWeekend: "Samedi & Dimanche 24h/24 continu",
    itineraireRue: "Itinéraire via Av. Rosa Parks",
    photoUrl: PHOTO_DEVANTURE_SOLEIL,
    position: { top: "28%", left: "14%" },
  },
  {
    id: "palais",
    nom: "Pharmacie du Palais",
    statut: "Garde nocturne dès 20h",
    statutFavori: "Garde nocturne dès 20h",
    tonStatut: "neutre",
    quartierCourt: "Rond-point",
    categorie: "nuit",
    favoriInitial: false,
    estOuverte: true,
    infoFavori: "Relève à 20h00",
    adresse: "Rond-point Bastos, montée Dragages",
    adresseCourte: "Rond-point Bastos, montée Dragages",
    repereQuartier: "Yaoundé, Rond-Point Bastos",
    distance: "1,8 km, environ 7 minutes en voiture",
    distanceValeur: "1.8 km",
    distanceDuree: "(7 min)",
    modeTransport: "voiture",
    marche: "1,8 km • 20 min de marche",
    infoDroite: "Relève à 20h00",
    telephone: "+237222203344",
    telephoneAffiche: "+237 222 20 33 44",
    telephoneAstreinte: "+237699112233",
    note: "4.7",
    avis: 82,
    horairesNuit: "Garde de nuit 20h00 - 08h00",
    horairesWeekend: "Samedi & Dimanche 24h/24 continu",
    itineraireRue: "Itinéraire via Rond-Point Bastos",
    photoUrl: PHOTO_DEVANTURE_SOLEIL,
    position: { top: "22%", left: "84%" },
  },
  {
    id: "nations",
    nom: "Pharmacie des Nations",
    statut: "Fermée • De garde ce week-end",
    statutFavori: "Fermée • De garde ce week-end",
    tonStatut: "neutre",
    quartierCourt: "Golf",
    categorie: "nuit",
    favoriInitial: true,
    estOuverte: false,
    infoFavori: "Prochaine garde : Samedi dès 13h",
    adresse: "Quartier du Golf · Yaoundé",
    adresseCourte: "Quartier du Golf",
    repereQuartier: "Yaoundé, secteur Golf",
    distance: "2,5 km, environ 8 minutes en voiture",
    distanceValeur: "2.5 km",
    distanceDuree: "(8 min)",
    modeTransport: "voiture",
    marche: "2,5 km • 28 min de marche",
    infoDroite: "Prochaine garde : Sam. 13h",
    telephone: "+237222222222",
    telephoneAffiche: "+237 222 22 22 22",
    telephoneAstreinte: "+237699112233",
    note: "4.8",
    avis: 67,
    horairesNuit: "Prochaine garde : Samedi dès 13h",
    horairesWeekend: "Samedi & Dimanche 24h/24 continu",
    itineraireRue: "Itinéraire via Quartier du Golf",
    photoUrl: PHOTO_DEVANTURE_SOLEIL,
    position: { top: "45%", left: "89%" },
  },
];

export type ServiceUrgence = {
  cle: string;
  libelle: string;
  icone:
    "medical" | "pulse-outline" | "document-text-outline" | "medkit-outline";
  urgent?: boolean;
};

/** Services d'urgence disponibles dans l'officine de garde. */
export const SERVICES_URGENCE_OFFICINE: ServiceUrgence[] = [
  {
    cle: "urgences-nuit",
    libelle: "Urgences nuit",
    icone: "medical",
    urgent: true,
  },
  { cle: "oxygene", libelle: "Oxygène", icone: "pulse-outline" },
  {
    cle: "garde-ordonnance",
    libelle: "Garde ordonnance",
    icone: "document-text-outline",
  },
  { cle: "injectables", libelle: "Injectables", icone: "medkit-outline" },
];
