// src/styles/theme.ts
export const theme = {
    colors: {
        colWhite: "#f8f9fa",
        colDarkNavy: "#0a1f44",
        colDarkBlue: "#162e5c",
        colOrange: "#c87533",
        colBrightBrown: "#a14d26",
        colChickenComb: "#db2323",
        colLightGray: "#d3d3d3",
        colDarkGray: "#a9a9a9",
        colRichPewter: "#6a6f70",
        colJacarandaLight: "#a7acb9",
        colCrowBlack: "#263348",
        colGrannySmith: "#7c9c9a",
        colPickledBluewood: "#253943",
        colMilkPunch: "#fff5d6",
        colTallow: "#a8a28a",
        colTeak: "#b38b6d",
        colAvocado: "#8f9b69",
        colTan: "#d4aa8a",
        colIvory: "#FFFFF0",
        colGainsboro: "#DCDCDC",
        colCharcoal: "#36454F",
        colSlateGray: "#708090"
    },
    headerHeight: "70px",
        breakpoints: {
        mobile: "768px",
        tabletS: "900px",
        tabletL: "1200px"
    },
    media: {
        mobile: `(max-width: 767px)`,
        tabletS: `(min-width: 768px) and (max-width: 899px)`,
        tabletL: `(min-width: 900px)`,
        mobileAndTabletS: `(max-width: 899px)`,
        tabletSAndL: `(min-width: 900px)`
    },
    spacing: {
        mobilePadding: "5px",
        tabletSPadding: "10px",
        tabletLPadding: "0px"
    }
};
    
export const lightTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        bgPrimary: theme.colors.colMilkPunch,
        bgSecondary: theme.colors.colLightGray,
        textPrimary: theme.colors.colPickledBluewood,
        textSecondary: theme.colors.colDarkBlue,
        accent: theme.colors.colGrannySmith,
        hover: theme.colors.colGrannySmith,
        hoverButton: theme.colors.colAvocado,
        distinction: theme.colors.colGrannySmith,
        inputBackground: theme.colors.colIvory,
        inputBorder: theme.colors.colGainsboro,
    }
};
    
export const darkTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        bgPrimary: theme.colors.colPickledBluewood,
        bgSecondary: theme.colors.colCrowBlack,
        textPrimary: theme.colors.colMilkPunch,
        textSecondary: theme.colors.colGrannySmith,
        accent: theme.colors.colTeak,
        hover: theme.colors.colTallow,
        hoverButton: theme.colors.colAvocado,
        distinction: theme.colors.colGrannySmith,
        inputBackground: theme.colors.colCharcoal,
        inputBorder: theme.colors.colSlateGray
    }
};
