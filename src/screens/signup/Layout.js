import React from 'react';
import { View, ScrollView } from 'react-native';
import { Loading, Gender, TextInput, Email, Password, Button, Text, Container, Content, CheckBox } from "../../components";
import styles from "./style";

const AmsContent = ({
    user, isRequesting, signup, onChangeText, goBack, onCheckBoxValueChange, isChecked,
    setUsernameRef, setPasswordRef, setEmailRef, setNameRef, setPhoneRef,
    setCityRef, setStreetRef, setUnitNumberRef, setZipcodeRef
}) =>
    <Container>
        <Content>
            <ScrollView>
                <View style={styles.pageTitleSection}>
                    <Text large style={styles.pageTitleText}>Sign up</Text>
                </View>
                <View style={styles.form}>
                    <TextInput label="Name" ref={setNameRef} onChangeText={input => onChangeText('name', input)} style={styles.inputDivider} />
                    <Gender
                        labelStyle={styles.radioLabels}
                        style={styles.radio}
                        selectedIndex={user.gender == "male" ? 0 : 1}
                        onSelect={(index, value) => onChangeText('gender', value)} />
                    <Email label="Email" ref={setEmailRef} onChangeText={input => onChangeText('email', input)} style={styles.inputDivider} />
                    <TextInput label="Phone" ref={setPhoneRef} placeholder="+31000000000" onChangeText={input => onChangeText('phone', input)} style={styles.inputDivider} />
                    <TextInput label="User name" ref={setUsernameRef} onChangeText={input => onChangeText('username', input)} style={styles.inputDivider} />
                    <Password label="Password" ref={setPasswordRef} placeholder="(min 6 characters a-z and 1-9)" onChangeText={input => onChangeText('password', input)} style={styles.inputDivider} />
                    <TextInput label="City" ref={setCityRef} onChangeText={input => onChangeText('city', input)} style={styles.inputDivider} />
                    <TextInput label="Address" ref={setStreetRef} placeholder="Street" onChangeText={input => onChangeText('street', input)} style={styles.inputDivider} />
                    <View style={styles.inlineContainer}>
                        <TextInput label="Unit number" ref={setUnitNumberRef} onChangeText={input => onChangeText('number', input)} style={styles.inlineInput} />
                        <View style={styles.betweenInlineInputs}></View>
                        <TextInput label="Zip Code" ref={setZipcodeRef} onChangeText={input => onChangeText('zipcode', input)} style={styles.inlineInput} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <CheckBox style={styles.checkbox} xxsmall onValueChange={onCheckBoxValueChange}>I have read and agree with the Terms of use</CheckBox>
                </View>
                <View style={styles.registerSection}>
                    <Button style={(isChecked) ? styles.signupButton : styles.signupButtonDisabled} disabled={!isChecked} caption="Sign up" onPress={signup} />
                    <Button style={styles.backButton} caption="Back" onPress={goBack} />
                </View>
            </ScrollView>
        </Content>
        {isRequesting && <Loading />}
    </Container>

export default AmsContent;
