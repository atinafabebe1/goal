import { createStackNavigator } from "@react-navigation/stack";
import SchoolList from "../screens/SchoolList";
import School from "../screens/School";
import { useTheme } from "react-native-paper";

const SchoolsStack = createStackNavigator();

export const SchoolsStackNavigator = () => {
    const theme = useTheme();

    const screenOptions = {
        headerStyle: {
            backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
        },
    };

    return (
        <SchoolsStack.Navigator screenOptions={screenOptions}>
            <SchoolsStack.Screen name="Schools List" component={SchoolList} />
            <SchoolsStack.Screen name="School" component={School} />
        </SchoolsStack.Navigator>
    );
};