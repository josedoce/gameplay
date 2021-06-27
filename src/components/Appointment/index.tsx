import React from "react";
import {
  View,
  Text,
  TouchableOpacity, TouchableOpacityProps
} from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./styles";
import { GuildIcon } from "../../components/GuildIcon";
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
import { categories } from "../../utils/categories";
import { colors } from "../../global/styles/theme";
import { GuildDataProps } from "../Guild";
import { LinearGradient } from "expo-linear-gradient";

export type AppointmentDataProps = {
  id: string;
  guild: GuildDataProps;
  category: string;
  date: string;
  description: string;
}

type AppointmentProps = TouchableOpacityProps & {
  data: AppointmentDataProps;
}

export function Appointment({data, ...rest}:AppointmentProps){
  const [category] = categories.filter(item=>item.id === data.category);
  const {owner} = data.guild;
  return (
    <TouchableOpacity {...rest}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[colors.secondary50, colors.secondary70]}>
          <GuildIcon 
            guildId={data.guild.id} 
            iconId={data.guild.icon}/>
        </LinearGradient>
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
    </TouchableOpacity>
  )
}