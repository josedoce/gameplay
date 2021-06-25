import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import { AuthRoutes } from "./auth.routes";
import { SignIn } from "../screens/Signin";
import { useAuth } from "../hooks/auth";

//se tem usuario logado, ele avança pras telas, caso contrario, fica no signin
export function Routes(){
  const {user} = useAuth();
  return(//essa parte cuida da logica de paginação
    <NavigationContainer>
      {user.id?<AuthRoutes/>:<SignIn/>}
    </NavigationContainer>
  )
}