import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { forceMotDePasse } from "@/utils/validation";

import {
  schemaInscription,
  type DonneesInscription,
} from "../schemas/authSchemas";

export type { RoleInscription } from "../schemas/authSchemas";

/** Logique et validation React Hook Form + Zod du formulaire d'inscription. */
export function useFormulaireInscription(
  onSucces: (donnees: DonneesInscription) => void,
) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DonneesInscription>({
    resolver: zodResolver(schemaInscription),
    defaultValues: {
      role: "utilisateur",
      nom: "",
      telephone: "",
      motDePasse: "",
    },
  });

  const motDePasse = useWatch({ control, name: "motDePasse" });

  return {
    control,
    errors,
    force: forceMotDePasse(motDePasse ?? ""),
    soumettre: handleSubmit(onSucces),
  };
}
