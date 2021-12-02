import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";

export default function Home() {

    const [openFrom, setOpenFrom] = useState(false);
    const [fromValue, setFromValue] = useState(null);
    const [openTo, setOpenTo] = useState(false);
    const [toValue, setToValue] = useState(null);
    const [amount, setAmount] = useState();
    const [currencies, setCurrencies] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>
                    Check Today's Exchange Rates!
                </Text>
            </View>

            <View style ={styles.amountContainer}>
                <Text style={styles.amountText}>Amount: </Text>
                <TextInput
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
                            style={styles.dropdownPickerStyle1}
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
                            style={styles.dropdownPickerStyle2}
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

            {fromValue != null && toValue != null &&
                <View>
                    <Text>Display {fromValue} here! {toValue}</Text>
                </View>}
        </SafeAreaView>
    )
}