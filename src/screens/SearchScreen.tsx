import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    View,
    Dimensions,
    StatusBar
} from 'react-native';
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
        headerTitle: 'Buscar'
    });
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(new Array<Movie>(0));

    const doQuery = () => {
        setLoading(true);
        MoviesService.search(query, (result) => {
            setResult(result);
            setLoading(false);
        });
    };

    return (
        <>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent
            />
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
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        margin: 20,
        top: 40
    },
    searchView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchIcon: {
        position: 'absolute',
        right: 0
    },
    searchInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        flex: 1,
        backgroundColor: '#E0E0E0',
        borderRadius: 10
    }
});

export default SearchScreen;
