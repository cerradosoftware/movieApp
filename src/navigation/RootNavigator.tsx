import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, MovieDetailScreen } from '../screens/';
import { RootStackParamList } from './NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode="float"
                screenOptions={{
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 8
                    }
                }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen
                    name="MovieDetailScreen"
                    component={MovieDetailScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
