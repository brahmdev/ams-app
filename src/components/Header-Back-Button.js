import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Dimensions from '../constants/Dimensions';
import BackIcon from '../../assets/icons/back.png';

const HeaderBackButton = ({ onPress }) =>
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={BackIcon} />
    </TouchableOpacity>

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.navbarHeight,
        paddingLeft: 15,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HeaderBackButton;
