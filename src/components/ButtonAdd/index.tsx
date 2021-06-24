import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from "../../global/styles/theme";

export function ButtonAdd({...rest}:RectButtonProps){
  return (
    <RectButton 
      style={styles.container}
      {...rest}
    >
      <MaterialCommunityIcons
        name="plus"
        color={colors.heading}
        size={24}
      />
    </RectButton>
  )
}