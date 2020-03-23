import React from 'react';
import { Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Movie } from '../types/Movie';
import Banner from './Banner';
import { IMAGE_BASE_URL } from '../values/config';
import { useNavigation } from '@react-navigation/native';

interface PosterListProps {
    list: Array<Movie>;
    title: string;
}

const renderItem = (arrayItem: any, onPress: () => void) => {
    const { item, index } = arrayItem;
    return (
        <Banner
            url={`${IMAGE_BASE_URL}${item.poster_path}`}
            title={item.title}
            poster
            onPress={onPress}
        />
    );
};

const PosterList = (props: PosterListProps) => {
    const navigation = useNavigation();
    const { list, title } = props;

    if (list && list.length > 0) {
        return (
            <>
                <Text style={styles.rowTitle}>{title}</Text>
                <FlatList
                    data={list}
                    renderItem={(item) =>
                        renderItem(item, () =>
                            navigation.navigate('MovieDetail', {
                                item: item.item
                            })
                        )
                    }
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
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
