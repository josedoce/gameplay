import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { colors } from '../../global/styles/theme';
import { Avatar } from '../Avatar';
import { styles } from './styles';

export type MemberDataProps = {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
}

type MemberProps = {
  data: MemberDataProps;
}

export function Member({data}:MemberProps){
  const isOnline = data.status === 'online';
  const {on, primary} = colors;
  return (
    <View style={styles.container}>
      <Avatar urlImage={data.avatar_url} />
      <View>
        <Text style={styles.title}>
          { data.username }
        </Text>
        <View style={styles.status}>
          <View style={[
            styles.bulletStatus,
            {
              backgroundColor: isOnline? on: primary
            }
          ]}/>
          <Text style={styles.nameStatus}>
            {isOnline ? 'Disponivel':'Ocupado'}
          </Text>
        </View>
      </View>
    </View>
  )
}