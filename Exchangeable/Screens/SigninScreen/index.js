import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "./styles";
import { IP } from '../../config/BackendIP';
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo = require('../../assets/Exchangeable.png');

export default function Signin({ navigation }) {

    const [listofUsers, setListofUsers] = useState([]);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [usernameControl, setUsernameControl] = useState(true);
    const [passwordControl, setPasswordControl] = useState(true);
    const [loginControl, setLoginControl] = useState(true);

    const SubmitLogin = (username, password) => {

        let proceed = true;

        if (username == undefined || username?.length < 8) {
            setUsernameControl(false);
            console.log("Failed username");
            proceed = false;
        }
        
        if (password == undefined || password?.length < 8) {
            console.log("Failed password");
            setPasswordControl(false);
            proceed = false;
        }

        if (proceed == false) {
            console.log("invalid username or password.");
            return "Failed.";
        }
        // console.log("username: " + username + "\npassword: " + password + "\nIP: " + IP);

        // for (let i = 0; i < listofUsers.length; i++) {
        //     if (username.toUpperCase() == listofUsers[i].username.toUpperCase()) {
        //         if (password.toUpperCase() == listofUsers[i].password.toUpperCase()) {
        //             console.log("sign in succeeded!");
        //             AsyncStorage.setItem("User", listofUsers[i].id.toString())
        //                 .catch(e => {
        //                     console.log("Failed to save user in Async Storage...");
        //                 });

        //             navigation.navigate("Home");
        //             return "Success"
        //         }
        //     }
        // }

        let loginObject = {
            identifier: username,
            password: password
        }

        fetch(IP + '/auth/local', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginObject)
        })
            .then(res => res.json())
            .then(res => {
                if (res.jwt != undefined) {
                    console.log("login successful...", res.user.id);
                    AsyncStorage.setItem("User", res.user.id.toString());
                    AsyncStorage.setItem('Token', res.jwt);
                    navigation.navigate('Home');
                    return "success"
                }
                else {
                    console.log('login Failed...', res);
                    setLoginControl(false);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    const RenderBackButton = () => {
        return (
            <View style={styles.backButtonView}>
                <Icon
                    name="arrow-left"
                    size={25}
                    color={'black'}
                    onPress={() => {
                        navigation.pop();
                    }}
                />
            </View>
        )
    }

    // const FetchUsers = () => {
    //     console.log("fetching users...");
    //     fetch(IP + `/auth/local`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log("res ===>", res);
    //             setListofUsers(res);
    //         })
    //         .catch(e => {
    //             console.log("Failed to fetch list of users", e);
    //         })
    // }

    // useEffect(() => {
    //     FetchUsers();

    // }, [])

    return (
        <SafeAreaView style={styles.container}>
            {RenderBackButton()}
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
                            setUsernameControl(true);
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
                            setPasswordControl(true);
                        }
                    }}
                />
            </View>

            <View style={usernameControl && passwordControl ? styles.buttonView : styles.disabledButtonView}>
                <TouchableOpacity
                    disabled={!(usernameControl && passwordControl)}
                    style={styles.button}
                    onPress={() => {
                        SubmitLogin(username, password);
                    }}
                >
                    <Text style={usernameControl && passwordControl ? styles.buttonText : styles.disabledButtonText}> Sign In</Text>
                </TouchableOpacity>
            </View>

            {!loginControl && <Text style={styles.formControl}>*Incorrect username or password...</Text>}

            <View style={styles.logoView}>
                <Image style={styles.image}
                    source={logo}
                />
            </View>
        </SafeAreaView>
    )
}