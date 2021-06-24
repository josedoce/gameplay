import React from "react";
import {
  View,
  Text
} from 'react-native';
import { styles } from "./style";

type ListHeaderProps = {
  title: string;
  subtile: string;
}

export function ListHeader({subtile, title}:ListHeaderProps){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>{ title }</Text>
      <Text style={styles.subtitle}>{ subtile }</Text>
    </View>
  )
}