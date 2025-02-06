// styles/theme.types.ts
export type ThemeColors = {
    textWhite: string;
    textDarkNavy: string;
    textDarkBlue: string;
    textOrange: string;
    textBrightBrown: string;
    textChickenComb: string;
    bgWhite: string;
    bgLightGray: string;
    bgDarkGray: string;
    bgRichPewter: string;
    bgDarkNavy: string;
    bgJacarandaLight: string;
    bgCrowBlack: string;
    bgOrange: string;
    bgBrightBrown: string;
    colGrannySmith: string;
    colPickledBluewood: string;
    colMilkPunch: string;
    colTallow: string;
    colTeak: string;
    colAvocado: string;
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
        tablet: string;
        desktop: string;
    };
    media: {
        mobile: string;
        tablet: string;
        desktop: string;
        mobileAndTablet: string;
        tabletAndDesktop: string;
    };
    spacing: {
        mobilePadding: string;
        tabletPadding: string;
        desktopPadding: string;
    };
};
