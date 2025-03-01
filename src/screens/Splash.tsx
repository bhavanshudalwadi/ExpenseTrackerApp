import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Image, StatusBar, View } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = ({ navigation }: any) => {
    useEffect(() => {
        setTimeout(async () => {
            if(await AsyncStorage.getItem('token') != null) {
                navigation.replace('TabView')
            }else {
                navigation.replace('Login')
            }
        }, 3000);
    }, [])

    return (
        <View flex={1}>
            <StatusBar backgroundColor="#4ac2e8"  barStyle = "dark-content" />
            <View flex={1} justifyContent='center' alignItems='center' backgroundColor='#4ac2e8'>
                <Image alt='logo' width={350} height={350} source={{uri: 'https://images-platform.99static.com/ToOcJbuDzoa8sqctL1QMGO089kA=/200x220:1800x1820/500x500/top/smart/99designs-contests-attachments/95/95660/attachment_95660693'}} />
            </View>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({})