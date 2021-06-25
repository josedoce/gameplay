import React from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { styles } from './styles';
import { Guild, GuildDataProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

type GuildsProps = {
  handleGuildSelect: (guild: GuildDataProps)=>void;
}

export function Guilds({handleGuildSelect}:GuildsProps){
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'imagem.png',
      owner: true,
    },
    {
      id: '2',
      name: 'Los galos',
      icon: 'imagem.png',
      owner: false,
    },
  ]
  return (
    <View style={styles.container}>
      <FlatList 
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
      />
    </View>
  )
}