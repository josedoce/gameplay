import React from 'react';
import {
  TouchableOpacity, TouchableOpacityProps, Text
} from 'react-native';
import { colors } from '../../global/styles/theme';
import { styles } from './styles';

type ModalButtonProps = TouchableOpacityProps&{
  title: string;
  outline?:boolean;
}

export function ModalButton({title,outline,...rest}:ModalButtonProps){
  return (
    <TouchableOpacity
      style={[styles.container,outline?{
        borderWidth: 1,
        borderColor: colors.secondary40
      }:{backgroundColor: colors.primary,}]}
      activeOpacity={0.7}
        {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}