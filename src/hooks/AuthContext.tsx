/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

import FireStore from "@react-native-firebase/firestore";
import Auth from '@react-native-firebase/auth'
import * as Facebook from 'expo-facebook'
import { IUsersDto } from "../dtos";

export interface User {
  id: string;
  nome: string;
  adm: boolean;
  padrinhQuantity: number;
}

interface SignInCred {
  email: string;
  senha: string;
}

interface AuthContexData {
  user: IUsersDto | null;
  loading: boolean;
  signIn(credential: SignInCred): Promise<void>;
  loginSocial(): Promise<void>;
  signOut(): void;
  updateUser(user: IUsersDto): Promise<void>;
  listUser: IUsersDto[] | null;
}

const User_Collection = "@Geb:user";

export const AuthContext = createContext<AuthContexData>({} as AuthContexData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUsersDto | null>(null);

  const [listUser, setListUser] = useState<IUsersDto[]>([]);

  const LoadingUser = useCallback(async () => {
    setLoading(true);

    const storeUser = await AsyncStorage.getItem(User_Collection);

    if (storeUser) {
      const userData = JSON.parse(storeUser) as IUsersDto;
      setUser(userData);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    LoadingUser();
  }, [LoadingUser]);

  const signIn = useCallback(async ({ email, senha }) => {

    Auth().signInWithEmailAndPassword(email, senha)
      .then(au => {
        FireStore()
          .collection('users')
          .doc(au.user.uid)
          .get()
          .then(async profile => {
            const {
              nome,
              avatar,
              adm

            } = profile.data() as IUsersDto;

            if (profile.exists) {
              const userData = {
                email: au.user.email,
                id: au.user.uid,
                nome,
                avatar,
                adm
              };
              await AsyncStorage.setItem(
                User_Collection,
                JSON.stringify(userData),
              );
              setUser(userData);
            }
          })
          .catch(err => {
            Alert.alert(
              "Login",
              "Não foi possível carregar os dados do usuário",
            );
          });
          
      })
      .catch(err => {
        const { code } = err;
        console.log(err)
        if (code === "auth/user-not-found" || code === "auth/wrong-password") {
          return Alert.alert("Login", "usuário ou senha incorreto");
        }
        return Alert.alert("Login", "usuário nao encontrado");
      });
  }, []);

  const loginSocial = useCallback(async () => {

    // try {
      await Facebook.initializeAsync({appId: '637152467740970', appName: 'IBW'})
      const {type } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile']
      }).catch(h => console.log(h.message))

      console.log(
        type)

      const apiUrlFace = `curl -i -X GET \
      "https://graph.facebook.com/v14.0/me?fields=id%2Cname%2Cage_range%2Cabout&access_token=${token}`

      // console.log(type)

      // if(type === 'success') {
      //   const response = await fetch(apiUrlFace)

      //   const data = await response.json()
      // }
    // } catch (error) {
    //   console.log(error)
    // }
  }, []);

  useEffect(() => {
    setLoading(true);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(User_Collection);

    setUser(null);
  }, []);

  const updateUser = useCallback(async (user: IUsersDto) => {
    await AsyncStorage.setItem(User_Collection, JSON.stringify(user));

    setUser(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        updateUser,
        listUser,
        loginSocial
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContexData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used with ..");
  }

  return context;
}
