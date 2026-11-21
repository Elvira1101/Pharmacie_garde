import { z } from "zod";

/** Schéma Zod du formulaire de réservation de médicament. */
export const schemaReservation = z.object({
  nomMedicament: z.string().trim().min(1, "Indiquez le nom du médicament"),
  quantite: z.string().trim().min(1, "Indiquez la quantité"),
});

export type DonneesReservation = z.infer<typeof schemaReservation>;
