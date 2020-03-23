import React from 'react';
import { Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Movie } from '../types/Movie';
import Banner from './Banner';
import { IMAGE_BASE_URL } from '../values/config';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

interface BannerListProps {
    list: Array<Movie>;
    title: string;
}

const renderItem = (arrayItem: any, onPress: () => void) => {
    const { item, index } = arrayItem;
    return (
        <Banner
            key={index}
            url={`${IMAGE_BASE_URL}${item.backdrop_path}`}
            title={item.title}
            onPress={onPress}
        />
    );
};

const PosterList = (props: BannerListProps) => {
    const navigation = useNavigation();
    const { list, title } = props;

    if (list && list.length > 0) {
        return (
            <>
                <Text style={styles.rowTitle}>{title}</Text>
                <Carousel
                    autoplay
                    data={list}
                    renderItem={(item) =>
                        renderItem(item, () =>
                            navigation.navigate('MovieDetail', {
                                item: item.item
                            })
                        )
                    }
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={320}
                    activeSlideAlignment="start"
                />
            </>
        );
    } else {
        return <ActivityIndicator size="large" color="#F99F00" />;
    }
};

const styles = StyleSheet.create({
    rowTitle: {
        marginTop: 10,
        fontSize: 20,
        textTransform: 'uppercase'
    }
});

export default PosterList;
