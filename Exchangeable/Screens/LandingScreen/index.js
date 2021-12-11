import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "../../config/BackendIP";

const logo = require('../../assets/Exchangeable.png');

export default function Landing({ navigation }) {

    const [loggedIn, setLoggedIn] = useState();

    useEffect(() => {
        AsyncStorage.getItem("User").then((user) => {
            if (user != null) {
                fetch(IP + `/user-entities`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        for (let item of res) {
                            if (item.id == user) {
                                console.log("current active user...", user);
                                navigation.navigate("Home");
                            }
                            else {
                                AsyncStorage.removeItem('User');
                                console.log("User found in Async Storage but missing in DB... removing User from Async storage...");
                            }
                        }
                    })
                    .catch(e => {
                        console.log("Failed to fetch users in landing screen...", e);
                    })
            }
            else {
                console.log("no active user in AsyncStorage...");
            }
        })
            .catch((e) => {
                console.log("failed to retrieve current user..." + e);
            })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}> Exchangeable </Text>
            </View>

            <View style={styles.buttonView1}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Signin')
                    }}
                >
                    <Text style={styles.buttonText}> Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonView2}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Signup')
                    }}
                >
                    <Text style={styles.buttonText}> Sign Up</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.logoView}>
                <Image style={styles.image}
                    source={logo}
                />
            </View>

        </SafeAreaView>
    )
}