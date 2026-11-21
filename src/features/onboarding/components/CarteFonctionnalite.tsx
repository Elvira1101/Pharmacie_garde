import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { Badge, Texte } from "@/components/ui";
import { useTheme } from "@/theme";

import type { Fonctionnalite } from "../data/fonctionnalites";

/** Carte « argument clé » : icône, titre, tag et description. */
export function CarteFonctionnalite({
  icone,
  titre,
  tag,
  description,
}: Fonctionnalite) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: espacements.m - espacements.xs,
        backgroundColor: couleurs.surface,
        borderColor: couleurs.bordure,
        borderWidth: 1,
        borderRadius: rayons.moyen,
        padding: espacements.m - espacements.xs,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: rayons.petit,
          backgroundColor: couleurs.primaireConteneur,
        }}
      >
        <MaterialCommunityIcons
          name={icone}
          size={20}
          color={couleurs.primaire}
        />
      </View>

      <View style={{ flex: 1, gap: espacements.xs }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: espacements.s,
          }}
        >
          <Texte variante="secondaire" poids="gras" style={{ flex: 1 }}>
            {titre}
          </Texte>
          <Badge libelle={tag} />
        </View>
        <Texte variante="legende" couleur="texteSecondaire">
          {description}
        </Texte>
      </View>
    </View>
  );
}
