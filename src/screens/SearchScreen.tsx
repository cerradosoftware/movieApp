import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    View,
    Dimensions
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { RouteProp } from '@react-navigation/native';
import TouchIcon from '../components/TouchIcon';

type SearchScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SearchScreen'
>;
type SearchScreenRouteProp = RouteProp<RootStackParamList, 'SearchScreen'>;

type Props = {
    navigation: SearchScreenNavigationProp;
    route: SearchScreenRouteProp;
};

export const SearchScreen = () => {
    const [query, setQuery] = useState('');
    return (
        <ScrollView style={styles.root}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={(text) => setQuery(text)}
                    value={query}
                />
                <TouchIcon styles={styles.searchIcon} name="search" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        margin: 20,
        top: 40
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchIcon: {
        position: 'absolute',
        right: 0
    },
    searchInput: {
        height: 45,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        flex: 1
    }
});

export default SearchScreen;
