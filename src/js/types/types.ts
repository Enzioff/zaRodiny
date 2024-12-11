import gsap from "gsap";

export enum animateType {
    HIDE = 'HIDE',
    VISIBLE = 'VISIBLE',
    LOGO_BLUE = 'LOGO_BLUE',
    LOGO_WHITE = 'LOGO_WHITE'
}

export enum logoVisibility {
    VISIBLE = 'VISIBLE',
    HIDE = 'HIDE',
}

export enum breakPointsValues {
    DESKTOP = 1440,
    TABLET_MAX = 1439,
    TABLET = 768,
    MOBILE_MAX = 767,
    MOBILE = 360
}

export interface breakPoints {
    desktop: breakPointsValues.DESKTOP,
    tabletMax: breakPointsValues.TABLET_MAX,
    tablet: breakPointsValues.TABLET,
    mobileMax: breakPointsValues.MOBILE_MAX,
    mobile: breakPointsValues.MOBILE,
}

export interface AnimationProperties {
    x: number;
    y: number;
    scale: number;
    duration: number;
    opacity: number;
    zIndex?: number;
}

export interface PopupsAnimation {
    [key: string]: AnimationProperties;
}

export interface AnimationClassList {
    [key: string]: AnimationClassConfig
}

export interface AnimationClassConfig {
    headerIsFixed: boolean,
}

export interface LoadDataType {
    title: string,
    size: string,
}

export type TemplateType = () => string;
