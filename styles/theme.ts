    // src/styles/theme.ts
    export const theme = {
        colors: {
        textWhite: "#f8f9fa",
        textDarkNavy: "#0a1f44",
        textDarkBlue: "#162e5c",
        textOrange: "#c87533",
        textBrightBrown: "#a14d26",
        textChickenComb: "#db2323",
        bgWhite: "#f8f9fa",
        bgLightGray: "#d3d3d3",
        bgDarkGray: "#a9a9a9",
        bgRichPewter: "#6a6f70",
        bgDarkNavy: "#0a1f44",
        bgJacarandaLight: "#a7acb9",
        bgCrowBlack: "#263348",
        bgOrange: "#c87533",
        bgBrightBrown: "#a14d26",
        colGrannySmith: "#7c9c9a",
        colPickledBluewood: "#253943",
        colMilkPunch: "#fff5d6",
        colTallow: "#a8a28a",
        colTeak: "#b38b6d",
        colAvocado: "#8f9b69"
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
        bgSecondary: theme.colors.bgJacarandaLight,
        textPrimary: theme.colors.colPickledBluewood,
        textSecondary: theme.colors.textDarkBlue,
        accent: theme.colors.colGrannySmith,
        hover: theme.colors.colGrannySmith,
        hoverButton: theme.colors.colAvocado,
        distinction: theme.colors.colGrannySmith
        }
    };
    
    export const darkTheme = {
        ...theme,
        colors: {
        ...theme.colors,
        bgPrimary: theme.colors.colPickledBluewood,
        bgSecondary: theme.colors.bgDarkNavy,
        textPrimary: theme.colors.colMilkPunch,
        textSecondary: theme.colors.colGrannySmith,
        accent: theme.colors.colTeak,
        hover: theme.colors.colTallow,
        hoverButton: theme.colors.colAvocado,
        distinction: theme.colors.colGrannySmith
        }
    };
    