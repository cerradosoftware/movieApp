import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';

interface BannerProps {
  url: string;
  title?: string;
}

const Banner = (props: BannerProps) => {
  const {url, title} = props;
  return (
    <View style={styles.wrapper}>
      <Image borderRadius={5} style={styles.image} source={{uri: url}} />
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width: 320, height: 160},
  wrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Banner;
