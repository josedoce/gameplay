import React from "react";
import {
  View,
  Text
} from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./styles";
import { GuildIcon } from "../../components/GuildIcon";
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
import { categories } from "../../utils/categories";
import { colors } from "../../global/styles/theme";


export type GuildProps = {
  id: string;
  name: string;
  icon: any;
  owner: boolean;
}

export type AppointmentDataProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
}

type AppointmentProps = RectButtonProps & {
  data: AppointmentDataProps;
}

export function Appointment({data, ...rest}:AppointmentProps){
  const [category] = categories.filter(item=>item.id === data.category);
  const {owner} = data.guild;
  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <GuildIcon />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              { data.guild.name }
            </Text>
            <Text style={styles.category}>
              { category.title }
            </Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg/>
              <Text style={styles.date}>
                { data.date }
              </Text>
            </View>
            <View style={styles.playerInfo}>
              <PlayerSvg fill={owner ? colors.primary : colors.on}/>
              <Text style={[
                styles.player,
                {color: owner ? colors.primary : colors.on}
              ]}>
                {owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
         
        </View>
      </View>
    </RectButton>
  )
}