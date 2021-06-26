import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { ModalButton } from '../ModalButton';
import { styles } from './styles';

type ModelLogoutProps = {
  closeModel: ()=>void;
  actionModel: ()=>void;
}

export function ModalLogout({closeModel, actionModel}:ModelLogoutProps){
  return (
    <>
    <Text style={styles.title}>Deseja fazer logout?</Text>
    <View style={styles.container}> 
       <View style={styles.botoes}>
          <ModalButton
            onPress={closeModel}
            outline 
            title="cancelar"/>
       </View>
       <View style={styles.botoes}>
        <ModalButton
          onPress={actionModel} 
          title="confirmar"/>
       </View>
    </View>
    </>
  )
}