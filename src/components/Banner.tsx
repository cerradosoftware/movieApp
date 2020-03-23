import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';

interface BannerProps {
  url: string;
  title?: string;
  poster?: boolean;
}

const Banner = (props: BannerProps) => {
  const {url, title, poster} = props;

  const width = poster ? 140 : 320;
  const height = poster ? 210 : 160;

  const styles = StyleSheet.create({
    image: {width: width, height: height},
    wrapper: {
      marginEnd: 10,
      maxWidth: width,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Image borderRadius={5} style={styles.image} source={{uri: url}} />
      <Text>{title}</Text>
    </View>
  );
};

export default Banner;
