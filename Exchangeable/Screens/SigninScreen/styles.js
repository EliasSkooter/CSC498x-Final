import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(171,183,183)"
    },

    titleView: {
        flex: 1 / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 30,
        color: "rgb(0,128,128)"
    },

    textInputView1: {
        // flex: 1 / 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        // backgroundColor: 'rgb(0,128,128)',
        marginLeft: wp("15%"),
        marginRight: wp('15%'),
        marginBottom: hp('5%'),
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },

    textInput1: {
        color: 'black',
        fontSize: 12
    },

    textInputView2: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        // backgroundColor: 'rgb(0,139,139)',
        marginLeft: wp("15%"),
        marginRight: wp('15%'),
        marginBottom: wp('5%'),
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },

    textInput2: {
        color: 'black',
        fontSize: 12
    },

    buttonView: {
        flex: 1 / 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(0,139,139)',
        marginLeft : wp('15%'),
        marginRight : wp('15%'),
        marginBottom : wp('5%'),
        borderRadius: 5,
    },

    button: { 
        flex: 1, 
        width: wp("70%"),
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: 'black',
        fontSize: 20
    },

    logoView: {
        // flex: 1 / 1,
        position: 'absolute',
        bottom: wp('5%'),
        left: wp('15%'),
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    image: {
        flex: 1/5,
        width: wp('70%'),
        height: wp('60%')
    }
});