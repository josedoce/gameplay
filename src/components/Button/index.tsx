import React from "react";
import {
  Text,
} from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./style";

/**
 * aqui digo que esse tipo usará tanto o que defini
 * quanto o que importei do component
*/
type ButtonIconProps = RectButtonProps & {
  title?: string;
}

export function Button({title, ...rest} : ButtonIconProps){
  return(
    <RectButton
      style={styles.container}
      {...rest}>
      <Text style={styles.title}>
        {title}
      </Text>
    </RectButton>
  )
}