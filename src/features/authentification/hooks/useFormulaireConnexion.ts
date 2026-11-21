import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { schemaConnexion, type DonneesConnexion } from "../schemas/authSchemas";

/** Logique et validation React Hook Form + Zod du formulaire de connexion. */
export function useFormulaireConnexion(
  onSucces: (donnees: DonneesConnexion) => void,
) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DonneesConnexion>({
    resolver: zodResolver(schemaConnexion),
    defaultValues: {
      telephone: "",
      motDePasse: "",
    },
  });

  return {
    control,
    errors,
    soumettre: handleSubmit(onSucces),
  };
}
