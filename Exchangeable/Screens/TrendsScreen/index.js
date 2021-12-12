import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { IP } from "../../config/BackendIP";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Trends({ navigation }) {

    const [openDropDown, setOpenDropDown] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [currencyValue, setCurrencyValue] = useState(null);
    const [today, setToday] = useState();
    const [lastWeek, setLastWeek] = useState();
    const [twoWeeksAgo, setTwoWeeksAgo] = useState();
    const [olderRate, setOlderRate] = useState(0);
    const [oldRate, setOldRate] = useState(0);
    const [newRate, setNewRate] = useState(0);
    const [currencyTrend, setCurrencyTrend] = useState(0);
    const [currencyName, setCurrencyName] = useState("");
    const [graphBool, setGraphBool] = useState(false);


    useEffect(() => {
        AsyncStorage.getItem('blackMarket').then(val => console.log("vall ===>", val));
        getCurrenciesFromDB();
        getDates();
    }, []);

    const getDates = () => {
        let todayDate = new Date();
        let lastWeekDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 7);
        let twoWeeksAgoDate = new Date(lastWeekDate.getFullYear(), lastWeekDate.getMonth(), lastWeekDate.getDate() - 7);

        let today = todayDate.toISOString().substring(0, 10);
        let lastWeek = lastWeekDate.toISOString().substring(0, 10);
        let twoWeeksAgo = twoWeeksAgoDate.toISOString().substring(0, 10);

        console.log("today ===>", today);
        console.log("last week ====>", lastWeek);
        console.log("two weeks ago ====>", twoWeeksAgo);

        setToday(today);
        setLastWeek(lastWeek);
        setTwoWeeksAgo(twoWeeksAgo);
    }

    const getCurrenciesFromDB = () => {
        fetch(IP + "/currencyrates?_limit=-1&blackMarket=false", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                let temp = [];

                for (let item of res) {
                    temp.push({ id: item.id, name: item.name, rate: item.rate });
                }

                setCurrencies(temp);
            })
            .catch(e => {
                console.log("failed to retrieve rates from db...", e);
            })
    }

    const getTrends = () => {

        let api = `http://api.exchangeratesapi.io/v1/${lastWeek}?access_key=6fac61839f259e7a3390db2d491dc263&symbols=${currencyValue}`;
        fetch(api, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                const result = Object.keys(res.rates).map(key => ({ [key]: res.rates[key] }));
                const item = result[0];

                let resultString = JSON.stringify(item);
                let name = resultString.substring(resultString.indexOf('"') + 1, resultString.lastIndexOf('"'));
                let rate1 = resultString.substring(resultString.indexOf(":") + 1, resultString.indexOf("}"));
                console.log("name =>", name);
                console.log("rate =>", parseInt(rate1));

                setCurrencyName(name);
                setOldRate(rate1);

                let rate2 = 0;
                for (let item of currencies) {
                    if (item.name == name) {
                        rate2 = item.rate;
                    }
                }

                setNewRate(rate2);

                let trendPercent = ((rate2 - rate1) / rate1) * 100;

                let trendPercentRounded = Math.round(trendPercent * 1000) / 1000;

                setCurrencyTrend(trendPercentRounded)

                console.log(`old rate of ${name}:`, rate1);
                console.log(`new rate of ${name}:`, rate2);
                console.log(`%change...`, trendPercentRounded);

                getPreviousWeeksRates();

            })
            .catch(e => {
                console.log("failed to fetch trends...", e);
            });
    }

    const getPreviousWeeksRates = () => {
        let api = `http://api.exchangeratesapi.io/v1/${twoWeeksAgo}?access_key=6fac61839f259e7a3390db2d491dc263&symbols=${currencyValue}`;
        fetch(api, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                const result = Object.keys(res.rates).map(key => ({ [key]: res.rates[key] }));
                const item = result[0];

                let resultString = JSON.stringify(item);
                let rate1 = resultString.substring(resultString.indexOf(":") + 1, resultString.indexOf("}"));
                console.log("rate 2 weeks ago =>", parseInt(rate1));
                
                setOlderRate(parseInt(rate1));
                setGraphBool(true);

            })
            .catch(e => {
                console.log("Failed to retrieve two weeks ago rate...", e);
            })
    }

    const RenderBottomBar = () => {
        return (
            <View
                style={styles.bottomBar}
            >
                <Icon
                    name="home"
                    size={19}
                    color={'white'}
                    onPress={() => {
                        console.log("navigating to home screen...");
                        navigation.navigate("Home");
                    }}
                />
                <Icon
                    name="globe-americas"
                    size={19}
                    color={'white'}
                    onPress={() => {
                        console.log("Already in Trends :)");
                    }}
                />
                <Icon
                    name="cog"
                    size={19}
                    color={'white'}
                    onPress={() => {
                        console.log("navigating to settings screen...");
                        navigation.navigate("Settings");
                    }}
                />

            </View>
        )
    }

    const DrawGraph = () => {

        // I DID NOT CREATE THE STYLE FOR THIS. IT WAS TAKEN FROM https://www.npmjs.com/package/react-native-chart-kit
        return (
            <View style={styles.chartView}>
                <Text style={styles.chartTextStyle}>Three week trend</Text>
                <LineChart
                    style={styles.chartStyle}
                    data={{
                        labels: [twoWeeksAgo, lastWeek, today],
                        datasets: [
                            {
                                data: [
                                    olderRate,
                                    oldRate,
                                    newRate
                                ]
                            }
                        ]
                    }}
                    width={wp('80%')}
                    height={hp('50%')}
                    yAxisLabel="$"
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: newRate > 1000 ? 2 : newRate > 100 ? 3 : 4,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>
                    Weekly Trends
                </Text>
            </View>

            <View style={styles.dropDownView}>
                <Text style={styles.dropDownText}>Pick a currency to see weekly trend: </Text>
                <View>
                    <DropDownPicker
                        schema={{
                            key: 'id',
                            label: 'name',
                            value: 'name'
                        }}
                        searchable={true}
                        searchPlaceholder="pick a currency..."
                        style={styles.dropdownPickerStyle1}
                        itemKey="id"
                        open={openDropDown}
                        setOpen={setOpenDropDown}
                        value={currencyValue}
                        items={currencies}
                        setValue={setCurrencyValue}
                        setItems={setCurrencies}
                        placeholder=""
                        onChangeValue={(value) => {
                            if (value != null) {
                                console.log("value ====>", value);
                                getTrends();
                            }
                        }}
                    />
                </View>
            </View>

            {oldRate != 0 && newRate != 0 && currencyTrend > 0 &&
                <View style={styles.trendsViewUp}>
                    <Text style={styles.trendsTextUp}>{currencyName} went up! Might be time to sell!</Text>
                    <View style={styles.trendsVarianceUp}>

                        <Text style={styles.trendsVarianceTextUp}>{currencyTrend}%</Text>
                        <Icon
                            name="arrow-circle-up"
                            size={23}
                            color={'green'}
                        />
                    </View>
                </View>
            }

            {oldRate != 0 && newRate != 0 && currencyTrend < 0 &&

                <View style={styles.trendsViewDown}>
                    <Text style={styles.trendsTextDown}>{currencyName} went down! Might be time to buy!</Text>
                    <View style={styles.trendsVarianceDown}>

                        <Text style={styles.trendsVarianceTextDown}>{currencyTrend}%</Text>
                        <Icon
                            name="arrow-circle-down"
                            size={23}
                            color={'red'}
                        />
                    </View>
                </View>
            }

            {graphBool && DrawGraph()}

            {RenderBottomBar()}
        </View>
    )
}