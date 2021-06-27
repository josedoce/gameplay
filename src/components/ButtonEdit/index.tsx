import React, {ReactNode} from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./styles";

type ButtonEditProps = RectButtonProps&{
  children: ReactNode;
}

export function ButtonEdit({children,...rest}:ButtonEditProps){
  return (
    <RectButton 
      style={styles.container}
      {...rest}
    >
      {children}
    </RectButton>
  )
}

