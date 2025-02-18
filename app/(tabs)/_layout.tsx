// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import HeaderActions from "@/components/HeaderActions";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "@/contexts/ThemeContext";
import { darkTheme } from "@/styles/theme";

export default function TabLayout() {
    // const colorScheme = useColorScheme();
    const { theme } = useTheme();
    const isDarkTheme = theme === darkTheme;

    useEffect(() => {
        StatusBar.setBarStyle(isDarkTheme ? "light-content" : "dark-content");
    }, [isDarkTheme]);

    return (
        <>
            {/* <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} /> */}
            <StatusBar
                barStyle={isDarkTheme ? "light-content" : "dark-content"}
                backgroundColor={theme.colors.bgPrimary}
            />
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.accent,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                headerShown: true,
                headerRight: () => <HeaderActions />,
                tabBarButton: HapticTab,
                tabBarBackground: () => {
                    const Background = TabBarBackground ?? (() => <></>);
                    return (
                        <Background style={{ backgroundColor: theme.colors.bgSecondary }} />
                    );
                },
                tabBarStyle: Platform.select({
                    ios: {
                    // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                        backgroundColor: theme.colors.bgSecondary,
                    },
                    default: {
                        backgroundColor: theme.colors.bgSecondary,
                    },                
                }),
                tabBarLabelStyle: {
                    color: theme.colors.textSecondary,
                },
                headerStyle: {
                    backgroundColor: theme.colors.bgPrimary,
                },
                headerTitleStyle: {
                    color: isDarkTheme ? theme.colors.colWhite : theme.colors.colDarkNavy,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cards"
                options={{
                    title: "Cards",
                    tabBarIcon: ({ color }) => (
                    <IconSymbol size={28} name="paperplane.fill" color={color} />
                ),
                }}
            />
            <Tabs.Screen
                name="gameroom"
                options={{
                    title: "Gameroom",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="chevron.right" color={color} />
                    ),
                }}
            />
        </Tabs>
    </>
    );
}