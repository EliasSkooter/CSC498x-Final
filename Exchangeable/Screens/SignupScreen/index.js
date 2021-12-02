import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, TouchableOpacity, Image, TextInput } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from "./styles";
import { IP } from '../../config/BackendIP';

const logo = require('../../assets/Exchangeable.png');

export default function Signin({ navigation }) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [listofUsers, setListofUsers] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState();

    const SubmitSignUp = (username, password) => {
        // console.log("username: " + username + "\npassword: " + password + "\nIP: " + IP);

        const bodyReq = {
            username: username,
            password: password
        };

        for (let i = 0; i < listofUsers.length; i++) {
            if (username.toUpperCase() == listofUsers[i].username.toUpperCase()) {
                console.log("This username is taken.");
                return "Failed"
            }
        }

        fetch(IP + "/user-entities", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bodyReq)
        })
        .then(res => res.json())
        .then(res => {
            console.log("response after submit...", res);
            navigation.navigate('Home')
        })
        .catch(e => {
            console.log("failed to submit user...", e);
        })
    }

    const FetchUsers = () => {
        console.log("fetching users...");
        fetch(IP + `/user-entities`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log("res ===>", res);
                setListofUsers(res);
            })
            .catch(e => {
                console.log("Failed to fetch list of users", e);
            })
    }

    useEffect(() => {
        FetchUsers();

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}> Exchangeable </Text>
            </View>

            <View style={styles.textInputView1}>
                <TextInput
                    style={styles.textInput1}
                    placeholder="enter email here..."
                    placeholderTextColor="grey"
                    onChangeText={text => {
                        setUsername(text);
                        console.log(text);
                    }}
                />
            </View>

            <View style={styles.textInputView2}>
                <TextInput
                    style={styles.textInput2}
                    secureTextEntry={true}
                    placeholder="enter password here..."
                    placeholderTextColor="grey"
                    onChangeText={text => {
                        setPassword(text);
                        console.log(text);
                    }}
                />
            </View>

            <View style={styles.textInputView2}>
                <TextInput
                    style={styles.textInput2}
                    secureTextEntry={true}
                    placeholder="confirm password here..."
                    placeholderTextColor="grey"
                    onChangeText={text => {
                        setConfirmPassword(text);
                        if (text != password) {
                            console.log("password don't match!!!");
                        }
                        else {
                            console.log("passwords match.");
                        }
                        console.log(text);
                    }}
                />
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        SubmitSignUp(username, password);
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