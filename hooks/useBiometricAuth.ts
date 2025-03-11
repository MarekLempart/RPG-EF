// hooks/useBiometricAuth.ts
import * as LocalAuthentication from 'expo-local-authentication';
import { useTranslation } from 'react-i18next';

export const useBiometricAuth = () => {
    const { t } = useTranslation();

    const biometricAuth = async (): Promise<boolean> => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            return false;
        }
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            return false;
        }
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: t('biometric_prompt'),
            cancelLabel: t('cancel'),
        });
        return result.success;
    };

    return { biometricAuth };
};
