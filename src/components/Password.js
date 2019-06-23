import React from 'react';
import TextInput from "./Text-Input";

const Password = React.forwardRef((props, ref) => (
    <TextInput secureTextEntry={true} password={true} {...props} ref={ref} />
));

export default Password;