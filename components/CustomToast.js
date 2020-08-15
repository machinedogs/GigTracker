import React from 'react';
import Toast from 'react-native-easy-toast';

import Colors from '../constants/Colors';

const CustomToast = React.forwardRef((props, ref) => {
    return (
        <Toast
        ref={ref}
        style={{ backgroundColor: Colors.darkGrey, borderRadius: 5 }}
        position='top'
        positionValue={130}
        fadeInDuration={750}
        fadeOutDuration={1000}
    />
    )
})

export default CustomToast;
