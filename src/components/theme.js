import { Dimensions, PixelRatio } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

const scale = SCREEN_WIDTH / 375;
const scaleHeight = SCREEN_HEIGHT / 812;

export const normalize = (size, forHeight = false) => {
    const newSize = size * (forHeight ? scaleHeight : scale);
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};