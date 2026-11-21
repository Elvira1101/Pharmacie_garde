import {
  PHARMACIES_BASTOS,
  SERVICES_URGENCE_OFFICINE,
  type CategorieFiltrePharmacie,
  type PharmacieGarde,
  type ServiceUrgence,
} from "../data/pharmacies";

/**
 * Couche d'accès aux données des officines.
 * Isole les écrans et hooks de la source de données (données locales aujourd'hui, API demain).
 */
export const pharmaciesService = {
  /** Retourne l'ensemble des officines de garde disponibles. */
  listerPharmacies(): PharmacieGarde[] {
    return PHARMACIES_BASTOS;
  },

  /** Retourne l'officine correspondant à l'identifiant (ou la première par défaut). */
  obtenirPharmacieParId(id?: string): PharmacieGarde {
    return (
      PHARMACIES_BASTOS.find((pharmacie) => pharmacie.id === id) ??
      PHARMACIES_BASTOS[0]
    );
  },

  /** Filtre les officines par catégorie (toutes, 24h, nuit) et mot-clé. */
  rechercherPharmacies(
    categorie: CategorieFiltrePharmacie,
    recherche: string,
  ): PharmacieGarde[] {
    const terme = recherche.trim().toLowerCase();

    return PHARMACIES_BASTOS.filter((pharmacie) => {
      const correspondCategorie =
        categorie === "toutes" || pharmacie.categorie === categorie;
      const correspondRecherche =
        !terme ||
        pharmacie.nom.toLowerCase().includes(terme) ||
        pharmacie.adresseCourte.toLowerCase().includes(terme) ||
        pharmacie.statut.toLowerCase().includes(terme);
      return correspondCategorie && correspondRecherche;
    });
  },

  /** Retourne la liste des services d'urgence disponibles dans une officine. */
  listerServicesUrgence(): ServiceUrgence[] {
    return SERVICES_URGENCE_OFFICINE;
  },

  /** Retourne l'état initial des favoris indexé par identifiant d'officine. */
  obtenirFavorisInitiaux(): Record<string, boolean> {
    return Object.fromEntries(
      PHARMACIES_BASTOS.map((pharmacie) => [
        pharmacie.id,
        Boolean(pharmacie.favoriInitial),
      ]),
    );
  },
};
