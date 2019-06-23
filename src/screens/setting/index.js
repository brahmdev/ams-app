import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Toast } from '../../components';
import { deleteUser } from "../../actions/User-Account-Delete-Action";
import Layout from "./Layout";

class SettingScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return Header({
            navigation,
            title: 'Delete the user account'
        });
    }

    _deleteAccount = () => {
        let { user, onGoBack } = this.props.screenProps;
        this.props.deleteUser(user.id)
            .then(()=> {                
                Toast.showSuccess("Successfully deleted");
                this.props.navigation.popToTop();
            })
            .catch(error => Toast.showError(error.message || error));
    }

    render() {
        let { user } = this.props.screenProps;
        return (
            <Layout user={user} deleteAccount={this._deleteAccount} />
        );
    }
}

export default connect(null, { deleteUser })(SettingScreen);
