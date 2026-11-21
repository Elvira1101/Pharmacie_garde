import { z } from "zod";

import { chiffresSeulement } from "@/utils/validation";

const LONGUEUR_MIN_MOT_DE_PASSE = 8;
const LONGUEUR_NUMERO_LOCAL = 9;

const champTelephoneCameroun = z.string().refine(
  (valeur) => {
    const chiffres = chiffresSeulement(valeur);
    return chiffres.length === LONGUEUR_NUMERO_LOCAL && /^[62]/.test(chiffres);
  },
  { message: "Numéro invalide (ex. 6XX XX XX XX)" },
);

const champMotDePasse = z
  .string()
  .min(
    LONGUEUR_MIN_MOT_DE_PASSE,
    `${LONGUEUR_MIN_MOT_DE_PASSE} caractères minimum`,
  );

/** Schéma Zod du formulaire de connexion. */
export const schemaConnexion = z.object({
  telephone: champTelephoneCameroun,
  motDePasse: champMotDePasse,
});

/** Schéma Zod du formulaire d'inscription. */
export const schemaInscription = z.object({
  role: z.enum(["utilisateur", "pharmacien"]),
  nom: z.string().trim().min(3, "Indiquez votre nom complet"),
  telephone: champTelephoneCameroun,
  motDePasse: champMotDePasse,
});

export type DonneesConnexion = z.infer<typeof schemaConnexion>;
export type DonneesInscription = z.infer<typeof schemaInscription>;
export type RoleInscription = DonneesInscription["role"];
