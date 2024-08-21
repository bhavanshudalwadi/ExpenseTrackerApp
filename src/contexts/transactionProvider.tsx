import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllCategories, getAllPayModes, getYearlyTransactions, getAllTransactions, getMonthlyTransactions, insertTransaction } from '../API'

const transactionContext = createContext<any>(null)

const rgbToHex = (rgb: string) => {
  return '#' + (rgb.match(/[0-9|.]+/g)!!.map((x, i) => i === 3 ? parseInt(255 * parseFloat(x)).toString(16) : parseInt(x).toString(16)).join('')).padStart(2, '0').toUpperCase();
}

const TransactionProvider = ({ children }: any) => {
  const [monthlyData, setMonthlyData] = useState<any>()
  const [yearlyData, setYearlyData] = useState<any>()
  const [transactions, setTransactions] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [payModes, setPayModes] = useState<any[]>([])

  const CreateTransaction = async (transactionDetails: any, navigation: any) => {
    const token = await AsyncStorage.getItem('token');
    if(token != null) {
        let date = new Date()
        transactionDetails.date = transactionDetails.date.getFullYear()+'-'+(transactionDetails.date.getMonth()+1)+'-'+transactionDetails.date.getDate();
        insertTransaction(transactionDetails, token)
          .then(async (res: any) => {
            if(res.data.success) {
                Alert.alert('Success', res.data.message)
            //   setTransactions([...transactions, { ...transactionDetails }])
                getTransactions()
                getMonthlyData()
                navigation.goBack();
            }else {
              console.log("Failed to Add Transaction", res.data)
              if(res.data) {
                Alert.alert('Error', 'Add Transaction Failed')
              }
            }
          })
          .catch((error: any) => {
            console.log("Failed to Add Transaction", error)
            Alert.alert('Error', 'Add Transaction Failed')
          });
    }
  }

  const getTransactions = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token != null) {
      getAllTransactions(token)
        .then(async (res) => {
          if(res.data.success) {
            setTransactions(res.data.transactions)
          }else {
            console.log("Failed to get transactions", res.data)
            if(res.data) {
              Alert.alert('Error', 'Failed to get transactions')
            }
          }
        })
        .catch((error) => {
          console.log("Failed to get transactions", error)
          Alert.alert('Error', 'Failed to get transactions')
        });
    }
  }

  const getCategories = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token != null) {
      getAllCategories(token)
        .then(async (res) => {
          if(res.data.success) {
            console.log(res.data.categories)
            setCategories(res.data.categories)
          }else {
            console.log("Failed to get categories", res.data)
            if(res.data) {
              Alert.alert('Error', 'Failed to get categories')
            }
          }
        })
        .catch((error) => {
          console.log("Failed to get categories", error)
          Alert.alert('Error', 'Failed to get categories')
        });
    }
  }

  const getPayModes = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token != null) {
      getAllPayModes(token)
        .then(async (res) => {
          if(res.data.success) {
            console.log(res.data.pay_modes)
            setPayModes(res.data.pay_modes)
          }else {
            console.log("Failed to get payment modes", res.data)
            if(res.data) {
              Alert.alert('Error', 'Failed to get payment modes')
            }
          }
        })
        .catch((error) => {
          console.log("Failed to get payment modes", error)
          Alert.alert('Error', 'Failed to get payment modes')
        });
    }
  }

  const getMonthlyData = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token != null) {
        getMonthlyTransactions(token)
        .then(async (res) => {
          console.log(res.data)
          if(res.data.success) {
            setMonthlyData(res.data)
          }else {
            console.log("Failed to get monthly transactions", res.data)
            if(res.data) {
              Alert.alert('Error', 'Failed to get monthly transactions')
            }
          }
        })
        .catch((error) => {
          console.log("Failed to get monthly transactions", error)
          Alert.alert('Error', 'Failed to get monthly transactions')
        });
    }
  }

  const getYearlyData = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token != null) {
        getYearlyTransactions(token)
        .then(async (res) => {
          console.log(res.data)
          if(res.data.success) {
            setYearlyData(res.data)
          }else {
            console.log("Failed to get yearly transactions", res.data)
            if(res.data) {
              Alert.alert('Error', 'Failed to get yearly transactions')
            }
          }
        })
        .catch((error) => {
          console.log("Failed to get yearly transactions", error)
          Alert.alert('Error', 'Failed to get yearly transactions')
        });
    }
  }

  return (
    <transactionContext.Provider value={{ CreateTransaction, getTransactions, transactions, getCategories, categories, getPayModes, payModes, getMonthlyData, monthlyData, getYearlyData, yearlyData }}>
      { children }
    </transactionContext.Provider>
  )
}

const useTransactionContext = () => {
  if(!transactionContext) {
    console.error("transactionContext only can be used within transactionProvider")
    return null;
  }
  return useContext(transactionContext);
}

const getRandomColorPair = () => {
  const R = Math.floor(Math.random() * 255)
  const G = Math.floor(Math.random() * 255)
  const B = Math.floor(Math.random() * 255)

  let c1 = "rgb(" + R + "," + G + "," + B + ");";
  let c2 = "rgba(" + R + "," + G + "," + B + ", 0.5);";

  return { color: c1, gradientCenterColor: c2 }
}

export { transactionContext, TransactionProvider, useTransactionContext, getRandomColorPair }