import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react';
import * as AuthSession from 'expo-auth-session';
import { discord } from '../configs';
import { api } from '../services/api';

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
  loading: boolean;
  signIn: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}:AuthProviderProps){
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false)
  const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${discord.CLIENT_ID}&redirect_uri=${discord.REDIRECT_URI}&response_type=${discord.RESPONSE_TYPE}&scope=${discord.SCOPE}`;
  async function signIn(){
    try {
      setLoading(true);
      const {
        params,
        type
      } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
      
      if(type === 'success'){
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;
        const userInfo = await api.get('/users/@me');
        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${discord.CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;
        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token
        });
        setLoading(false);
      }else{
        setLoading(false);
      }

    } catch {
      throw new Error('Não foi possivel autenticar.');
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn
    }}>
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
  useAuth, 
}