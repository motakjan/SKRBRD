import { SignInButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Box, Flex } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';
import { Loading } from '../UI/Loading';
import type { LayoutProps } from './Layout.types';
import { NavbarMinimal } from './Navbar/Navbar';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoaded } = useUser();
  const router = useRouter();

  return (
    <Flex>
      {!isLoaded && <Loading />}
      <SignedIn>
        <NavbarMinimal hasLeague={router.pathname.includes('[leagueId]')} />
        <Box
          sx={theme => ({
            width: '100%',
            padding: '2rem',
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.white,
          })}
        >
          {children}
        </Box>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </Flex>
  );
};
