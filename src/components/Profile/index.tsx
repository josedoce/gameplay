import React,{useState} from "react";
import { 
  View,
  Text,
  Alert
} from "react-native";
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";
import { styles } from "./styles";
import { RectButton } from "react-native-gesture-handler";
import { ModalView } from "../ModalView";

type ProfileProps = {
  handleSignOut: () => void;
}

export function Profile({handleSignOut}:ProfileProps){
  const {user, signOut} = useAuth();
  
  
  return(
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar}/>
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>
          <Text style={styles.username}>
            {user.firstName?user.firstName:'carregando...'}
          </Text>
        </View>
        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>
    </View>
  )
}