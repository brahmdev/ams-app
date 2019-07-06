import * as React from 'react';
import { Button, Image, View } from 'react-native';
import {ImagePicker, Permissions, Constants} from 'expo';
import {Thumbnail} from "native-base";

export default class Avatar extends React.Component {
  state = {
    avatar: null,
  };

  render() {
    let { avatar } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {<Thumbnail large circular
                    scaleX={2} scaleY={2} style={{margin: 50}}
                    source={{uri: avatar !== null ? avatar : 'https://banner2.kisspng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg'}}/>
        }
        <Button
          title="Pick an avatar"
          onPress={this.pickAvatar}
        />
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  pickAvatar = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    console.log('image taken with result: ', result);

    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
      this.props.onAvatarChange(result.uri)
    }
  };
}