import { StyleSheet } from 'react-native'
import { Text, View, ScrollView, Card, Heading, HStack } from '@gluestack-ui/themed'
import React, { useEffect, useState } from 'react'
import { BarChart, barDataItem, PieChart } from "react-native-gifted-charts";

const Charts = ({ spend_in, amount, barData, pieData }: { spend_in: string, amount: number, barData: any[], pieData: any[]}) => {
    // const [maxSpend, setMaxSpend] = useState(500)

    // useEffect(() => {
    //     if(barData.length > 0) {
    //         let max = barData.reduce((max, i) => (i.value > max) ? i.value : max, barData[0].value)
    //         setMaxSpend(max+200)
    //     }
    // }, [barData])
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Card size="md" variant="elevated" m="$3" borderRadius="$xl">
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Heading size="sm">
                            Spent In ({spend_in})
                        </Heading>
                        <Heading size="lg">
                            ₹ {amount}
                        </Heading>
                    </HStack>
                </Card>
                <Card size="md" variant="elevated" m="$3" borderRadius="$xl">
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {spend_in} Expenses
                    </Text>
                    <View style={{ paddingTop: 20, alignItems: 'center' }}>
                        {barData.length > 0 &&
                            <BarChart
                                data={barData}
                                frontColor='#006DFF'
                                gradientColor='#009FFF'
                                barWidth={22}
                                initialSpacing={10}
                                spacing={20}
                                // stepValue={Math.floor(maxSpend/10)}
                                // maxValue={maxSpend}
                                barBorderRadius={4}
                                showGradient
                                yAxisThickness={0}
                                xAxisType={'dashed'}
                                xAxisLabelTextStyle={{ textAlign: 'center' }}
                                // showLine
                                // lineConfig={{
                                //     color: '#F29C6E',
                                //     thickness: 2,
                                //     curved: true,
                                //     hideDataPoints: true,
                                //     shiftY: 20,
                                // }}
                            />
                        }
                    </View>
                </Card>
                <Card size="md" variant="elevated" m="$3" borderRadius="$xl">
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        Spend In
                    </Text>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        {pieData.length > 0 &&
                            <PieChart
                                data={pieData}
                                donut
                                showGradient
                                sectionAutoFocus
                                radius={90}
                                innerRadius={60}
                                centerLabelComponent={() => {
                                    return (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text
                                                style={{ fontSize: 22, fontWeight: 'bold' }}>
                                                ₹{ pieData ? pieData[0].value : '' }
                                            </Text>
                                            <Text style={{ fontSize: 14 }}>{ pieData ? pieData[0].label : '' }</Text>
                                        </View>
                                    );
                                }}
                            />
                        }
                    </View>
                    <HStack w="$full" flexWrap='wrap' alignSelf='center'>
                        {pieData.map((item) =>
                            <View key={item.label} w="$1/2" style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View
                                    style={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: 5,
                                        backgroundColor: item.color ?? 'lightgray',
                                        marginRight: 10,
                                    }}
                                />
                                <Text>{item.label}: ₹{item.value}</Text>
                            </View>
                        )}
                    </HStack>
                </Card>
            </View>
        </ScrollView>
    )
}

export default Charts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
})