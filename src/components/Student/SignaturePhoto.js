import React, {Component} from 'react';
import {StyleSheet, Button, View, Image, ScrollView} from 'react-native';
import Signature from 'react-native-signature-canvas';
import {ImagePicker, Permissions, Constants} from 'expo';

class SignaturePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: null
    };
  };

  handleSignature = signature => {
    this.setState({signature}, () => {
      this.props.onSignChange(this.state.signature);
    });
  };

  render() {
    const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
    let {avatar} = this.state;
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <View
            style={styles.preview
            }>
            {
              this.state.signature ? (
                <Image
                  resizeMode={"contain"}
                  style={{width: 335, height: 114}}
                  source={{uri: this.state.signature}}
                />
              ) : null
            }
          </View>
          <Signature
            onOK={this.handleSignature
            }
            descriptionText="Sign"
            clearText="Clear"
            confirmText="Save"
            webStyle={style}
          />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});

export default SignaturePhoto;