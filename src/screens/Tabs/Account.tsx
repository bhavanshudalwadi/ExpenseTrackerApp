import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, ButtonText, Image, Text, Input, InputField, ScrollView } from '@gluestack-ui/themed'
import { useAuthContext } from '../../contexts/authProvider'

const Account = ({ navigation }: any) => {
    const { getUserDetails, user, logoutUser } = useAuthContext()

    useEffect(() => {
        getUserDetails()
    }, [])

    const handleLogout = () => {
        logoutUser(navigation)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text color="$text500" lineHeight="$xs" marginTop="$16">
                    Name
                </Text>
                <Input
                    style={styles.formInput}
                    size="lg"
                    isReadOnly={true}
                >
                    <InputField placeholder="Name" value={user ? user.name : ''} />
                </Input>
                <Text color="$text500" lineHeight="$xs" marginTop="$6">
                    Email
                </Text>
                <Input
                    style={styles.formInput}
                    size="lg"
                    isReadOnly={true}
                >
                    <InputField placeholder="Email" value={user ? user.email : ''} />
                </Input>
                <Button rounded="$full" alignSelf='center' w="$2/3" mt="$20" onPress={handleLogout}>
                    <ButtonText>Logout</ButtonText>
                </Button>
            </View>
        </ScrollView>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32
    },
    formImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    formInput: {
        backgroundColor: '#fff'
    }
})