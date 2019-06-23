import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Text from './Text';

const HeaderButton = ({ buttonStyle, image, caption, onPress }) =>
    <TouchableOpacity transparent style={styles.container} {...this.props} onPress={onPress}>
        {
            (image) ?
                <Image style={{}} source={image} />
                :
                <Text
                    small
                    style={[styles.caption, buttonStyle]}>
                    {caption}
                </Text>
        }
    </TouchableOpacity>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp('15%'),
        height: Dimensions.navbarHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    caption: {
        color: Colors.pageTitle
    }
});

export default HeaderButton;
