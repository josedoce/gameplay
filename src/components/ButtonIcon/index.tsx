import React from "react";
import {
  Image,
  Text,
  View
} from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./style";
import DiscordImg from '../../assets/discord.png';

/**
 * aqui digo que esse tipo usará tanto o que defini
 * quanto o que importei do component
*/
type ButtonIconProps = RectButtonProps & {
  title?: string;
}

export function ButtonIcon({title, ...rest} : ButtonIconProps){
  return(
    <RectButton
      style={styles.container}
      {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImg} style={styles.icon}/>
      </View>
      <Text style={styles.title}>
        {title}
      </Text>
    </RectButton>
  )
}