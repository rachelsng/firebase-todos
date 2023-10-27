import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotesScreenAdd from "./screens/NotesScreenAdd";
import NotesScreenHome from "./screens/NotesScreenHome";
import NotesScreenEdit from "./screens/NotesScreenEdit";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={NotesScreenHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={NotesScreenAdd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit"
          component={NotesScreenEdit}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}