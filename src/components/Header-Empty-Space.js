import React from 'react';
import { StyleSheet, View } from "react-native";
import Dimensions from '../constants/Dimensions';

const HeaderEmptySpace = () =>
    <View style={styles.container} >
    </View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.navbarHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HeaderEmptySpace;
