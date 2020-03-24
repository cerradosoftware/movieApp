import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PosterList from '../components/PosterList';
import BannerList from '../components/BannerList';
import MoviesService from '../services/MoviesService';
import { Movie } from '../types/Movie';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import TouchIcon from '../components/TochIcon';

type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'HomeScreen'
>;
type Props = {
    navigation: HomeScreenNavigationProp;
};

export const Home = (props: Props) => {
    props.navigation.setOptions({
        headerTitle: 'MovieApp',
        headerRight: () => <TouchIcon name="search" />,
        headerRightContainerStyle: {
            right: 20
        }
    });
    const [trending, setTrending] = useState(new Array<Movie>(0));
    const [now, setNow] = useState(new Array<Movie>(0));
    const [popular, setPopular] = useState(new Array<Movie>(0));

    useEffect(() => {
        MoviesService.getTrending((result) => setTrending(result));
        MoviesService.getNow((result) => setNow(result));
        MoviesService.getPopular((result) => setPopular(result));
    }, []);

    return (
        <>
            <ScrollView style={styles.root}>
                <BannerList list={trending} title="Tendencias" />
                <PosterList list={now} title="Agora" />
                <PosterList list={popular} title="Popular" />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        marginStart: 20,
        marginTop: 40
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
