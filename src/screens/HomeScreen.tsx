import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, StatusBar, Image } from 'react-native';
import PosterList from '../components/PosterList';
import BannerList from '../components/BannerList';
import MoviesService from '../services/MoviesService';
import { Movie } from '../types/Movie';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import TouchIcon from '../components/TouchIcon';

type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'HomeScreen'
>;
type Props = {
    navigation: HomeScreenNavigationProp;
};

export const Home = (props: Props) => {
    props.navigation.setOptions({
        headerTitle: '',
        headerRight: () => (
            <TouchIcon
                name={'search'}
                onPress={() => props.navigation.navigate('SearchScreen')}
            />
        ),
        headerTransparent: true,

        headerLeft: () => <Image source={require('../assets/icon.png')} />,
        headerLeftContainerStyle: {
            left: 20
        },
        headerRightContainerStyle: {
            right: 20
        }
    });
    const [trending, setTrending] = useState(new Array<Movie>(0));
    const [now, setNow] = useState(new Array<Movie>(0));
    const [popular, setPopular] = useState(new Array<Movie>(0));

    useEffect(() => {
        MoviesService.getTrending().then((result) => setTrending(result));
        MoviesService.getNow().then((result) => setNow(result));
        MoviesService.getPopular().then((result) => setPopular(result));
    }, []);

    return (
        <ScrollView style={styles.root}>
            <BannerList list={trending} title="Lançamentos" />
            <PosterList list={now} title="Agora" />
            <PosterList list={popular} title="Popular" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        marginStart: 20,
        marginTop: 60
    },
    row: {
        flexDirection: 'row',
        marginTop: 20
    },
    rowTitle: {
        fontSize: 20,
        textTransform: 'uppercase'
    }
});

export default Home;
