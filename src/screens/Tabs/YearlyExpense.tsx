import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Charts from '../../components/Charts'
import { getRandomColorPair, useTransactionContext } from '../../contexts/transactionProvider';

const YearlyExpense = ({ navigation }: any) => {
    const thisYear = new Date().toLocaleString('en-us', { year: 'numeric' });

    const [barData, setBarData] = useState<any[]>([])
    const [pieData, setPieData] = useState<any[]>([])

    const { getYearlyData, yearlyData } = useTransactionContext()

    useEffect(() => {
        getYearlyData()
    }, [])

    useEffect(() => {
        if(yearlyData && yearlyData.yearly && yearlyData.categorized) {
            let updated = [...yearlyData.yearly]
            updated.forEach((m: any) => {
                m.value = parseFloat(m.amount)
                m.label = m.month
                
                m.topLabelComponent = () => (
                    <Text style={{ color: '#006DFF', fontSize: 12, height: 15, width: 30, fontWeight: 'bold', textAlign: 'center' }}>{Math.floor(m.amount)}</Text>
                )
            });
            setBarData(updated)

            let updatedCategorized = [...yearlyData.categorized]
            
            updatedCategorized.forEach((m: any) => {
                let object = getRandomColorPair();
                m.value = parseFloat(m.amount)
                m.label = m.category
                m.color = object.color
                m.gradientCenterColor = object.gradientCenterColor
            });
            if(updatedCategorized.length > 0) {
                updatedCategorized[0].focused = true
            }
            setPieData(updatedCategorized)
        }
    }, [yearlyData])

    return (
        <Charts spend_in={thisYear} amount={yearlyData?.spend ?? 0} barData={barData} pieData={pieData} />
    )
}

export default YearlyExpense

const styles = StyleSheet.create({})