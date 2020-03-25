import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import YouTube from 'react-native-youtube';
import { Movie } from '../types/Movie';
import { PosterList, Banner } from '../components';
import { IMAGE_BASE_URL, VIDEOS_URL } from '../values/URLS';
import MoviesService from '../services/MoviesService';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { RouteProp } from '@react-navigation/native';
import { Video } from '../types/Video';
import { YOUTUBE_KEY } from '../values/config';

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
    const [videos, setVideos] = useState(new Array<Video>(0));

    useEffect(() => {
        MoviesService.getRelated(item.id, (result) => setSimilar(result));
        MoviesService.getVideos(item.id, (result) => setVideos(result));
    }, [item]);

    return (
        <>
            <ScrollView style={styles.root}>
                <Image
                    style={styles.backImage}
                    source={{ uri: `${IMAGE_BASE_URL}${item.backdrop_path}` }}
                />
                <Banner
                    propsStyles={styles.poster}
                    poster
                    url={`${IMAGE_BASE_URL}${item.poster_path}`}
                />
                <View style={styles.metadata}>
                    <Text>
                        {moment(item.release_date).format('DD/MM/YYYY')}
                    </Text>
                    <Text>{item.vote_average}/10</Text>
                </View>
                <Text style={styles.original}>
                    Titulo Original:{item.original_title}
                </Text>
                <Text style={styles.resume}>{item.overview}</Text>
                <PosterList
                    disableLoading
                    list={similar}
                    title="Titulos Relacionados"
                />
                {videos.length > 0 && (
                    <View>
                        <Text style={styles.label}>Trailer</Text>
                        <YouTube
                            videoId={videos[0].key}
                            apiKey={YOUTUBE_KEY}
                            onError={(e) => console.log(e)}
                            style={styles.video}
                        />
                    </View>
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        bottom: 20,
        marginHorizontal: 20
        // top: 20
    },
    backImage: {
        width: Dimensions.get('window').width,
        height: 250
    },
    poster: {
        position: 'absolute',
        top: 150,
        left: 20,
        width: 100,
        height: 150
    },
    metadata: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    resume: {
        textAlign: 'justify',
        fontFamily: 'sans-serif-light'
    },
    original: {
        marginVertical: 40
    },
    label: {
        marginTop: 10,
        fontSize: 20,
        textTransform: 'uppercase'
    },
    video: {
        alignSelf: 'stretch',
        height: 200,
        marginBottom: 10
    }
});

export default MovieDetailScreen;
