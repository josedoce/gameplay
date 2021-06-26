import React, {ReactNode} from 'react';
import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback
} from 'react-native';
import { Background } from '../Background';
import { styles } from './styles';

type ModalViewProps = ModalProps & {
  children: ReactNode;
  sizeVerticalbox?:number|string;
  closeModal: () => void;
}

export function ModalView({children, sizeVerticalbox, closeModal, ...rest}:ModalViewProps){
  return (
    <Modal
    statusBarTranslucent
    transparent
    animationType="slide"
    {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={[styles.container, sizeVerticalbox?{marginTop: sizeVerticalbox}:{}]}>
            <Background>
              <View style={styles.bar}/>
              {children }
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}