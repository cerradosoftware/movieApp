import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Banner from '../components/Banner';
import MoviesService from '../services/MoviesService';
import {Movie} from '../types/Movie';

const _renderItem = (arrayItem: any) => {
  const {item, index} = arrayItem;
  return (
    <Banner
      key={index}
      url={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
      title={item.title}
    />
  );
};

const HomeScreen = () => {
  const [trending, setTrending] = useState(new Array<Movie>(0));

  MoviesService.getTrending(result => setTrending(result));

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>Tendencias</Text>
      </View>
      <Carousel
        autoplay
        data={trending}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={320}
        activeSlideAlignment="start"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginStart: 20,
    marginVertical: 40,
  },
  row: {
    flexDirection: 'row',
  },
  rowTitle: {
    fontSize: 24,
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
