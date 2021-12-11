import React, {useState} from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import { IP } from "../../config/BackendIP";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({navigation}) {

    const [checkbox, setCheckbox] = useState(false);


    
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
        <SafeAreaView style = {styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>
                    Settings
                </Text>
            </View>

            <View style={styles.blackMarketView}>
                <Text style={styles.blackMarketText}>Include black market rates?</Text>
                <CheckBox
                    disabled = {false}
                    checked = {checkbox}
                    onPress = {() => {
                        console.log(!checkbox);
                        setCheckbox(!checkbox);
                    }}
                />
            </View>

            <View
                style = {styles.signOutView}
            >
                <TouchableOpacity
                    disabled = {false}
                    style = {styles.signOutButton}
                    onPress = {() => {
                        console.log("Signing out...");
                        AsyncStorage.removeItem('User');
                        navigation.navigate('Landing');
                    }}
                >
                    <Text style = {styles.signOutText}> Sign Out </Text>
                </TouchableOpacity>
            </View>

            {RenderBottomBar()}
        </SafeAreaView>
    )
}