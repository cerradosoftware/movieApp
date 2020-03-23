import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, MovieDetailScreen } from '../screens/';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="float">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="MovieDetail"
                    component={MovieDetailScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
