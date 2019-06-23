import React, { Component } from 'react';
import TextInput from "./Text-Input";

const Email = React.forwardRef((props, ref) => (
    <TextInput {...props} ref={ref} />
));

export default Email;