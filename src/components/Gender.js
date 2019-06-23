import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Text from './Text';

const Gender = ({ style, selectedIndex, labelStyle, ...otherProps }) => (
    <View style={[styles.container, style]}>
        <Text style={styles.label} >
            Gender
        </Text>
        <View style={[styles.inputContainer]}>
            <RadioGroup
                style={[styles.radio, style]}
                size={wp('5%')}
                selectedIndex={selectedIndex}
                thickness={wp('0.2%')}
                {...otherProps}>
                <RadioButton value={'male'} activeColor="#00A0C6">
                    <Text small style={[styles.text, labelStyle, selectedIndex == 0 ? styles.active : null]}>Male</Text>
                </RadioButton>

                <RadioButton value={'female'} activeColor="#00A0C6">
                    <Text small style={[styles.text, labelStyle, selectedIndex == 1 ? styles.active : null]}>Female</Text>
                </RadioButton>
            </RadioGroup>
        </View>
    </View>
);

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0
    },
    radio: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        color: '#898989'
    },
    active: {
        color: '#00A0C6'
    },
    label: {
        color: '#BCBCBC'
    },
});

export default Gender;
