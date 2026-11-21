import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  schemaReservation,
  type DonneesReservation,
} from "../schemas/reservationSchema";

/**
 * Logique et validation React Hook Form + Zod du formulaire de réservation.
 * Valide « nomMedicament » dès l'affichage pour refléter fidèlement l'état d'erreur
 * de la maquette, puis efface l'erreur en direct dès la saisie.
 */
export function useFormulaireReservation(
  onSucces?: (donnees: DonneesReservation) => void,
) {
  const [ordonnance, setOrdonnance] = useState<string | null>(null);
  const [derniereDemande, setDerniereDemande] =
    useState<DonneesReservation | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<DonneesReservation>({
    resolver: zodResolver(schemaReservation),
    mode: "onChange",
    defaultValues: {
      nomMedicament: "",
      quantite: "1 boîte",
    },
  });

  useEffect(() => {
    void trigger("nomMedicament");
  }, [trigger]);

  const nomMedicament = useWatch({ control, name: "nomMedicament" });
  const nomValide = (nomMedicament ?? "").trim().length > 0;

  function basculerOrdonnance() {
    setOrdonnance((actuel) => (actuel ? null : "ordonnance_nuit.jpg"));
  }

  const soumettre = handleSubmit((donnees) => {
    setDerniereDemande(donnees);
    onSucces?.(donnees);
  });

  return {
    control,
    errors,
    nomValide,
    ordonnance,
    basculerOrdonnance,
    retirerOrdonnance: () => setOrdonnance(null),
    derniereDemande,
    reinitialiserConfirmation: () => setDerniereDemande(null),
    soumettre,
  };
}
