import React from "react";
import {View} from 'react-native';
import { styles } from "./styles";

type ListDividerProps = {
  enableCentered?:boolean;
}

export function ListDivider({enableCentered}:ListDividerProps){
  return (
    <View style={[
      styles.container,
      enableCentered ? {
        marginVertical: 12,
      } : {
        marginTop: 2,
        marginBottom: 31
      }
    ]}/>
  )
}