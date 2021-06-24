declare module "*.svg" {
  import React from "react"; //importe o react
  import {SvgProps} from 'react-native-svg'; //import o tipo svg
  const content: React.FC<SvgProps>; //avise ao React que o tipo svg é um component funcional
  export default content; //exporte para o react essa declaração
};