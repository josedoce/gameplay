import React from 'react';
import {
  View, 
  ActivityIndicator
} from 'react-native';
import { colors } from '../../global/styles/theme';
import { styles } from './styles';

export function Load(){
  return (
    <View style={styles.container}>
       <ActivityIndicator
          size="large"
          color={colors.primary}
       />
    </View>
  )
}