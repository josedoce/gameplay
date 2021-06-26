import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { styles } from './styles';
import { Guild, GuildDataProps } from '../../components/Guild';
import { Load } from '../../components/Load';
import { ListDivider } from '../../components/ListDivider';
import { api } from '../../services/api';

type GuildsProps = {
  handleGuildSelect: (guild: GuildDataProps)=>void;
}

export function Guilds({handleGuildSelect}:GuildsProps){
  const [guilds, setGuilds] = useState<GuildDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  async function fetchGuilds(){
    const response = await api.get('/users/@me/guilds');
    setGuilds(response.data);
    setLoading(false)
  }
  useEffect(()=>{
    fetchGuilds();
  },[]);
  return (
    <View style={styles.container}>
     {loading
     ?<Load/> 
     :<FlatList 
        data={guilds}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <Guild
            data={item}
            onPress={()=>handleGuildSelect(item)}
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