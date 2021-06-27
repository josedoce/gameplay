import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as yup from 'yup';
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
import { ButtonEdit } from '../../components/ButtonEdit';
import { AppointmentBook } from '../AppointmentBook';
import { AppointmentDataProps } from '../../components/Appointment';
import { Ionicons } from '@expo/vector-icons';
import { ModalConfirm } from '../../components/ModalConfirm';

export function AppointmentEdit(){
  const [clicado, setClicado] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [guildSelected, setGuildSelected] = useState<GuildDataProps>({}as GuildDataProps);
  const [appointmentSelected, setAppointmentSelected] = useState<AppointmentDataProps>({} as AppointmentDataProps);

  //#region formulario
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  const [isExcludeModal, setIsExcludeModal] = useState<boolean>(false);
  //#endregion

  const navigation = useNavigation();

  //#region events
  function handleOpenModal(){
    setIsModal(true);
  }

  function handleEditOpenModal(){
    setIsEditModal(true);
  }

  function handleCloseModal(){
    setIsModal(false);
  }

  function handleEditCloseModal(){
    setIsEditModal(false);
  }

  function handleGuildSelect(guildSelect: GuildDataProps){
    setGuildSelected(guildSelect);
    setIsModal(false);
  }

  function handleAppointmentEdite(appointment: AppointmentDataProps){
    setAppointmentSelected(appointment);
    const getDate = appointment.date.split(' ');
    const date = getDate[0].split('/');
    const hour = getDate[2].split(':');
    const data = {
      day: date[0],
      mon: date[1],
      hou: hour[0],
      min: hour[1].replace('h','')
    }
    setDay(data.day)
    setMonth(data.mon)
    setHour(data.hou)
    setMinute(data.min)
    setDescription(appointment.description)
    setGuildSelected(appointment.guild)
    setClicado(appointment.category)
    setIsEditModal(false);
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
    
    const schema = yup.object().shape({
      id: yup.string().required(),
      guild: yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        icon: yup.string().optional(),
        owner: yup.bool().required()
      }),
      category: yup.string().required(),
      date: yup.string().required().length(15),
      description: yup.string().required()
    })

    try {
      await schema.validate(newAppointment);
    } catch {
      Alert.alert('Faltou algo, amiguinho.','Preencha todos os dados e tente novamente.');
      return;
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments:AppointmentDataProps[] = storage ? JSON.parse(storage): [];
    const filtrado = appointments.filter((e)=>e.id != appointmentSelected.id);
    
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...filtrado, newAppointment])
    );

    navigation.navigate('Home');
  };

  function handleOpenExclude(){
    setIsExcludeModal(true)
  }

  function handleExcludeClose(){
    setIsExcludeModal(false)
  }
  async function handleExcludeConfirm(){
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments:AppointmentDataProps[] = storage ? JSON.parse(storage): [];
    const filtrado = appointments.filter((e)=>e.id != appointmentSelected.id);
    const excluido = appointmentSelected;
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...filtrado])
    );
    setIsExcludeModal(false);
    Alert.alert('Item excluido',`O agendamento "${excluido.guild.name}" foi excluido.`);
    navigation.navigate('Home');
  }
  //#endregion
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios'?'padding':'height'}
      style={styles.container}>
      <Background>
        <ScrollView>
        <Header
          title="Editar partida"
          action={
            appointmentSelected.id==undefined
            ?<>
            </>
            :<ButtonEdit onPress={handleOpenExclude}>
              <Ionicons 
                name="md-trash-outline" 
                size={24} color={colors.heading} />
            </ButtonEdit>
          }
        />
        <Text style={[
          styles.label,
          {marginLeft: 24, marginTop: 26, marginBottom: 0}
        ]}>
          Selecione qual deseja editar
        </Text>
        <View style={styles.edit}>
          <RectButton onPress={handleEditOpenModal}>
            <View style={styles.select}>
              {
                appointmentSelected.guild
                ?<GuildIcon guildId={appointmentSelected.guild.id} iconId={appointmentSelected.guild.icon}/>
                :<View style={styles.image}/>
              }

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {appointmentSelected.id!=undefined
                    ?appointmentSelected.guild.name
                    :'Editar um agendamento'
                  }
                </Text>
              </View>

              <Feather 
                name="chevron-right"
                color={colors.heading}
                size={18}
              />
            </View>
          </RectButton>
        </View>
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
                  {guildSelected.id!=undefined
                    ?guildSelected.name
                    :'Selecione um servidor'
                  }
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
                  value={day}
                  maxLength={2}
                  onChangeText={setDay}
                />
                <Text style={styles.divider}>
                  /
                </Text>
                <SmallInput
                  value={month}
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
                  value={hour}
                  maxLength={2}
                  onChangeText={setHour}
                />
                <Text style={styles.divider}>
                  :
                </Text>
                <SmallInput
                  value={minute}
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
            value={description}
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
            onChangeText={setDescription}
          />
          <View style={styles.footer}>
            <Button 
              title="Salvar edição"
              onPress={handleSave}/>
          </View>
        </View>
      </ScrollView>
      </Background>

      <ModalView sizeVerticalbox={700} closeModal={handleExcludeClose} visible={isExcludeModal}>
          <ModalConfirm
            title="Deseja mesmo escluir ?"
            buttonsOneandTwo={['cancelar','excluir']} 
            closeModel={handleExcludeClose} 
            actionModel={handleExcludeConfirm}/>
      </ModalView>
      <ModalView closeModal={handleEditCloseModal} visible={isEditModal}>
        <AppointmentBook handleAppointmentEdit={handleAppointmentEdite}/>
      </ModalView>
      <ModalView closeModal={handleCloseModal} visible={isModal}>
        <Guilds handleGuildSelect={handleGuildSelect}/>
      </ModalView>
    </KeyboardAvoidingView>
  )
} 