import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import uuid from 'react-native-uuid';
import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { CategorySelect } from '../../components/CategorySelect';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../global/styles/theme';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildDataProps } from '../../components/Guild';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { useNavigation } from '@react-navigation/core';

export function AppointmentCreate(){
  const [clicado, setClicado] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [guildSelected, setGuildSelected] = useState<GuildDataProps>({}as GuildDataProps);
  //#region formulario
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  //#endregion

  const navigation = useNavigation();

  //#region events
  function handleOpenModal(){
    setIsModal(true);
  }

  function handleCloseModal(){
    setIsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildDataProps){
    setGuildSelected(guildSelect);
    setIsModal(false);
  }

  function handleCategorySelect(categoryId: string){
    setClicado(categoryId);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild: guildSelected,
      category: clicado,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage): [];
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate('Home');
  };
  //#endregion
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios'?'padding':'height'}
      style={styles.container}>
      <Background>
        <ScrollView>
        <Header
          title="Agendar partida"
        />

        <Text style={[
          styles.label,
          {marginLeft: 24, marginTop: 36, marginBottom: 18}
        ]}>
          Categoria
        </Text>

        <CategorySelect
          enableCheckBox
          setCategory={handleCategorySelect}
          categorySelected={clicado}
        />
        
        <View style={styles.form}>
          <RectButton onPress={handleOpenModal}>
            <View style={styles.select}>
              {
                guildSelected.icon
                ?<GuildIcon guildId={guildSelected.id} iconId={guildSelected.icon}/>
                :<View style={styles.image}/>
              }

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {guildSelected?guildSelected.name: 'Selecione um servidor'}
                </Text>
              </View>

              <Feather 
                name="chevron-right"
                color={colors.heading}
                size={18}
              />
            </View>
          </RectButton>
          <View style={styles.field}>
            <View>
              <Text style={styles.label}>
                Dia e mês
              </Text>
              <View style={styles.column}>
                <SmallInput
                  maxLength={2}
                  onChangeText={setDay}
                />
                <Text style={styles.divider}>
                  /
                </Text>
                <SmallInput
                  maxLength={2}
                  onChangeText={setMonth}
                />
              </View>
            </View>
            <View>
              <Text style={styles.label}>
                Hora e minuto
              </Text>
              <View style={styles.column}>
                <SmallInput
                  maxLength={2}
                  onChangeText={setHour}
                />
                <Text style={styles.divider}>
                  :
                </Text>
                <SmallInput
                  maxLength={2}
                  onChangeText={setMinute}
                />
              </View>
            </View>
          </View>
          <View style={[styles.field,{marginBottom: 12}]}>
            <Text style={styles.label}>
              Descrição
            </Text>
            <Text style={styles.caracteresLimit}>
              Max 100 caracteres
            </Text>
          </View>
          <TextArea
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
            onChangeText={setDescription}
          />
          <View style={styles.footer}>
            <Button 
              title="Agendar"
              onPress={handleSave}/>
          </View>
        </View>
      </ScrollView>
      </Background>
      <ModalView closeModal={handleCloseModal} visible={isModal}>
        <Guilds
          handleGuildSelect={handleGuildSelect}
        />
      </ModalView>
    </KeyboardAvoidingView>
  )
} 