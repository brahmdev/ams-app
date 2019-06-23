import React from 'react';
import { View } from "react-native";
import { Container, Content, Button, Text } from "../../components";
import styles from "./style";

const Layout = ({ user, deleteAccount }) =>
    <Container>
        <Content>
            <View style={styles.registerSection}>
                <Text style={styles.warningTextTitle}>Dangerous zone!!</Text>
                <Text style={styles.warningTextSubtitle}>Do you really want to delete the "{user.name}" account?!</Text>
                <Button style={styles.deleteButton} caption="Delete the account" onPress={deleteAccount} />
            </View>
        </Content>
    </Container>

export default Layout;
