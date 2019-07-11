import EStyleSheet from "react-native-extended-stylesheet";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const screenStyle = EStyleSheet.create({
  pageTitleSection: {
    width: '100%',
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  pageTitleText: {},
  inputDivider: {
    paddingTop: "8rem"
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  registerSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5rem",
    paddingBottom: "10rem"
  },
  deleteButton: {
    justifyContent: 'center',
    marginTop: "20rem",
    backgroundColor: '#ff2828'
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: "15rem"
  },
  radio: {
    width: '100%',
    paddingTop: "15rem"
  },
  radioLabels: {
    //paddingLeft: wp('6%'),
  },
  icon: {
    fontSize: 30,
  },
  addPaymentButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 4,
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  actionButton: {
    padding: 8,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  addFeesPaymentText: {
    fontSize: 18,
    color: "#00ab66"
  },
  actionButtonSave: {
    color: '#3b5998',
  },
  actionButtonClose: {
    color: '#FF3860',
  }
});

export default screenStyle;
