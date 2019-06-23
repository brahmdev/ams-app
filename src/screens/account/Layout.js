import React from 'react';
import { View } from "react-native";
import { Container, Content, Button, Text } from "../../components";
import styles from "./style";

const Layout = ({ userName, signOutAccount }) =>
    <Container>
        <Content>
            <View style={styles.registerSection}>
                <Text style={styles.warningTextTitle}>Signing out?!</Text>
                <Text style={styles.warningTextSubtitle}>Do you really want to sign out the {userName} account?!</Text>
                <Button style={styles.deleteButton} caption="Sign out account" onPress={signOutAccount} />
            </View>
        </Content>
    </Container>

export default Layout;
