import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        padding: wp("10%"),
    },

    titleView: {
        flex: 1 / 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 30,
        color: 'white'
    },

    blackMarketView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    blackMarketText: {
        color: 'white',
        fontSize: 18
    },

    bottomBar: {
        // backgroundColor: 'red',
        // height: hp('5%'),
        width : wp("100%"),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },

    signOutView: {
        backgroundColor: 'red',
        height: hp("10%"),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('80%'),
        position: 'absolute',
        bottom: hp('30%'),
        left: wp('10%'),
    },

    signOutText: {
        color: 'white',
        fontSize: 25
    },

    deleteAccountView: {
        backgroundColor: 'red',
        height: hp("10%"),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('80%'),
        position: 'absolute',
        bottom: hp('10%'),
        left: wp('10%'),
    },

    deleteAccountText: {
        color: 'white',
        fontSize: 25
    },
});