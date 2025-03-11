// hooks/useLogout.ts
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { logout } from "@/store/slices/userSlice";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";

export const useLogout = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = async (): Promise<void> => {
        try {
            await axios.post("https://rpg-app-backend.onrender.com/api/auth/logout", null, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            dispatch(logout());
            router.replace("/");
            Toast.show({
                type: "success",
                text1: t("success"),
                text2: t("Logged out successfully"),
            });
        } catch (error) {
            const err = error as AxiosError;
            console.error("Logout error:", err.response?.data || err.message);
            Toast.show({
                type: "error",
                text1: t("logout_error"),
                text2:
                ((err.response?.data as { message?: string })?.message ||
                    t("Failed to logout")) as string,
            });
        }
    };

    return { handleLogout };
};
