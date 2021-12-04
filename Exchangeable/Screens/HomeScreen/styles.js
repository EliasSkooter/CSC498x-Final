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
        flex: 1 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 30,
        color: 'white'
    },

    amountContainer: {
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
        height: 40,
        
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },

    ToFromContainer: {
        flex: 1/4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        // marginBottom: hp('5%'),
        // backgroundColor: 'green'
    },

    from: {
        // flex: 1/2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    to: {
        // flex: 1/2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    dropdownPickerStyle1: {
        width: wp("30%"),
        height: hp("5%"),
        zIndex: 3,
        elevation: 3,
    },
    dropdownPickerStyle2: {
        width: wp("30%"),
        height: hp("5%"),
        zIndex: 3,
        elevation: 3,
    },

    dropDownText: {
        fontSize: 15,
        color: 'white',
    },

    calcView: {
        flex: 1/4,
        justifyContent: 'center',
        // backgroundColor: 'red',
    },

    calcStlye: {
        // marginTop: hp("5%"),
        fontSize: 18,
        color: 'white'
    },

    newsView: {
        borderTopWidth: 2,
        borderTopColor: 'white',
        paddingTop: hp("5%"),
        flex: 1,
        marginBottom: hp('5%'),
    },

    newsTextStyle: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
        marginBottom: hp('5%'),
    },

    newsRenderView: {
        height: hp("25%"),
    },

    cardStyle: {
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        margin: wp("2%"),
        width: wp('30%')
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