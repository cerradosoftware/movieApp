import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ViewStyle, TouchableOpacity } from 'react-native';

type Props = {
    name: string;
    size?: number;
    color?: string;
    onPress?: () => void;
    styles?: ViewStyle;
};

const TouchIcon = (props: Props) => {
    const { name, size, color, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon name={name} size={size || 20} color={color || '#999'} />
        </TouchableOpacity>
    );
};

export default TouchIcon;
