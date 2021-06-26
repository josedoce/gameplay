# Gameplay

## O que aprendi: 

### atalhos: 
* [Usando .env no rn](#dotenv-no-react-native)
* [Usando storage](#persistência-de-dados)
* [Usando autenticação](#autenticação)
* [Usando context](#context)
* [Usando svg](#uso-de-svg-no-expo)
* [Usando gradient](#uso-de-efeito-gradient)
* [Usando fontes](#carregamento-de-fontes)

#### dotenv no react-native [#](#atalhos)
para o react entender dotenv, instale os seguintes pacotes:
`$ yarn add dotenv babel-plugin-inline-dotenv`
e configura o babel.config.js adicionando: 
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins:["inline-dotenv"]
  };
};
```

#### persistência de dados [#](#atalhos)
> funcao: 
> 

instale via comando:
Expo asyncStorage
`$ https://docs.expo.io/versions/latest/sdk/async-storage/`
#### autenticação [#](#atalhos)

usaremos a autenticação com o OAuth2
o OAuth2 é um dos protocolos mais seguros que há

instale via comando:
> funcao: authenticação
> https://docs.expo.io/versions/latest/sdk/auth-session/

`$ expo install expo-auth-session expo-random`
#### context [#](#atalhos)
instale via comando:
> funcao: centralizar o estado para ser usado por muitas telas.

```ts
import React, {
  createContext, //usado para criar o contexto a ser compatilhado
  useContext, //usar o contexto que foi criado
  useState,
  ReactNode
} from 'react';

type User = {
  id: string;
  userName: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextData = {
  user: User;
}

type AuthProviderProps = {
  children: ReactNode;
}
//é tipo o redux saga
//esse é o contexto de autenticação
export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}:AuthProviderProps){
  const [user, setUser] = useState<User>({} as User);
  
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}

export {
  AuthProvider,
  useAuth
}
```

#### uso de svg no expo [#](#atalhos)
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

#### uso de efeito gradient [#](#atalhos)
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
#### carregamento de fontes [#](#atalhos)
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