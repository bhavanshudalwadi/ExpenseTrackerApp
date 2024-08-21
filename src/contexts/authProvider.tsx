import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUser, loginUser, signUpUser } from '../API'

const authContext = createContext<any>(null)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)

  const login = async (loginDetails: any, navigation: any) => {
    loginUser(loginDetails)
      .then(async (res) => {
        if(res.data.success) {
          await AsyncStorage.setItem('token', res.data.token);
          Alert.alert('Success', res.data.message)
          navigation.replace("TabView")
        }else {
          console.log("Failed to login", res.data)
          if(res.data) {
            Alert.alert('Error', 'Login Failed')
          }
        }
      })
      .catch((error) => {
        console.log("Failed to login", error)
        Alert.alert('Error', 'Login Failed')
      });
  }

  const signUp = async (userDetails: any, navigation: any) => {
    signUpUser(userDetails)
      .then(async (res) => {
        if(res.data.success) {
          Alert.alert('Success', res.data.message)
          navigation.replace("Login")
        }else {
          console.log("Failed to Register", res.data)
          if(res.data) {
            Alert.alert('Error', 'Registration Failed')
          }
        }
      })
      .catch((error) => {
        console.log("Failed to Register", error)
        Alert.alert('Error', 'Registration Failed')
      });
  }

  const logoutUser = async (navigation: any) => {
    await AsyncStorage.removeItem('token', () => {
      // navigation.navigate("Login")
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    })
  }

  const getUserDetails = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token != null) {
      getUser(token)
        .then(async (res) => {
          if(res.data.success) {
            setUser(res.data.user_details)
          }else {
            console.log("Failed to get user details", res.data)
            if(res.data) {
              Alert.alert('Error', 'Failed to get user details')
            }
          }
        })
        .catch((error) => {
          console.log("Failed to get user details", error)
          Alert.alert('Error', 'Failed to get user details')
        });
    }
  }

  return (
    <authContext.Provider value={{ login, signUp, logoutUser, getUserDetails, user }}>
      { children }
    </authContext.Provider>
  )
}

const useAuthContext = () => {
  if(!authContext) {
    console.error("authContext only can be used within authProvider")
    return null;
  }
  return useContext(authContext);
}

export { authContext, AuthProvider, useAuthContext }