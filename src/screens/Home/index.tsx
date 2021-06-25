import React, {useState} from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointment, AppointmentDataProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home(){ 
  const [clicado, setClicado] = useState<string>('');
  const navigation = useNavigation();
  const appointments = [
    {
      id: '1', 
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null, 
        owner: true
      },
      category: '1',
      date: '22/06 as 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    },
    {
      id: '2', 
      guild: {
        id: '1',
        name: 'Los Galos',
        icon: null, 
        owner: false
      },
      category: '2',
      date: '22/06 as 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    },
  ]

  function handleAppointmentDetails(data: AppointmentDataProps){
    navigation.navigate('AppointmentDetails');
  }

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate');
  }

  function handleCategorySelect(categoryId: string){
    categoryId === clicado ? setClicado('') : setClicado(categoryId);
  }
  return (
    <Background>
      <View style={styles.header}>
        <Profile/>
        <ButtonAdd
          onPress={handleAppointmentCreate}
        />
      </View>

        <CategorySelect
          categorySelected={clicado}
          setCategory={handleCategorySelect}
        />
        <ListHeader 
          title="Algum jogo" 
          subtile="Nem imagino qual seja"
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
    </Background>
  )
}