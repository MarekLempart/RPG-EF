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
    colIvory: string;
    colGainsboro: string;
    colCharcoal: string;
    colSlateGray: string;
    colHippieGreen: string;
    colMossGreen: string;
    colZanah: string;
    colLynch: string;
    colPoloBlue: string;
    colHeather: string;
    colAuChico: string;
    colJaponica: string;
    colColdTurkey: string;
    // Nowe kolory
    colMossGreen2: string;
    colRegentStBlue: string;
    colShilo: string;
    colOlivine: string;
    colPoloBlue2: string;
    colPuce: string;
};

export type ThemeType = {
    colors: ThemeColors & {
        bgPrimary: string;
        bgSecondary: string;
        textPrimary: string;
        textSecondary: string;
        accent: string;
        hover: string;
        hoverButton: string;
        distinction: string;
        inputBackground: string;
        inputBorder: string;
        diceFeature: string;
        diceFeatureSelected: string;
        diceAbility: string;
        diceAbilitySelected: string;
        diceItem: string;
        diceItemSelected: string;
        colDiceFeatureUnselected: string;
        colDiceAbilityUnselected: string;
        colDiceItemUnselected: string;
        colDiceContainerAttribute: string;
        colDiceContainerSkill: string;
        colDiceContainerItem: string;
        button: string;
        activeButton: string;
        textOnButton: string;
        shadowColor: string;
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
