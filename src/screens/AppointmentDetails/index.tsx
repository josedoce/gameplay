import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  FlatList,
  Alert,
  Share,
  Platform
} from 'react-native';
import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { styles } from './styles';
import { colors } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberDataProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentDataProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Load } from '../../components/Load';
import * as Linking from 'expo-linking';

type Params = {
  guildSelected: AppointmentDataProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberDataProps[];
}

export function AppointmentDetails(){
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute();
  const {guildSelected} = route.params as Params;
  
  async function fetchGuildInfo(){
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch {
      Alert.alert('Erro de busca','Verifique as configurações do servidor deste administrador. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }
  
  function handleShareInvitation(){
    const message = Platform.OS === 'ios'
    ?`Junte-se a ${guildSelected.guild.name}`
    :widget.instant_invite;
    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  function handleOpenGuild(){
    if(widget.instant_invite===null){
      Alert.alert('Erro ao entrar','Não foi possivel entrar no servidor, consulte o adm deste servidor.',[
        {text: 'Entendi', style: 'default'}
      ])
      return;
    }
    Linking.openURL(widget.instant_invite);
  }
  useEffect(()=>{
    fetchGuildInfo();
  },[]);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner&&
          <BorderlessButton
            onPress={handleShareInvitation}
          >
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
            {guildSelected.guild.name}
          </Text>
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>
      {loading
      ?<Load/>
      :<>
        <ListHeader
          title="Jogadores"
          subtile={`${widget.members == undefined?'Não há dados.':'Total '+widget.members.length}`}
        />
        <FlatList 
          data={widget.members}
          keyExtractor={item=>item.id}
          renderItem={({item})=>(
            <Member data={item}/>
          )}
          ItemSeparatorComponent={()=><ListDivider enableCentered/>}
          style={styles.members}
        />
      </>}

      {widget.instant_invite!=undefined&&<View style={styles.footer}>
        <ButtonIcon
          onPress={handleOpenGuild} 
          title="Entrar na partida"/>
      </View>}
    </Background>
  )
} 