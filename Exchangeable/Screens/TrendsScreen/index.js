import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { IP } from "../../config/BackendIP";
import Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./styles";

export default function Trends() {

    const [openDropDown, setOpenDropDown] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [currencyValue, setCurrencyValue] = useState(null);
    const [today, setToday] = useState();
    const [lastWeek, setLastWeek] = useState();
    const [oldRate, setOldRate] = useState(0);
    const [newRate, setNewRate] = useState(0);
    const [currencyTrend, setCurrencyTrend] = useState(0);
    const [currencyName, setCurrencyName] = useState("");


    useEffect(() => {
        getCurrenciesFromDB();
        getDates();

        let x = 23128.073625;
        console.log("????????", )

    }, []);

    const getDates = () => {
        let todayDate = new Date();
        let lastWeekDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 7);

        let today = todayDate.toISOString().substring(0, 10);
        let lastWeek = lastWeekDate.toISOString().substring(0, 10);

        console.log("today ===>", today);
        console.log("last week ====>", lastWeek);

        setToday(today);
        setLastWeek(lastWeek);
    }

    const getCurrenciesFromDB = () => {
        fetch(IP + "/currencyrates", {
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


            })
            .catch(e => {
                console.log("failed to fetch trends...", e);
            });
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
                                // getTrends();
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
                    <Text style={styles.trendsTextDown}>{currencyName} went Down! Might be time to buy!</Text>
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

        </View>
    )
}