import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

import { famillePolice, useTheme } from "@/theme";

export type BarreRechercheCarteProps = {
  valeur: string;
  onChangeText: (texte: string) => void;
  placeholder?: string;
  onFiltres?: () => void;
};

/** Barre de recherche flottante en pilule au-dessus de la carte. */
export function BarreRechercheCarte({
  valeur,
  onChangeText,
  placeholder = "Pharmacies de garde à Bastos",
  onFiltres,
}: BarreRechercheCarteProps) {
  const { couleurs, espacements, rayons, typographie } = useTheme();

  return (
    <View
      style={{
        minHeight: espacements.xxl,
        flexDirection: "row",
        alignItems: "center",
        gap: espacements.s,
        paddingHorizontal: espacements.m,
        borderRadius: rayons.complet,
        backgroundColor: couleurs.surface,
        borderWidth: 1,
        borderColor: couleurs.bordure,
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.08)",
      }}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color={couleurs.texteSecondaire}
      />

      <TextInput
        value={valeur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={couleurs.texteSecondaire}
        selectionColor={couleurs.primaire}
        accessibilityLabel="Rechercher une pharmacie de garde"
        style={{
          flex: 1,
          color: couleurs.textePrincipal,
          fontFamily: famillePolice.moyen,
          fontSize: typographie.tailles.secondaire,
          paddingVertical: 0,
        }}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Filtrer les pharmacies"
        hitSlop={espacements.s}
        onPress={onFiltres}
        style={{
          width: 32,
          height: 32,
          borderRadius: rayons.complet,
          backgroundColor: couleurs.surfaceSecondaire,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="options-outline"
          size={17}
          color={couleurs.texteSecondaire}
        />
      </Pressable>
    </View>
  );
}
