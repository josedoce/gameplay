import React from "react";
import {Image} from 'react-native';
import { styles } from "./styles";

export function GuildIcon(){
  const uri = "https://play-lh.googleusercontent.com/GedBUrd46najAuenCvblsorvr85uFsEb1azoZ1YUBIIfRbUQqhxkT7cpErq4XCI-u9GQ"
  return(
    <Image
      source={{uri}}
      style={styles.image}
      resizeMode='cover'
    />
  )
}