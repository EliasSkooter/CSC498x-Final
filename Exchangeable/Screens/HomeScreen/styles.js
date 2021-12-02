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
        flex: 1 / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 30,
        color: 'white'
    },

    amountContainer: {
        flex: 1/15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('5%')   
    },

    amountText: {
        color: 'white',
        alignSelf: 'center',
    },
    
    textInputView1: {
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: wp("50%"),
        
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },

    ToFromContainer: {
        flex: 1/10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('5%')
    },

    from: {
        flex: 1/2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    to: {
        flex: 1/2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    dropdownPickerStyle1: {
        width: wp("30%"),
        height: hp("5%"),
    },
    dropdownPickerStyle2: {
        width: wp("30%"),
        height: hp("5%"),
    },

    dropDownText: {
        fontSize: 15,
        color: 'white',
    },
});