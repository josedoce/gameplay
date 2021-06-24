import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { SignIn } from "../screens/Signin";
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from "../screens/AppointmentCreate";
import { colors } from "../global/styles/theme";

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes(){
  return(
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.secondary100
        }
      }}
    >
      <Screen 
        name="Signin" 
        component={SignIn}
      />

      <Screen 
        name="Home" 
        component={Home}
      />

      <Screen 
        name="AppointmentDetails" 
        component={AppointmentDetails} 
      />

      <Screen 
        name="AppointmentCreate"
        component={AppointmentCreate}
      />
    </Navigator>
  )
}