// styles/theme.types.ts
export type ThemeColors = {
    colWhite: string;
    colDarkNavy: string;
    colDarkBlue: string;
    colOrange: string;
    colBrightBrown: string;
    colChickenComb: string;
    colLightGray: string;
    colDarkGray: string;
    colRichPewter: string;
    colJacarandaLight: string;
    colCrowBlack: string;
    colGrannySmith: string;
    colPickledBluewood: string;
    colMilkPunch: string;
    colTallow: string;
    colTeak: string;
    colAvocado: string;
    colTan: string;
    // …oraz dodatkowe kolory, jeśli są potrzebne
};

export type ThemeType = {
    colors: ThemeColors & {
      // Dodatkowe aliasy dla motywu
        bgPrimary: string;
        bgSecondary: string;
        textPrimary: string;
        textSecondary: string;
        accent: string;
        hover: string;
        hoverButton: string;
        distinction: string;
    };
    headerHeight: string;
    breakpoints: {
        mobile: string;
        tabletS: string;
        tabletL: string;
    };
    media: {
        mobile: string;
        tabletS: string;
        tabletL: string;
        mobileAndTabletS: string;
        tabletSAndL: string;
    };
    spacing: {
        mobilePadding: string;
        tabletSPadding: string;
        tabletLPadding: string;
    };
};
