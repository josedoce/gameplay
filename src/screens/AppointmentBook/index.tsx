import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { Load } from '../../components/Load';
import { ListDivider } from '../../components/ListDivider';
import { api } from '../../services/api';
import { Appointment, AppointmentDataProps } from '../../components/Appointment';
import { useFocusEffect } from '@react-navigation/native';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

type AppointmentProps = {
  handleAppointmentEdit: (appointment: AppointmentDataProps)=>void;
}

export function AppointmentBook({handleAppointmentEdit}:AppointmentProps){
  const [appointments, setAppointments] = useState<AppointmentDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  async function loadAppointments(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentDataProps[] = response ? JSON.parse(response) : [];
    
    setAppointments(storage);
    setLoading(false);
  }

  useFocusEffect(useCallback(()=>{
    loadAppointments();
  },[]));
  return (
    <View style={styles.container}>
     {loading
     ?<Load/> 
     :<FlatList 
        data={appointments}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <Appointment
            data={item}
            onPress={()=>handleAppointmentEdit(item)}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 68,
          paddingTop: 103
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={()=><ListDivider enableCentered/>}
        ListHeaderComponent={()=><ListDivider enableCentered/>}
        style={styles.guilds}
      />}
    </View>
  )
}