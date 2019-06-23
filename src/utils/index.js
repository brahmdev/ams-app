
export function actionWith(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction.callAPI;
  return finalAction;
}
