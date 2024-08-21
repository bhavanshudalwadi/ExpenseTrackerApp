import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ArrowRightIcon, Button, ButtonIcon, ButtonText, HStack, ImageBackground, Input, InputField, InputIcon, InputSlot, Link, LinkText, LockIcon, MailIcon, StatusBar, Text, View } from '@gluestack-ui/themed'
import { EyeIcon } from '@gluestack-ui/themed'
import { AtSignIcon } from '@gluestack-ui/themed'
import { useAuthContext } from '../contexts/authProvider'

const Signup = ({ navigation }: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signUp } = useAuthContext();

  const handleSignUp = () => {
    if(name.trim() != '' && email.trim() != '' && password.trim() != '') {
      signUp({ name: name.trim(),email: email.trim(), password: password.trim() }, navigation);
    }else {
      Alert.alert('Invalid Inputs', 'Please enter registration valid details')
    }
  }

  return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.title}>Create Account</Text>
          <Input
            variant="outline"
            size="lg"
            mt="$10"
          >
            <InputSlot pl="$3">
              <InputIcon as={AtSignIcon} />
            </InputSlot>
            <InputField placeholder="Full Name" value={name} onChangeText={setName} />
          </Input>
          <Input
            variant="outline"
            size="lg"
            mt="$6"
          >
            <InputSlot pl="$3">
              <InputIcon as={MailIcon} />
            </InputSlot>
            <InputField placeholder="Email" value={email} onChangeText={setEmail} />
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
          <View alignSelf='flex-end' mt="$10">
            <Button rounded="$full" onPress={handleSignUp}>
              <ButtonText mr="$3">SIGN UP</ButtonText>
              <ButtonIcon as={ArrowRightIcon} />
            </Button>
          </View>
        </View>
        <HStack style={styles.bottomContainer}>
          <Text size="lg">Already have an account? </Text>
          <Link onPress={() => navigation.navigate("Login")} isExternal>
            <LinkText size="lg">Login</LinkText>
          </Link>
        </HStack>
      </View>
  )
}

export default Signup

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