import { StyleSheet } from 'react-native';

import { getScreenWidth } from './utils';

const styles = StyleSheet.create({
    container: {
        width: getScreenWidth(),
    },
    hiddenTextInput: {
        width: 1,
        height: 1,
        backgroundColor: 'transparent',
    },
});

export default styles;
