import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ArrowRightIcon, Button, ButtonIcon, ButtonText, HStack, ImageBackground, Input, InputField, InputIcon, InputSlot, Link, LinkText, LockIcon, MailIcon, StatusBar, Text, View } from '@gluestack-ui/themed'
import { EyeIcon } from '@gluestack-ui/themed'
import { useAuthContext } from '../contexts/authProvider'

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuthContext();

  const handleLogin = () => {
    if(email.trim() != '' && password.trim() != '') {
      login({ email: email.trim(), password: password.trim() }, navigation);
    }else {
      Alert.alert('Invalid Inputs', 'Please enter valid login details')
    }
  }

  return (
    <>
      <StatusBar
        barStyle='dark-content'
        // backgroundColor="#67c1f7"
        backgroundColor="#eee"
      />
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.title}>Login</Text>
          <Text>Please sign in to continue.</Text>
          <Input
            variant="outline"
            size="lg"
            mt="$16"
          >
            <InputSlot pl="$3">
              <InputIcon as={MailIcon} />
            </InputSlot>
            <InputField placeholder="EMAIL" value={email} onChangeText={setEmail}/>
          </Input>
          <Input
            variant="outline"
            size="lg"
            mt="$6"
          >
            <InputSlot pl="$3">
              <InputIcon as={LockIcon} />
            </InputSlot>
            <InputField placeholder="PASSWORD" value={password} onChangeText={setPassword} />
            <InputSlot pr="$3" onPress={() => { }}>
              <InputIcon
                as={EyeIcon}
                color="$darkBlue500"
              />
            </InputSlot>
          </Input>
          <View alignSelf='flex-end' mt="$2">
            <Link>
              <Text>FORGOT</Text>
            </Link>
          </View>
          <View alignSelf='flex-end' mt="$10">
            <Button rounded="$full" onPress={handleLogin}>
              <ButtonText mr="$3">LOGIN</ButtonText>
              <ButtonIcon as={ArrowRightIcon} />
            </Button>
          </View>
        </View>
        <HStack style={styles.bottomContainer}>
          <Text size="lg">Don't have an account? </Text>
          <Link onPress={() => navigation.navigate("Signup")} isExternal>
            <LinkText size="lg">Signup</LinkText>
          </Link>
        </HStack>
      </View>
    </>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 8
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center'
  }
})