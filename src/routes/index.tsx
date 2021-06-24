import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import { AuthRoutes } from "./auth.routes";

export function Routes(){
  return(//essa parte cuida da logica de paginação
    <NavigationContainer>
      <AuthRoutes/>
    </NavigationContainer>
  )
}