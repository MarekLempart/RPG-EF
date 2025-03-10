// hooks/useFetchCurrentUser.ts
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { RootState } from "@/store";
import { setUser } from "@/store/slices/userSlice";
import { useTranslation } from "react-i18next";

export const useFetchCurrentUser = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user);

    const fetchCurrentUser = async (): Promise<void> => {
        if (!user.token) return;
        try {
            const response = await axios.get("https://rpg-app-backend.onrender.com/api/auth/current", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const userData = response.data.user;
            dispatch(
                setUser({
                    id: userData._id || userData.userId,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    role: userData.role,
                    avatar: userData.avatar,
                    token: user.token,
                })
            );
        } catch (error) {
            const err = error as AxiosError;
            console.error("Error fetching user data", err.response?.data || err.message);
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("Failed to load user data"),
            });
        }
    };

    return { fetchCurrentUser };
};
