import { FONCTIONNALITES, type Fonctionnalite } from "../data/fonctionnalites";

/** Couche d'accès aux données d'introduction (onboarding). */
export const onboardingService = {
  listerFonctionnalites(): Fonctionnalite[] {
    return FONCTIONNALITES;
  },
};
