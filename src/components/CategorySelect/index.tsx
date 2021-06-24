import React from 'react';
import {View,Text, ScrollView} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import { styles } from './styles';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

type CategorySelectProps = {
  categorySelected?: string;
  enableCheckBox?:  boolean;
  setCategory: (category: string) => void;
}

export function CategorySelect({categorySelected, setCategory, enableCheckBox}:CategorySelectProps){
  return(
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingRight: 40}}
      style={styles.container}
    >
      {
        categories.map(category => (
          <Category
          hasCheckBox={enableCheckBox}
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === categorySelected}
            onPress={()=>setCategory(category.id)}
          />
        ))
      }
    </ScrollView>
    
  )
}