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
    }
});