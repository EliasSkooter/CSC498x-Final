import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Landing from "../Screens/LandingScreen";
import Signup from "../Screens/SignupScreen";
import Signin from "../Screens/SigninScreen";
import Home from "../Screens/HomeScreen";
import Trends from "../Screens/TrendsScreen";
import Settings from "../Screens/SettingsScreen";

const screens = {

    Home: {
        screen: Home
    },
    
    Landing: {
        screen: Landing
    },

    Signup: {
        screen: Signup
    },

    Signin: {
        screen: Signin
    },
    

    Trends: {
        screen: Trends
    },

    Settings: {
        screen: Settings
    }
}

const homeStack = createStackNavigator(screens, {headerMode: 'none'});

export default createAppContainer(homeStack);