### Guia do estudo

##### uso svg
instale via comando:
> funcao: Fazer o react lidar com svgs
`$ expo install react-native-svg`

> funcao: Fazer dos svgs components para o react
`$ yarn add --dev react-native-svg-transformer`

crie um arquivo de configuração para o rnst
> metro.config.js
```js
  // expo v40:
const { getDefaultConfig } = require("@expo/metro-config");

// expo v41: 
// remove the @ (see: https://blog.expo.io/expo-sdk-41-12cc5232f2ef)
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();
```

##### uso de efeito gradient
instale via comando:

`$ expo install expo-linear-gradient` 

> backgroundComponent.tsx

```ts
import React, { ReactNode } from 'react';
import {

} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { styles } from './styles';
import { colors } from '../../global/styles/theme';

type BackgroundProps = {
  children: ReactNode;
}

export default function Background({children}:BackgroundProps){
  const {secondary80, secondary100} = colors;
  //configuração basica para usar o linear-gradient
  return (
    <LinearGradient
    style={styles.container}
    colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  );
}
```

---
##### carregamento de fontes
instale via comando:

`$ expo install expo-font`

`$ expo install @expo-google-fonts/nome_da_fonte`

`$ expo install expo-app-loading`
> App.tsx

```ts
import {useFonts} from 'expo-font';
import {Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import {Rajdhani_500Medium, Rajdhani_700Bold} from '@expo-google-fonts/rajdhani';
import LoadingSplash from 'expo-app-loading';

export default function App() {
  const [isCarregado] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium, 
    Rajdhani_700Bold
  });
  
  if(!isCarregado){
    /**
     * para usar o splash nessa operação, use o expo-app-loading
     * com esse component aqui, ele segurará a tela de load ate
     * a fonte carregar.
     * apos isso tudo, defina a fonte no estilo.
     */
    return <LoadingSplash/>
  }
  return (
    <RAplicacao/>
  );
}
```
---
>fonts.ts
```ts
export const fonts = {
  title700: 'Rajdhani_700Bold',
  title500: 'Rajdhani_500Medium',
  text400: 'Inter_400Regular',
  text500: 'Inter_500Medium',
}
```
---
> style.ts
```ts
//"veja, aqui importamos a fonte, mas
//se optar, pode colocar diretamente."

//'indiretamente'
title: {
  fontFamily: fonts.title700,
},
//'diretamente'
title: {
  fontFamily: 'Rajdhani_700Bold',
},
```