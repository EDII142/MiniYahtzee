// npm install @react-navigation/native
// npx expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/native-stack
// npm install @react-navigation/bottom-tabs
// npm install --save react-native-flex-grid
// npx expo install expo-font
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import Home from "./components/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useFonts } from "expo-font";

const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded] = useFonts({
    KodeMono: require("./assets/fonts/KodeMono-Regular.ttf"),
    KodeMonoBold: require("./assets/fonts/KodeMono-Bold.ttf")
  });
  
  if(!loaded){
    return (<Text>Loading fonts, please wait.</Text>);
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{backgroundColor: "transparent"}}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'information' : 'information-outline';
                } else if (route.name === 'Gameboard') {
                  iconName = focused ? 'dice-multiple' : 'dice-multiple-outline';
                } else if (route.name === "Scoreboard") {
                  iconName = focused ? "scoreboard" : "scoreboard-outline";
                }
                return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
              },
              tabBarActiveTintColor: "#6a598e",
              tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: "none"}}}/>
          <Tab.Screen name="Gameboard" component={Gameboard}/>
          <Tab.Screen name="Scoreboard" component={Scoreboard}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}