import { Dimensions, PixelRatio } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const baseWidth = 350;
const baseHeight = 680;

const scaleWidth = SCREEN_WIDTH / 375;
const scaleHeight = SCREEN_HEIGHT / 812;

const scale = (size) => width / baseWidth * size;
const verticalScale = (size) => height / baseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const normalize = (size, forHeight = false) => {
    const newSize = size * (forHeight ? scaleHeight : scaleWidth);
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { normalize, scale, verticalScale, moderateScale };