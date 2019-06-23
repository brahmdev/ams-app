import React from 'react';
import { View } from 'react-native';
import styles from "./style";
import { Loading, TextInput, Password, Button, Text, Container, Content } from "../../components";

const Layout = ({ isRequesting, setUsernameRef, setPasswordRef, signin, signup, onChangeText }) =>
    <Container>
        <Content>
            <View style={styles.pageTitleSection}>
                <Text large style={styles.pageTitleText}>Login</Text>
            </View>
            <View style={styles.form}>
                <TextInput label="Username" ref={setUsernameRef} onChangeText={input => onChangeText('username', input)} style={styles.inputDivider} />
                <Password label="Password" ref={setPasswordRef} onChangeText={input => onChangeText('password', input)} style={styles.inputDivider} />
                <Button caption="Login" onPress={signin} style={styles.loginButton} />
            </View>
            <View style={styles.footer}>
            </View>
        </Content>
        {isRequesting && <Loading />}
    </Container>

export default Layout;
