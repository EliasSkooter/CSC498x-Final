import React from "react";
import { View, Text, SafeAreaView, Button, TouchableOpacity, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from "./styles";

const logo = require('../../assets/Exchangeable.png');

export default function Landing({navigation}) {
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