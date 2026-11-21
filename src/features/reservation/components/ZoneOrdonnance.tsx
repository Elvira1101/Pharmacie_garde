import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { Texte } from "@/components/ui";
import { useTheme } from "@/theme";

export type ZoneOrdonnanceProps = {
  fichierJoint: string | null;
  onJoindre: () => void;
  onRetirer: () => void;
};

/** Zone de dépôt en pointillés pour joindre une photo d'ordonnance (facultatif). */
export function ZoneOrdonnance({
  fichierJoint,
  onJoindre,
  onRetirer,
}: ZoneOrdonnanceProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Ajouter une photo de l'ordonnance (facultatif)"
      onPress={onJoindre}
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: espacements.l,
        gap: espacements.xs,
        borderRadius: rayons.grand,
        borderWidth: 1.5,
        borderStyle: "dashed",
        borderColor: couleurs.contourChamp,
        backgroundColor: couleurs.surfaceSecondaire,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.primaireConteneur,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: espacements.xs,
        }}
      >
        <Ionicons name="camera-outline" size={24} color={couleurs.primaire} />
      </View>

      <Texte
        variante="corps"
        poids="semiGras"
        style={{ textAlign: "center", maxWidth: 250 }}
      >
        Ajouter une photo de l’ordonnance (facultatif)
      </Texte>

      <Texte
        variante="legende"
        couleur="texteSecondaire"
        style={{ textAlign: "center" }}
      >
        Formats acceptés : JPG, PNG (Max 5 Mo)
      </Texte>

      {fichierJoint ? (
        <View
          style={{
            marginTop: espacements.s,
            flexDirection: "row",
            alignItems: "center",
            gap: espacements.xs + 2,
            paddingHorizontal: espacements.s + espacements.xs,
            paddingVertical: espacements.xs,
            borderRadius: rayons.complet,
            backgroundColor: couleurs.primaireConteneur,
          }}
        >
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={couleurs.primaire}
          />
          <Texte variante="legende" poids="semiGras" couleur="primaire">
            {fichierJoint}
          </Texte>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Retirer l'ordonnance"
            hitSlop={espacements.s}
            onPress={onRetirer}
          >
            <Ionicons name="close-circle" size={16} color={couleurs.primaire} />
          </Pressable>
        </View>
      ) : null}
    </Pressable>
  );
}
