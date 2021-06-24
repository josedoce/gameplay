import React from "react";
import { 
  View,
  Text
} from "react-native";
import { Avatar } from "../Avatar";
import { styles } from "./styles";

export function Profile(){
  return(
    <View style={styles.container}>
      <Avatar urlImage="https://user-images.githubusercontent.com/66434808/122999409-a1492000-d384-11eb-9e5c-91b24b8106e1.png"/>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>
          
          <Text style={styles.username}>
            Jose
          </Text>
        </View>
        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>
    
    </View>
  )
}