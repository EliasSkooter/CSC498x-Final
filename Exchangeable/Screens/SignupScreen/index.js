import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, TouchableOpacity, Image, TextInput } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from "./styles";
import { IP } from '../../config/BackendIP';
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo = require('../../assets/Exchangeable.png');

export default function Signin({ navigation }) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [listofUsers, setListofUsers] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState();
    const [usernameControl, setUsernameControl] = useState(true);
    const [passwordControl, setPasswordControl] = useState(true);
    const [confirmedPasswordControl, setConfirmedPasswordControl] = useState(true);

    const SubmitSignUp = (username, password) => {
        let proceed = true;
        // console.log("username: " + username + "\npassword: " + password + "\nIP: " + IP);

        if (username == undefined || username?.length < 8) {
            setUsernameControl(false);
            proceed = false;
        }

        if (password == undefined || password?.length < 8) {
            setPasswordControl(false);
            proceed = false;
        }

        if (password != confirmPassword) {
            proceed = false;
        }

        if (proceed == false) {
            console.log("invalid username or password");
            return "Failed.";
        }

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
                AsyncStorage.setItem('User', res.id.toString());
                navigation.navigate('Home');
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

            {!usernameControl && <Text style={styles.formControl}>*Please input a valid username...</Text>}

            <View style={styles.textInputView1}>
                <TextInput
                    style={styles.textInput1}
                    placeholder="enter username here..."
                    placeholderTextColor="grey"
                    onChangeText={text => {
                        setUsername(text);
                        console.log(text);
                        if (text.length > 8) {
                            setUsernameControl(true)
                        }
                    }}
                />

            </View>
            {!passwordControl && <Text style={styles.formControl}>*Please input a valid password...</Text>}

            <View style={styles.textInputView2}>
                <TextInput
                    style={styles.textInput2}
                    secureTextEntry={true}
                    placeholder="enter password here..."
                    placeholderTextColor="grey"
                    onChangeText={text => {
                        setPassword(text);
                        console.log(text);
                        if (text.length > 8) {
                            setPasswordControl(true)
                        }
                    }}
                />
            </View>

            {!confirmedPasswordControl && <Text style={styles.formControl}>*Passwords don't match...</Text>}

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
                            setConfirmedPasswordControl(false);
                        }
                        else {
                            console.log("passwords match.");
                            setConfirmedPasswordControl(true);
                        }
                        console.log(text);
                    }}
                />
            </View>

            <View style={usernameControl && passwordControl && confirmedPasswordControl ? styles.buttonView : styles.disabledButtonView}>
                <TouchableOpacity
                    disabled = {!(usernameControl && passwordControl && confirmedPasswordControl)}
                    style={styles.button}
                    onPress={() => {
                        SubmitSignUp(username, password);
                    }}
                >
                    <Text style={usernameControl && passwordControl && confirmedPasswordControl ? styles.buttonText : styles.disabledButtonText}> Sign Up</Text>
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