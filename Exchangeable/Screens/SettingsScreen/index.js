import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import { IP } from "../../config/BackendIP";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({ navigation }) {

    const [checkbox, setCheckbox] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    useEffect(() => {
        AsyncStorage.getItem('blackMarket')
            .then(res => {
                if (res == 'true') {
                    setCheckbox(true);
                }
                else {
                    setCheckbox(false);
                    AsyncStorage.setItem('blackMarket', CheckBox.toString());
                }
            })
            .catch(e => {
                console.log("Failed to retrieve black market from async storage...", e);
            })
    }, []);

    const DeleteAccount = () => {
        AsyncStorage.getItem('User').then((id) => {
            fetch(`${IP}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log("deleted user...", res);
                AsyncStorage.clear();
                navigation.navigate('Landing');
            })
            .catch(e => {
                console.log("failed to delete user...", e);
            })
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
                        console.log("navigating to trends screen...");
                        navigation.navigate("Trends");
                    }}
                />
                <Icon
                    name="cog"
                    size={19}
                    color={'white'}
                    onPress={() => {
                        console.log("Already on Settings screen :)");
                    }}
                />

            </View>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>
                    Settings
                </Text>
            </View>

            <View style={styles.blackMarketView}>
                <Text style={styles.blackMarketText}>Include black market rates?</Text>
                <CheckBox
                    disabled={false}
                    checked={checkbox}
                    onPress={() => {
                        console.log(!checkbox);
                        AsyncStorage.setItem('blackMarket', (!checkbox).toString());
                        setCheckbox(!checkbox);
                    }}
                />
            </View>

            <View
                style={styles.signOutView}
            >
                <TouchableOpacity
                    disabled={false}
                    style={styles.signOutButton}
                    onPress={() => {
                        console.log("Signing out...");
                        AsyncStorage.removeItem('User');
                        navigation.navigate('Landing');
                    }}
                >
                    <Text style={styles.signOutText}> Sign Out </Text>
                </TouchableOpacity>
            </View>

            <View
                style={styles.deleteAccountView}
            >
                <TouchableOpacity
                    disabled={false}
                    style={styles.deleteAccountButton}
                    onPress={() => {
                        console.log("what?");
                        DeleteAccount();
                    }}
                >
                    <Text style={styles.deleteAccountText}> DELETE ACCOUNT </Text>
                </TouchableOpacity>
            </View>

            {RenderBottomBar()}
        </SafeAreaView>
    )
}