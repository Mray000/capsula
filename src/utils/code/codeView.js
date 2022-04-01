import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {Colors, Constants, getScreenWidth} from './utils';
import {Shadow} from 'react-native-shadow-2';


const styles = StyleSheet.create({
    defaultContainerStyle: {
        width: getScreenWidth(),
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    defaultCodeViewStyle: {
        marginRight: 10,
        borderWidth: Constants.codeViewBorderWidth,
        borderColor: Colors.codeViewBorderColor,
        borderRadius: Constants.codeViewBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultCodeStyle: {
        color: Colors.codeColor,
        fontSize: Constants.codeFontSize,
        backgroundColor: 'transparent',
    },
    defaultCoverStyle: {
        position: 'absolute',
        width: Constants.codeFontSize * 1.15,
        height: Constants.codeFontSize * 1.15,
        borderRadius: (Constants.codeFontSize * 1.15) / 2,
        backgroundColor: 'transparent',
    },
    shadow_container: {
    },
});

const CodeView = (props) => {
    const {
        focused,
        codeArray,
        coverBGColorList,
        gapWidth,

        containerStyle,
        containerPaddingVertical,
        containerPaddingTop,
        containerPaddingBottom,
        containerPaddingHorizontal,
        containerPaddingLeft,
        containerPaddingRight,
        containerBackgroundColor,

        codeViewStyle,
        codeViewWidth,
        codeViewHeight,
        codeViewBackgroundColor,
        codeViewBorderWidth,
        codeViewBorderColor,
        codeViewBorderRadius,
        focusedCodeViewBorderColor,

        codeStyle,
        codeFontSize,
        codeColor,

        secureTextEntry,
        coverStyle,
        coverRadius,
    } = props;

    const foucsedIndex = codeArray?.filter(item => item !== '').length;

    const cPaddingVertical = containerPaddingVertical ? {paddingVertical: containerPaddingVertical} : {};
    const cPaddingTop = containerPaddingTop ? {paddingTop: containerPaddingTop} : {};
    const cPaddingBottom = containerPaddingBottom ? {paddingBottom: containerPaddingBottom} : {};
    const cPaddingHorizontal = containerPaddingHorizontal ? {paddingHorizontal: containerPaddingHorizontal} : {};
    const cPaddingLeft = containerPaddingLeft ? {paddingLeft: containerPaddingLeft} : {};
    const cPaddingRight = containerPaddingRight ? {paddingRight: containerPaddingRight} : {};
    const cBackgroundColor = containerBackgroundColor ? {backgroundColor: containerBackgroundColor} : {};

    return (
        <View style={[
            styles.defaultContainerStyle,
            containerStyle,
            {
                ...cPaddingVertical,
                ...cPaddingTop,
                ...cPaddingBottom,
                ...cPaddingHorizontal,
                ...cPaddingLeft,
                ...cPaddingRight,
                ...cBackgroundColor,
            },
        ]}
        >
            {
                codeArray?.map((code, index) => {
                    const marginLeft = index === 0 ? 0 : gapWidth;
                    const marginRight = 0;

                    // code view style
                    const viewWidth = codeViewWidth ? {width: codeViewWidth} : {};
                    const viewHight = codeViewHeight ? {height: codeViewHeight} : {height: codeViewWidth};
                    const viewBackgroundColor = codeViewBackgroundColor ? {backgroundColor: codeViewBackgroundColor} : {};
                    const viewBorderWidth = codeViewBorderWidth ? {borderWidth: codeViewBorderWidth} : {};
                    const viewBorderRadius = codeViewBorderRadius ? {borderRadius: codeViewBorderRadius} : {};
                    const viewBorderColor = codeViewBorderColor ? {borderColor: codeViewBorderColor} : {};
                    const focusedViewBorderColor = focusedCodeViewBorderColor ? {borderColor: focusedCodeViewBorderColor} : {};
                    const vbColor = (foucsedIndex === index && focused) ? focusedViewBorderColor : viewBorderColor;

                    // code style
                    const cFontSize = codeFontSize ? {fontSize: codeFontSize} : {};
                    const cColor = codeColor ? {color: codeColor} : {};

                    // cover style
                    const cvWidth = coverRadius ? {width: 2 * coverRadius} : {};
                    const cvHeight = coverRadius ? {height: 2 * coverRadius} : {};
                    const cvBorderRadius = coverRadius ? {borderRadius: coverRadius} : {};
                    const box_shadow =
                        code ? styles.box_shadow_1 : styles.box_shadow_2;

                    return (
                        <Shadow
                            startColor={'#00000008'}
                            finalColor={'#00000001'}
                            offset={[0, 8]}
                            distance={20}
                            containerViewStyle={styles.shadow_container}>
                            <View
                                key={index}
                                style={[
                                    styles.defaultCodeViewStyle,
                                    codeViewStyle,
                                    {
                                        ...viewWidth,
                                        ...viewHight,
                                        marginLeft,
                                        marginRight,
                                        ...viewBackgroundColor,
                                        ...viewBorderWidth,
                                        ...viewBorderRadius,
                                        ...vbColor,
                                    },
                                    code && {
                                        backgroundColor: 'white',
                                    },
                                    foucsedIndex === index && {
                                        backgroundColor: 'white',
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.defaultCodeStyle,
                                        codeStyle,
                                        {
                                            ...cFontSize,
                                            ...cColor,
                                        },
                                    ]}
                                >
                                    {code}
                                </Text>
                                {
                                    secureTextEntry && <View style={[
                                        styles.defaultCoverStyle,
                                        coverStyle,
                                        {
                                            ...cvWidth,
                                            ...cvHeight,
                                            ...cvBorderRadius,
                                            backgroundColor: coverBGColorList[index],
                                        },
                                    ]}
                                    />
                                }
                            </View>
                        </Shadow>
                    );
                })
            }
        </View>

    );
};

export default CodeView;
