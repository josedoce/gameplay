import React, {useState, useCallback} from 'react';
import {
  View,
  FlatList, Text
} from 'react-native';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointment, AppointmentDataProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { Load } from '../../components/Load';
import { ModalView } from '../../components/ModalView';
import { ModalLogout } from '../../components/ModalLogout';
import { useAuth } from '../../hooks/auth';

export function Home(){ 
  const [clicado, setClicado] = useState<string>('');
  const [appointments, setAppointments] = useState<AppointmentDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const [isModal, setIsModal] = useState<boolean>(false);
  const {signOut} = useAuth();
  
  function handleAppointmentDetails(data: AppointmentDataProps){
    navigation.navigate('AppointmentDetails', {guildSelected: data});
  }

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate');
  }

  function handleCategorySelect(categoryId: string){
    categoryId === clicado ? setClicado('') : setClicado(categoryId);
  }

  async function loadAppointments(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentDataProps[] = response ? JSON.parse(response) : [];
    if(clicado){
      setAppointments(storage.filter(item=>item.category === clicado));
    }else{
      setAppointments(storage);
    }
    setLoading(false);
  }

  useFocusEffect(useCallback(()=>{
    loadAppointments();
  },[clicado]));
  
  function handleSignOut(){
    setIsModal(true)
  }

  function handleSignOutConfirm(){
    signOut();
    setIsModal(false)
  }
  
  function handleSignOutClose(){
    setIsModal(false)
  }
  return (
    <Background>
      <View style={styles.header}>
        <Profile handleSignOut={handleSignOut}/>
        <ButtonAdd
          onPress={handleAppointmentCreate}
        />
      </View>

        <CategorySelect
          categorySelected={clicado}
          setCategory={handleCategorySelect}
        />
        
        {loading
          ?<Load/>
          :<>
            <ListHeader 
              title="Algum jogo" 
              subtile={`Total ${appointments.length}`}
            />
            <FlatList
              data={appointments}
              keyExtractor={item=>item.id}
              renderItem={({item})=>(
                <Appointment
                  onPress={()=>handleAppointmentDetails(item)} 
                  data={item}/>
              )}
              ItemSeparatorComponent={()=><ListDivider/>}
              contentContainerStyle={{
                paddingBottom: 69
              }}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
            />
          </>}
        <ModalView sizeVerticalbox={700} closeModal={handleSignOutClose} visible={isModal}>
          <ModalLogout closeModel={handleSignOutClose} actionModel={handleSignOutConfirm}/>
        </ModalView>
    </Background>
  )
}