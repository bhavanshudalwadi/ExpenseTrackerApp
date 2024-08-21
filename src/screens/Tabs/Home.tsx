import { Text } from '@gluestack-ui/themed'
import React, { useEffect, useState } from 'react'
import Charts from '../../components/Charts';
import { getRandomColorPair, useTransactionContext } from '../../contexts/transactionProvider';

const Home = ({ navigation }: any) => {
    const thisMonth = new Date().toLocaleString('en-us', { month: 'long' });

    const [barData, setBarData] = useState<any[]>([])
    const [pieData, setPieData] = useState<any[]>([])

    const { getMonthlyData, monthlyData } = useTransactionContext()

    useEffect(() => {
        getMonthlyData()
    }, [])

    useEffect(() => {
        if(monthlyData && monthlyData.monthly && monthlyData.categorized) {
            let updated = [...monthlyData.monthly]
            updated.forEach((m: any) => {
                m.value = parseFloat(m.amount)
                m.label = m.date_range
                m.topLabelComponent = () => (
                    <Text style={{ color: '#006DFF', fontSize: 12, height: 15, width: 30, fontWeight: 'bold', textAlign: 'center' }}>{Math.floor(m.amount)}</Text>
                )
            });
            setBarData(updated)

            let updatedCategorized = [...monthlyData.categorized]
            
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
    }, [monthlyData])

    return (
        <Charts spend_in={thisMonth} amount={monthlyData?.spend ?? 0} barData={barData} pieData={pieData} />
    )
}

export default Home