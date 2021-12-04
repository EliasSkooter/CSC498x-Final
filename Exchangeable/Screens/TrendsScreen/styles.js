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

    dropDownView: {
        flex: 1/10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('5%'),
    },
    dropDownText: {
        fontSize: 15,
        color: 'white',
        width: wp('40%')
    },

    dropdownPickerStyle1: {
        width: wp("30%"),
        height: hp("5%"),
        zIndex: 3,
        elevation: 3,
    },

    trendsViewUp: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: hp('5%'),
    },

    trendsTextUp: {
        color: 'white',
        fontSize: 18,
        width: wp('50%'),
    },

    trendsVarianceUp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('20%'),
        alignItems: 'center',
    },

    trendsVarianceTextUp: {
        color : 'green',
        fontSize: 18,

    },

    trendsViewDown: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: hp('5%'),
    },

    trendsTextDown: {
        color: 'white',
        fontSize: 18,
        width: wp('50%'),
    },

    trendsVarianceDown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('26%'),
        alignItems: 'center',
    },

    trendsVarianceTextDown: {
        color : 'red',
        fontSize: 18,

    },
});