import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { MantineProvider } from '@mantine/core';
import '~/styles/globals.css';
import { Layout } from '../components/Layout/Layout';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Mulish, sans-serif',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ClerkProvider
        {...pageProps}
        appearance={{
          baseTheme: dark,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
