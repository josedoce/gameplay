import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  FlatList
} from 'react-native';
import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { styles } from './styles';
import { colors } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentDetails(){
  const members = [
    {
      id: '1',
      username: 'Rodrigo',
      avatar_url: 'https://github.com/rodrigorgtic.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'Josedoce',
      avatar_url: 'https://github.com/josedoce.png',
      status: 'offline'
    },
  ]
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto
                name="share"
                size={24}
                color={colors.primary}
              />
          </BorderlessButton>
        }
      />
      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            Lendários
          </Text>
          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder partida da md10
          </Text>
        </View>
      </ImageBackground>
      <ListHeader
        title="Jogadore"
        subtile="Total 3"
      />
      <FlatList 
        data={members}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <Member data={item}/>
        )}
        ItemSeparatorComponent={()=><ListDivider/>}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida"/>
      </View>
    </Background>
  )
} 