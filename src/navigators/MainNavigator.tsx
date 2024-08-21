import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/Signup';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import TabView from './TabNavigator';
import TabNavigator from './TabNavigator';
import AddTransaction from '../screens/AddTransaction';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="TabView" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="AddTransaction" component={AddTransaction} options={{ headerTitle: 'Add Transaction' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator