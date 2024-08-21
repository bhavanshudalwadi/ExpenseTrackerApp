import { ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, ChevronDownIcon, Fab, FabIcon, HStack, Icon, Image, Select, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, View } from '@gluestack-ui/themed'
import { Heading } from '@gluestack-ui/themed'
import { SelectIcon } from '@gluestack-ui/themed'
import { SelectDragIndicator } from '@gluestack-ui/themed'
import { FabLabel } from '@gluestack-ui/themed'
import { AddIcon } from '@gluestack-ui/themed'
import { useTransactionContext } from '../../contexts/transactionProvider'

const Transactions = ({ navigation }: any) => {
    const [totalSpend, setTotalSpend] = useState<number>(0) 
    const [updatedTransactions, setUpdatedTransactions] = useState<object[]>([])
    const { getTransactions, transactions } = useTransactionContext()

    useEffect(() => {
        getTransactions()
    }, [])

    const updateTotalSpend = () => {
        setTotalSpend(transactions.reduce((cnt: number, t: any) => cnt += parseFloat(t.amount), 0))
    }

    const getRunningBalance = (id: number) => {
        let total = 0;
        for(let i=0; i<transactions.length; i++) {
            let t = transactions[i];
            total += parseFloat(t.amount);
            if(t.id == id) {
                break;
            }
        }
        return total;
    }

    useEffect(() => {
        if(Array.isArray(transactions) && transactions.length > 0) {
            let updated = [...transactions];
            updated.forEach((t: any) => t.runningBalance = getRunningBalance(t.id))
            setUpdatedTransactions(updated)
            updateTotalSpend()
        }
    }, [transactions])

    return (
        <View flex={1}>
            <HStack justifyContent='space-between' alignItems='center' style={styles.container}>
                <View w="$1/2">
                    <Text size="xs">Total Spend</Text>
                    <Heading size="lg">₹ {totalSpend}</Heading>
                </View>
                <Select w="$1/2">
                    <SelectTrigger variant="rounded" size="md">
                        <SelectInput placeholder="Filter" />
                        <SelectIcon mr="$3">
                            <Icon as={ChevronDownIcon} />
                        </SelectIcon>
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="This year" value="year" />
                            <SelectItem label="This month" value="month" />
                            <SelectItem label="Last 6 months" value="6Months" />
                            <SelectItem label="Last 7 days" value="7Days" />
                            <SelectItem label="Yesterday" value="yesterday" />
                            <SelectItem label="Today" value="today" />
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </HStack>
            <Fab size="md" placement="bottom right" onPress={() => navigation.navigate('AddTransaction')}>
                <FabIcon as={AddIcon} mr="$1"/>
                <FabLabel>Transaction</FabLabel>
            </Fab>
            <ScrollView>
                <View flex={1} style={{paddingHorizontal: 16}}>
                    {
                        updatedTransactions.length > 0 && updatedTransactions.map((item: any) =>
                            <Card key={item.id} mb="$2" size="sm" variant="elevated" borderRadius="$xl">
                                <HStack>
                                    {/* <Image mr="$2" style={styles.cardImg} alt='logo' source={{ uri: 'https://cdn3.vectorstock.com/i/1000x1000/98/52/travel-flat-icon-vector-2079852.jpg' }} /> */}
                                    <View flex={1}>
                                        <HStack justifyContent='space-between' alignItems='center'>
                                            <HStack alignItems='center'>
                                                <Heading size="sm">{item.title}</Heading>
                                                <Text size="xs" ml="$1">({item.category})</Text>
                                            </HStack>
                                            <Heading size="md">{item.formatted_date}</Heading>
                                        </HStack>
                                        <HStack justifyContent='space-between' alignItems='center'>
                                            <HStack alignItems='center'>
                                                <Heading size="lg">₹ {item.amount}</Heading>
                                                <Text size="sm" ml="$1">({item.pay_mode})</Text>
                                            </HStack>
                                            <Heading size="md">₹ {item.runningBalance}</Heading>
                                        </HStack>
                                        <Text size="sm">{item.description}</Text>
                                    </View>
                                </HStack>
                            </Card>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Transactions

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    cardImg: {
        width: 20,
        height: 20,
        marginTop: 5,
        borderRadius: 100,
        backgroundColor: 'red',
    }
})