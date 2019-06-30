import React, {Component} from 'react';
import {KeyboardView} from "../../components/KeyboardView";
import { View, Text } from 'native-base';
import NavigationService from "../../navigation/Navigation-Service";
import AddStudentHeader from "./AddStudentHeader";
import Stepper from 'react-native-js-stepper'
import { StyleSheet } from 'react-native'

class AddStudentScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <AddStudentHeader goBack={() => NavigationService.goBack()}/>,
    };
  };

  componentDidMount() {

  };

  render() {
    return (
      <Stepper
        ref={(ref: any) => {
          this.stepper = ref
        }}
        validation={false}
        activeDotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        showTopStepper={true}
        showBottomStepper={true}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
        backButtonTitle="BACK"
        nextButtonTitle="NEXT"
        activeStepStyle={styles.activeStep}
        inactiveStepStyle={styles.inactiveStep}
        activeStepTitleStyle={styles.activeStepTitle}
        inactiveStepTitleStyle={styles.inactiveStepTitle}
        activeStepNumberStyle={styles.activeStepNumber}
        inactiveStepNumberStyle={styles.inactiveStepNumber}>
        <View>
          <Text>First Step</Text>
        </View>
        <View>
          <Text>Second Step</Text>
        </View>
        <View/>
        <View/>
      </Stepper>
    );
  }
}

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: 'grey'
  },
  inactiveDot: {
    backgroundColor: '#ededed'
  },
  activeStep: {
    backgroundColor: 'grey'
  },
  inactiveStep: {
    backgroundColor: '#ededed'
  },
  activeStepTitle: {
    fontWeight: 'bold'
  },
  inactiveStepTitle: {
    fontWeight: 'normal'
  },
  activeStepNumber: {
    color: 'white'
  },
  inactiveStepNumber: {
    color: 'black'
  }
})

export default AddStudentScreen;