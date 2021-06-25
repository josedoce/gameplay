import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
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

export function AppointmentCreate(){
  const [clicado, setClicado] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [guildSelected, setGuildSelected] = useState<GuildDataProps>({}as GuildDataProps);

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
                ?<GuildIcon />
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
                />
                <Text style={styles.divider}>
                  /
                </Text>
                <SmallInput
                  maxLength={2}
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
                />
                <Text style={styles.divider}>
                  :
                </Text>
                <SmallInput
                  maxLength={2}
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
            
          />

          <View style={styles.footer}>
            <Button title="Agendar"/>
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