import { ToastAndroid } from 'react-native';

const _showError = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}

const _showSuccess = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}

export default Toast = {
    showSuccess: _showSuccess,
    showError: _showError
}
