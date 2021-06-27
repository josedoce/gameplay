import React from 'react';
import {useFonts} from 'expo-font';
import {Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import {Rajdhani_500Medium, Rajdhani_700Bold} from '@expo-google-fonts/rajdhani';
import LoadingSplash from 'expo-app-loading';
import { Routes } from './src/routes';
import { Background } from './src/components/Background';
import { AuthProvider } from './src/hooks/auth';
import { LogBox } from 'react-native';

export default function App() {
  const [isCarregado] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium, 
    Rajdhani_700Bold
  });
  
  if(!isCarregado){
    return <LoadingSplash/>
  }
 
  return (
    <Background>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </Background> 
  );
}

