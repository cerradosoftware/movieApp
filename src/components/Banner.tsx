import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

interface BannerProps {
    url: string;
    title?: string;
    poster?: boolean;
    onPress?: () => void;
    propsStyles?: any;
}

const Banner = (props: BannerProps) => {
    const { url, title, poster, onPress, propsStyles } = props;

    const width = poster ? 110 : 320;
    const height = poster ? 165 : 160;

    const styles = StyleSheet.create({
        image: { width: width, height: height },
        wrapper: {
            marginEnd: 10,
            maxWidth: width
        }
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.wrapper, ...propsStyles }}
        >
            <Image
                borderRadius={5}
                style={styles.image}
                source={{ uri: url }}
            />
            {!poster && <Text>{title}</Text>}
        </TouchableOpacity>
    );
};

export default Banner;
