import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    StatusBar
} from 'react-native';
import { Movie } from '../types/Movie';
import { PosterList } from '../components';
import { IMAGE_BASE_URL } from '../values/URLS';
import MoviesService from '../services/MoviesService';
import moment from 'moment';
import { StackNavigationProp, HeaderTitle } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { RouteProp } from '@react-navigation/native';

type MovieDetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MovieDetailScreen'
>;
type MovieDetailScreenRouteProp = RouteProp<
    RootStackParamList,
    'MovieDetailScreen'
>;

type Props = {
    navigation: MovieDetailScreenNavigationProp;
    route: MovieDetailScreenRouteProp;
};

export const MovieDetailScreen = (props: Props) => {
    const { item } = props.route.params;
    props.navigation.setOptions({ headerTitle: item.title });

    const [similar, setSimilar] = useState(new Array<Movie>(0));

    useEffect(() => {
        MoviesService.getRelated(item.id, (result) => setSimilar(result));
    }, [item]);

    return (
        <>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
                translucent
            />
            <ScrollView style={styles.root}>
                <Image
                    style={styles.backImage}
                    source={{ uri: `${IMAGE_BASE_URL}${item.backdrop_path}` }}
                />
                <Image
                    style={styles.poster}
                    source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                />
                <View style={styles.metadata}>
                    <Text>
                        {moment(item.release_date).format('DD/MM/YYYY')}
                    </Text>
                    <Text>{item.vote_average}/10</Text>
                </View>
                <Text style={styles.resume}>{item.overview}</Text>
                <View style={styles.similar}>
                    <PosterList
                        disableLoading
                        list={similar}
                        title="Titulos Relacionados"
                    />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        bottom: 20
    },
    backImage: {
        width: Dimensions.get('window').width,
        height: 200
    },
    poster: {
        position: 'absolute',
        top: 100,
        left: 30,
        width: 100,
        height: 150
    },
    metadata: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        right: 20
    },
    resume: {
        margin: 20,
        textAlign: 'justify',
        fontFamily: 'sans-serif-light'
    },
    similar: {
        margin: 20
    }
});

export default MovieDetailScreen;
