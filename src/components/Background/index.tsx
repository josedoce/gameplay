import React, { ReactNode } from 'react';
import {

} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { styles } from './styles';
import { colors } from '../../global/styles/theme';

type BackgroundProps = {
  children: ReactNode;
}

export function Background({children}:BackgroundProps){
  const {secondary80, secondary100} = colors;
  return (
    <LinearGradient
    style={styles.container}
    colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  );
}