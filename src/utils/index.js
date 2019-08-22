import Colors from "../constants/Colors";

export function actionWith(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction.callAPI;
  return finalAction;
}

export const SERVER_BASE_PATH = 'http://www.devarena.in';

export const STANDARD_COLOR = new Map()
  .set(1, Colors.caribbeanGreen)
  .set(2, Colors.purple)
  .set(3, Colors.ferrariRed)
  .set(4, Colors.salmonRed)
  .set(5, Colors.bluishGreen)
  .set(6, Colors.electricBlue)
  .set(7, Colors.webOrange)
  .set(8, Colors.cottonPink)
  .set(9, Colors.violet)
  .set(10, Colors.mauvePink)
  .set(11, Colors.anaklawaBlue)
  .set(12, Colors.bumblebeeYellow);
