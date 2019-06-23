import React from 'react';
import { View, StyleSheet } from "react-native";
import Colors from '../constants/Colors';
import Text from './Text';

const NavbarTitle = (props) => (
    <View style={styles.container}>
        <Text
            small
            style={[styles.caption]}>
            {props.caption}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    caption: {
        color: Colors.pageTitle
    }
});

export default NavbarTitle;
