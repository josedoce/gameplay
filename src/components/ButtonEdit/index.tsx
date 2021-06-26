import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./styles";
import { AntDesign  } from '@expo/vector-icons';
import { colors } from "../../global/styles/theme";

export function ButtonEdit({...rest}:RectButtonProps){
  return (
    <RectButton 
      style={styles.container}
      {...rest}
    >
      <AntDesign name="edit" size={24} color={colors.heading} />
    </RectButton>
  )
}

