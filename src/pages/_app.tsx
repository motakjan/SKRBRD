import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import {
  ColorSchemeProvider,
  MantineProvider,
  type ColorScheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '~/styles/globals.css';
import { Layout } from '../components/Layout/Layout';

const MyApp: AppType = ({ Component, pageProps }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: 'Outfit, sans-serif',
          loader: 'bars',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ClerkProvider
          {...pageProps}
          appearance={{
            baseTheme: colorScheme === 'dark' ? dark : undefined,
          }}
        >
          <ModalsProvider>
            <Layout>
              <>
                <Notifications />
                <Component {...pageProps} />
              </>
            </Layout>
          </ModalsProvider>
        </ClerkProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default api.withTRPC(MyApp);
