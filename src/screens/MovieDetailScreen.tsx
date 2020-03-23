import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Movie } from '../types/Movie';
import { Banner, PosterList } from '../components';
import { StackRouterOptions } from '@react-navigation/native';
import { IMAGE_BASE_URL } from '../values/config';
import MoviesService from '../services/MoviesService';

interface MovieDetailScreenProps {
    item: Movie;
    route: StackRouterOptions;
}

export const MovieDetailScreen = (props: MovieDetailScreenProps) => {
    const { item } = props.route.params;
    props.navigation.setOptions({ title: item.title });
    const [similar, setSimilar] = useState(new Array<Movie>(0));

    useEffect(() => {
        MoviesService.getRelated(item.id, (result) => setSimilar(result));
    }, []);

    return (
        <View style={styles.root}>
            <Image
                style={styles.backImage}
                source={{ uri: `${IMAGE_BASE_URL}${item.backdrop_path}` }}
            />
            <Image
                style={styles.poster}
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
            />
            <View style={styles.metadata}>
                <Text>{item.release_date}</Text>
                <Text>{item.vote_average}/10</Text>
            </View>
            <Text style={styles.resume}>{item.overview}</Text>
            <PosterList list={similar} title="Titulos Relacionados" />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {},
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
        right: 20
    },
    resume: {
        margin: 20
    }
});

export default MovieDetailScreen;
