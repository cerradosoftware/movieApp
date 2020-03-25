import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { RouteProp } from '@react-navigation/native';
import TouchIcon from '../components/TouchIcon';
import { PosterList } from '../components';
import { Movie } from '../types/Movie';
import MoviesService from '../services/MoviesService';

type SearchScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SearchScreen'
>;
type SearchScreenRouteProp = RouteProp<RootStackParamList, 'SearchScreen'>;

type Props = {
    navigation: SearchScreenNavigationProp;
    route: SearchScreenRouteProp;
};

export const SearchScreen = (props: Props) => {
    props.navigation.setOptions({
        headerTitle: '',
        headerTintColor: 'gray'
    });
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(new Array<Movie>(0));

    const doQuery = () => {
        if (query.length < 3) {
            Alert.alert('Busca', 'Insira ao menos 3 caracteres para a busca.');
            return;
        }
        setLoading(true);
        MoviesService.search(query, (result) => {
            setResult(result);
            setLoading(false);
        });
    };

    return (
        <View style={styles.root}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={(text) => setQuery(text)}
                    value={query}
                />
                <TouchIcon
                    styles={styles.searchIcon}
                    name="search"
                    onPress={doQuery}
                />
            </View>
            <PosterList list={result} vertical disableLoading={!loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        margin: 20,
        top: 40
    },
    searchView: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    searchIcon: {
        position: 'absolute',
        right: 0
    },
    searchInput: {
        flex: 1
    }
});

export default SearchScreen;
