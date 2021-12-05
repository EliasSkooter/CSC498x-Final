import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity, Linking, Image, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import styles from "./styles";
import { StackActions, NavigationActions } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "../../config/BackendIP";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Home({ navigation }) {

    const [openFrom, setOpenFrom] = useState(false);
    const [fromValue, setFromValue] = useState(null);
    const [openTo, setOpenTo] = useState(false);
    const [toValue, setToValue] = useState(null);
    const [amount, setAmount] = useState(0);
    const [currencies, setCurrencies] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        // SyncCurrencies();
        getCurrenciesFromDB();
        getNews();
    }, []);



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

    const SyncCurrencies = async () => {

        //
        //https://cdn.moneyconvert.net/api/latest.json

        fetch("http://api.exchangeratesapi.io/v1/latest?access_key=6fac61839f259e7a3390db2d491dc263", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then(res => res.json())
            .then(async res => {

                console.log("Successfully retrieves exchange rates...", res.rates['AED']);
                const result = Object.keys(res.rates).map(key => ({ [key]: res.rates[key] }));

                for (let item of result) {
                    let resultString = JSON.stringify(item);
                    let name = resultString.substring(resultString.indexOf('"') + 1, resultString.lastIndexOf('"'));
                    let rate = resultString.substring(resultString.indexOf(":") + 1, resultString.indexOf("}"));
                    console.log("name =>", name);
                    console.log("rate =>", parseInt(rate));

                    const bodyReq = {
                        name: name,
                        rate: rate
                    }

                    await fetch(IP + "/currencyrates", {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(bodyReq)
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log("saved currency!", res);
                        })
                }

                // setCurrencies(res);
            })
            .catch(e => {
                console.log("Failed to retrieve currency rates...", e);
            })
    }

    const getNews = () => {
        fetch(`${IP}/news-articles`, {
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
                    temp.push({ title: item.title, url: item.url, imageUrl: IP + item.image[0].url });
                }
                setNews(temp);
            })
            .catch(e => {
                console.log("failed to retrieve news...", e);
            })
    }

    const RenderNews = () => {
        return (
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={news}
                keyExtractor={(item, index) => `news${index}`}
                renderItem={({ item, index }) => {
                    console.log(item.imageUrl);

                    return (
                        <TouchableOpacity
                            onLongPress={() => {
                                Linking.openURL(item.url).catch(e => { console.log(e) });

                            }}
                            onPress={() => {
                                return (
                                    Alert.alert(
                                        "Article Title:",
                                        item.title + "\n\n*Long press card to open web page",
                                    )
                                )
                            }}
                        >
                            <View
                                style={styles.newsRenderView}
                            >
                                <Card
                                    style={styles.cardStyle}
                                >
                                    <CardImage
                                        source={{ uri: item.imageUrl }}
                                    />
                                </Card>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        )
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
                        console.log("Already home :)");
                    }}
                />
                <Icon
                    name="globe-americas"
                    size={19}
                    color={'white'}
                    onPress={() => {
                        console.log("navigating to trends screen...");
                        navigation.navigate("Trends");
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>
                    Check Today's Exchange Rates!
                </Text>
            </View>

            <View style={styles.amountContainer}>
                <Text style={styles.amountText}>Amount: </Text>
                <TextInput
                    keyboardType='numeric'
                    style={styles.textInputView1}
                    onChangeText={text => {
                        setAmount(text);
                        console.log(text);
                    }}
                />
            </View>
            <View style={styles.ToFromContainer}>
                <View style={styles.from}>
                    <Text style={styles.dropDownText}>From: </Text>
                    <View>
                        <DropDownPicker
                            schema={{
                                key: 'id',
                                label: 'name',
                                value: 'rate'
                            }}
                            searchable={true}
                            searchPlaceholder="pick a currency..."
                            style={styles.dropdownPickerStyle1}
                            itemKey="id"
                            open={openFrom}
                            setOpen={setOpenFrom}
                            value={fromValue}
                            items={currencies}
                            setValue={setFromValue}
                            setItems={setCurrencies}
                            placeholder=""
                        />
                    </View>
                </View>

                <View style={styles.to}>
                    <Text style={styles.dropDownText}>To: </Text>
                    <View>
                        <DropDownPicker
                            schema={{
                                key: 'id',
                                label: 'name',
                                value: 'rate'
                            }}
                            searchable={true}
                            searchPlaceholder="pick a currency..."
                            style={styles.dropdownPickerStyle2}
                            itemKey="id"
                            open={openTo}
                            setOpen={setOpenTo}
                            value={toValue}
                            items={currencies}
                            setValue={setToValue}
                            setItems={setCurrencies}
                            placeholder=""
                        />
                    </View>
                </View>
            </View>

            {amount != 0 && fromValue != null && toValue != null &&
                <View style={styles.calcView}>
                    <Text style={styles.calcStlye}>Display {fromValue} here! {toValue}</Text>
                </View>
            }

            <View style={styles.newsView}>
                <Text style={styles.newsTextStyle}> Today's News </Text>
                {RenderNews()}
            </View>

            {RenderBottomBar()}
        </SafeAreaView>
    )
}