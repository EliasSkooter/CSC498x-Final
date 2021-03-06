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

    buttonView1: {
        flex: 1 / 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(0,128,128)',
        marginLeft: wp("15%"),
        marginRight: wp('15%'),
        marginBottom: hp('10%'),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'green'
        
    },

    buttonView2: {
        flex: 1 / 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(0,139,139)',
        marginLeft: wp("15%"),
        marginRight: wp('15%'),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'green'
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
        flex: 1 / 2.5,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    image: {
        width: wp('70%'),
        height: wp('60%')
    }
});