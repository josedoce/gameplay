import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { ModalButton } from '../ModalButton';
import { styles } from './styles';

type ModelLogoutProps = {
  title: string;
  buttonsOneandTwo?: string[];
  closeModel: ()=>void;
  actionModel: ()=>void;
}

export function ModalConfirm({title,buttonsOneandTwo=['cancelar','confirmar'], closeModel, actionModel}:ModelLogoutProps){
  return (
    <>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.container}> 
       <View style={styles.botoes}>
          <ModalButton
            onPress={closeModel}
            outline 
            title={buttonsOneandTwo[0]}/>
       </View>
       <View style={styles.botoes}>
        <ModalButton
          onPress={actionModel} 
          title={buttonsOneandTwo[1]}/>
       </View>
    </View>
    </>
  )
}