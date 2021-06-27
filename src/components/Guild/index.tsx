import React from 'react';
import {
  Text,
  View,
  TouchableOpacity, 
  TouchableOpacityProps
} from 'react-native';
import { styles } from './styles';
import { GuildIcon } from '../GuildIcon';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../global/styles/theme';

export type GuildDataProps = {
  id: string;
  name: string|null;
  icon: string|null|undefined;
  owner: boolean;
}

type GuildProps = TouchableOpacityProps & {
  data: GuildDataProps;
}

export function Guild({data, ...rest}:GuildProps){
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
      {...rest}>
      <GuildIcon guildId={data.id} iconId={data.icon}/>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
        </View>
        <Text style={styles.type}>
          { data.owner ? 'Admnistrador':'Convidado'}
        </Text>
      </View>
      <Feather 
        name="chevron-right"
        color={colors.heading}
        size={24}/>
    </TouchableOpacity>
  )
}   