/** Règles de validation du formulaire d'inscription (numéros camerounais, +237). */

const LONGUEUR_MIN_MOT_DE_PASSE = 8;
const LONGUEUR_NUMERO_LOCAL = 9;

export function chiffresSeulement(valeur: string): string {
  return valeur.replace(/\D/g, "");
}

/** Formate un numéro local en « 6XX XX XX XX » au fil de la saisie. */
export function formaterTelephone(valeur: string): string {
  const chiffres = chiffresSeulement(valeur).slice(0, LONGUEUR_NUMERO_LOCAL);
  const [a, b, c, d] = [
    chiffres.slice(0, 3),
    chiffres.slice(3, 5),
    chiffres.slice(5, 7),
    chiffres.slice(7, 9),
  ];
  return [a, b, c, d].filter(Boolean).join(" ");
}

export function validerNom(nom: string): string | undefined {
  return nom.trim().length >= 3 ? undefined : "Indiquez votre nom complet";
}

export function validerTelephone(telephone: string): string | undefined {
  const chiffres = chiffresSeulement(telephone);
  const valide =
    chiffres.length === LONGUEUR_NUMERO_LOCAL && /^[62]/.test(chiffres);
  return valide ? undefined : "Numéro invalide (ex. 6XX XX XX XX)";
}

export function validerMotDePasse(motDePasse: string): string | undefined {
  return motDePasse.length >= LONGUEUR_MIN_MOT_DE_PASSE
    ? undefined
    : `${LONGUEUR_MIN_MOT_DE_PASSE} caractères minimum`;
}

/** Force du mot de passe de 0 (vide) à 4 (très robuste). */
export function forceMotDePasse(motDePasse: string): 0 | 1 | 2 | 3 | 4 {
  if (!motDePasse) return 0;

  const criteres = [
    motDePasse.length >= LONGUEUR_MIN_MOT_DE_PASSE,
    /[a-z]/.test(motDePasse) && /[A-Z]/.test(motDePasse),
    /\d/.test(motDePasse),
    /[^A-Za-z0-9]/.test(motDePasse) || motDePasse.length >= 12,
  ];
  const score = criteres.filter(Boolean).length;
  return Math.max(1, score) as 1 | 2 | 3 | 4;
}
