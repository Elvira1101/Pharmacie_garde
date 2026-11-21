import { View } from "react-native";

import { useTheme } from "@/theme";

export type PaginationPointsProps = {
  total: number;
  /** Index (base 0) de la page active. */
  actif: number;
};

/** Indicateur de pagination : le point actif est allongé et coloré. */
export function PaginationPoints({ total, actif }: PaginationPointsProps) {
  const { couleurs, espacements, rayons } = useTheme();

  return (
    <View
      accessible
      accessibilityLabel={`Page ${actif + 1} sur ${total}`}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: espacements.xs,
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={{
            height: 6,
            width: i === actif ? 20 : 6,
            borderRadius: rayons.complet,
            backgroundColor: i === actif ? couleurs.primaire : couleurs.bordure,
          }}
        />
      ))}
    </View>
  );
}
