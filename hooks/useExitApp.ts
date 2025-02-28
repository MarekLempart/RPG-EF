// hooks/useExitApp.ts
import { useDispatch, useSelector } from "react-redux";
import { Alert, BackHandler, Platform } from "react-native";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { logout } from "@/store/slices/userSlice";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

export const useExitApp = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);

    const exitApp = async (): Promise<void> => {
        Alert.alert(
            t("exit_app_title"),
            t("exit_app_message"),
            [
                {
                    text: t("cancel"),
                    style: "cancel",
                },
                {
                    text: t("confirm"),
                    onPress: async () => {
                        if (user.token) {
                            try {
                                await axios.post("http://localhost:5100/api/auth/logout", null, {
                                    headers: { Authorization: `Bearer ${user.token}` },
                                });
                                dispatch(logout());
                            } catch (error) {
                                const err = error as AxiosError;
                                console.error("Error during exit logout:", err.response?.data || err.message);
                                Toast.show({
                                    type: "error",
                                    text1: t("logout_error"),
                                    text2: (err.response?.data as { message?: string })?.message || t("logout_error_message"),
                                });
                            }
                        }
                        if (Platform.OS === "android") {
                            BackHandler.exitApp();
                        } else if (Platform.OS === "ios") {
                            router.replace("/logged-out");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return { exitApp };
};
