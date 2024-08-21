import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, ButtonText, Heading, Input, InputField, Textarea, View } from '@gluestack-ui/themed'
import AutocompleteInput from 'react-native-autocomplete-input'
import { TextareaInput } from '@gluestack-ui/themed'
import { useTransactionContext } from '../contexts/transactionProvider'
import DatePicker from 'react-native-date-picker'

const AddTransaction = ({ navigation }: any) => {
    const [title, setTitle] = useState<string>('')
    const [category, setCategory] = useState<string>()
    const [amount, setAmount] = useState<string>('')
    const [payMode, setPayMode] = useState<string>()
    const [description, setDescription] = useState<string>('')
    const [date, setDate] = useState(new Date())
    const [openDateDialog, setOpenDateDialog] = useState(false)

    const { CreateTransaction, getCategories, categories, getPayModes, payModes } = useTransactionContext();

    useEffect(() => {
        getCategories()
        getPayModes()
    }, [])

    const handleAddTransaction = () => {
        if (title.trim() != '' && category?.trim() != '' && amount.trim() != '' && parseFloat(amount.trim()) > 0 && payMode?.trim() != '' && description.trim() != '') {
            CreateTransaction({ title: title.trim(), category: category?.trim(), amount: parseFloat(amount.trim()), pay_mode: payMode?.trim(), description: description.trim(), date }, navigation);
        } else {
            Alert.alert('Invalid Inputs', 'Please enter valid transaction details')
        }
    }

    const handleCategory = (text: string) => {
        setCategory(text)
    }

    const handlePayMode = (text: string) => {
        setPayMode(text)
    }

    return (
        <View style={styles.container}>
            <Input
                bg='$white'
                size="lg"
                mb="$2"
            >
                <InputField placeholder="Title" value={title} onChangeText={setTitle} />
            </Input>
            <AutocompleteInput
                style={[styles.autoComplete, { fontSize: 18 }]}
                containerStyle={{ flex: 0, height: 45 }}
                inputContainerStyle={styles.autoComplete}
                listContainerStyle={{ zIndex: 1, minHeight: 100 }}
                data={categories}
                placeholder='Category'
                hideResults={(category ? category.length > 3 : false) || category === undefined}
                value={category}
                onChangeText={handleCategory}
                flatListProps={{
                    keyExtractor: (_: any, idx: any) => idx,
                    renderItem: ({ item }: any) => (
                        <TouchableOpacity onPress={() => setCategory(item.category)}>
                            <Heading size="sm" py="$2" px="$3">{item.category}</Heading>
                        </TouchableOpacity>
                    )
                }}
            />
            <Input
                bg='$white'
                size="lg"
                my="$2"
            >
                <InputField placeholder="Amount" keyboardType='decimal-pad' inputMode='decimal' value={amount} onChangeText={setAmount} />
            </Input>
            <AutocompleteInput
                style={[styles.autoComplete, { fontSize: 18 }]}
                containerStyle={{ flex: 0, height: 45 }}
                inputContainerStyle={styles.autoComplete}
                listContainerStyle={{ zIndex: 1, minHeight: 100 }}
                data={payModes}
                placeholder='Payment Mode'
                hideResults={(payMode ? payMode.length > 3 : false) || payMode === undefined}
                value={payMode}
                onChangeText={handlePayMode}
                flatListProps={{
                    keyExtractor: (_: any, idx: any) => idx,
                    renderItem: ({ item }: any) => (
                        <TouchableOpacity onPress={() => setPayMode(item.pay_mode)}>
                            <Heading size="sm" py="$2" px="$3">{item.pay_mode}</Heading>
                        </TouchableOpacity>
                    )
                }}
            />
            <Textarea
                bg='$white'
                size="lg"
                marginTop="$2"
            >
                <TextareaInput placeholder="Description" value={description} onChangeText={setDescription} />
            </Textarea>
            <TouchableOpacity onPress={() => setOpenDateDialog(true)}>
                <Input
                    bg='$white'
                    size="lg"
                    marginTop="$2"
                    isReadOnly={true}
                >
                    <InputField placeholder="Date" value={`${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`} />
                </Input>
            </TouchableOpacity>
            <DatePicker
                modal
                open={openDateDialog}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpenDateDialog(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpenDateDialog(false)
                }}
            />
            <Button w="$1/2" alignSelf='center' mt="$5" rounded="$full" onPress={handleAddTransaction}>
                <ButtonText mr="$3">Add Transaction</ButtonText>
            </Button>
        </View>
    )
}

export default AddTransaction

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    autoComplete: {
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop: 1
    }
})