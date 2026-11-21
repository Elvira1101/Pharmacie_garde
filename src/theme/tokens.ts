/**
 * tokens.ts - Tokens de design de l'application "Pharmacies de garde"
 * Source de vérité unique : aucune valeur de style en dur dans les composants.
 *
 * Ajouts par rapport à la spécification initiale (issus de la planche de composants et de la carte) :
 *  - `primairePresse`       : fond du bouton primaire à l'état « pressé »
 *  - `contourChamp`         : contour d'un champ de saisie au repos
 *  - `surfaceSecondaire`    : fond doux des encarts d'information / urgence
 *  - `localisation`         : point bleu de géolocalisation utilisateur
 *  - `localisationHalo`     : halo translucide autour de la position utilisateur
 *  - `carteFond`            : fond de la carte stylisée de Bastos
 *  - `carteParc`            : espaces verts / parcs de la carte stylisée
 *  - `carteRoute`           : axes routiers principaux de la carte
 *  - `carteRouteSecondaire` : rues secondaires et trame de la carte
 */

export const couleurs = {
  // Mode Clair
  clair: {
    primaire: "#0F766E", // Émeraude principale (actions, onglet actif, boutons CTA)
    primairePresse: "#0B5852", // Bouton primaire pressé
    primaireConteneur: "#CCFBF1", // Fond doux émeraude / badges de garde
    surPrimaire: "#FFFFFF", // Texte sur bouton primaire
    arrierePlan: "#F8FAFC", // Fond d'écran global de l'application
    surface: "#FFFFFF", // Fond des cartes, bottom sheet, barre de recherche
    surfaceSecondaire: "#F1F5F9", // Encarts secondaires (flash info, urgence)
    textePrincipal: "#0F172A", // Titres et textes principaux (contraste AAA > 10:1)
    texteSecondaire: "#64748B", // Sous-titres, adresses, libellés inactifs
    bordure: "#E2E8F0", // Séparateurs et contours de boutons secondaires
    contourChamp: "#7D8790", // Contour d'un champ de saisie au repos
    erreur: "#DC2626", // Messages d'alerte ou erreurs
    erreurConteneur: "#FEE2E2", // Fond doux d'alerte / urgence / déconnexion
    succes: "#16A34A", // Statut ouvert / de garde
    etoile: "#D97706", // Étoile de notation (avis officine)
    localisation: "#0284C7", // Point bleu de géolocalisation utilisateur
    localisationHalo: "rgba(2, 132, 199, 0.22)", // Halo du point de géolocalisation
    carteFond: "#EDF2E8", // Fond de carte clair Bastos
    carteParc: "#DCEAE0", // Espaces verts de la carte en mode clair
    carteRoute: "#FFFFFF", // Axes principaux de la carte en mode clair
    carteRouteSecondaire: "#F8FAF7", // Voies secondaires de la carte en mode clair
  },

  // Mode Sombre
  sombre: {
    primaire: "#14B8A6", // Turquoise / cyan lumineux (accentuation nocturne)
    primairePresse: "#0D9488", // Bouton primaire pressé
    primaireConteneur: "#134E4A", // Fond badge vert foncé atténué
    surPrimaire: "#042F2E", // Texte sombre sur accentuation claire
    arrierePlan: "#070E1B", // Arrière-plan global bleu nuit profond
    surface: "#141C29", // Conteneurs, cartes et bottom sheet nocturne
    surfaceSecondaire: "#1A2434", // Encarts secondaires nocturnes
    textePrincipal: "#F8FAFC", // Titres et textes clairs sur fond sombre
    texteSecondaire: "#94A3B8", // Adresses et textes atténués
    bordure: "#1E293B", // Délimitations subtiles
    contourChamp: "#94A3B8", // Contour d'un champ de saisie au repos
    erreur: "#F87171", // Erreurs nocturnes
    erreurConteneur: "#3B181E", // Fond doux d'alerte / déconnexion nocturne
    succes: "#4ADE80", // Statut ouvert / actif en mode sombre
    etoile: "#FBBF24", // Étoile de notation en mode sombre
    localisation: "#38BDF8", // Point bleu lumineux en mode sombre
    localisationHalo: "rgba(56, 189, 248, 0.28)", // Halo nocturne de géolocalisation
    carteFond: "#12161E", // Fond de carte nocturne Bastos
    carteParc: "#162029", // Espaces verts nocturnes
    carteRoute: "#263342", // Axes principaux nocturnes
    carteRouteSecondaire: "#1F2937", // Voies secondaires nocturnes
  },
} as const;

export const espacements = {
  xs: 4, // Petit espacement (badges, puces)
  s: 8, // Espacement compact (icônes + texte)
  m: 16, // Espacement standard (marges internes, padding des cartes)
  l: 24, // Espacement aéré (entre sections)
  xl: 32, // Grand espacement (en-têtes, espacements d'écrans)
  xxl: 48, // Touch target minimum (hauteur minimale des boutons selon la checklist)
} as const;

export const rayons = {
  aucun: 0,
  petit: 6,
  moyen: 12, // Variable standard recommandée pour les champs de saisie et cartes
  grand: 16, // Cartes d'officines et conteneurs
  complet: 9999, // Boutons pilules et puces
} as const;

export const typographie = {
  famille: "Roboto", // Ou Roboto-Flex / Système natif Expo
  tailles: {
    titre1: 24,
    titre2: 20,
    corps: 16, // Style de texte "Corps" mentionné au cahier des charges
    secondaire: 14,
    legende: 12,
  },
  poids: {
    regulier: "400",
    moyen: "500",
    semiGras: "600",
    gras: "700",
  },
} as const;

// Types TypeScript pour auto-complétion dans le projet Expo / React Native
export type Couleurs = typeof couleurs;
export type ThemeClair = typeof couleurs.clair;
export type ThemeSombre = typeof couleurs.sombre;
export type Espacements = typeof espacements;
export type Rayons = typeof rayons;
export type Typographie = typeof typographie;

export default {
  couleurs,
  espacements,
  rayons,
  typographie,
};
