import { Link, type ExternalPathString } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: ExternalPathString };

// Funkcja sprawdzająca, czy URL jest poprawnym linkiem zewnętrznym
const isValidExternalLink = (url: string): url is ExternalPathString => {
  return /^https?:\/\//.test(url); // Sprawdza, czy URL zaczyna się od "http://" lub "https://"
};

export function ExternalLink({ href, ...rest }: Props) {
  if (!isValidExternalLink(href)) {
    console.error(`Invalid external link: ${href}`);
    return null; // Zwracamy `null`, jeśli `href` nie jest poprawnym linkiem
  }
  
  return (
    <Link
      target="_blank"
      {...rest}
      // href={href}
      href={href as ExternalPathString}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }

      }}
    />
  );
}
