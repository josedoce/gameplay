import React from "react";
import { 
  Image 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { colors } from "../../global/styles/theme";

type AvatarProps = {
  urlImage: string;
}

export function Avatar({urlImage}:AvatarProps){
  const {secondary50,secondary70} = colors;
  return (
    <LinearGradient
    style={styles.container}
    colors={[secondary50, secondary70]}
    >
      <Image
        source={{uri: urlImage}}
        style={styles.avatar}
      />
    </LinearGradient>
  )
}