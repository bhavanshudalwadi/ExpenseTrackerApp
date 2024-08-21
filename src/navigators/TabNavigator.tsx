import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from '@gluestack-ui/themed';
import Home from '../screens/Tabs/Home';
import Transactions from '../screens/Tabs/Transactions';
import YearlyExpense from '../screens/Tabs/YearlyExpense';
import Account from '../screens/Tabs/Account';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === 'Home') {
            icon = '🏠';
          } else if (route.name === 'Transactions') {
            icon = '💰';
          } else if (route.name === 'YearlyExpense') {
            icon = '📊';
          } else if (route.name === 'Account') {
            icon = '🙍‍♂️';
          }

          return <Text style={{ height: 30, width: 30, fontSize: 25 }}>{icon}</Text>;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: navigation.isFocused() ? route.name : '',
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { height: 60 },
        headerShown: false
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Home',
          // tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerTitle: 'Transactions',
          // tabBarLabel: 'Transactions'
        }}
      />
      <Tab.Screen
        name="YearlyExpense"
        component={YearlyExpense}
        options={{
          headerTitle: 'Yearly Expenses',
          // tabBarLabel: 'Yearly Expenses'
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account} 
        options={{
          headerTitle: 'Account',
          // tabBarLabel: 'Account'
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16
  }
})