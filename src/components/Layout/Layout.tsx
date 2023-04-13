import { Box, Flex } from '@mantine/core';
import React from 'react';
import type { LayoutProps } from './Layout.types';
import { NavbarMinimal } from './Navbar/Navbar';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex>
      <NavbarMinimal />
      <Box
        sx={theme => ({
          width: '100%',
          padding: '2rem',
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.white,
        })}
      >
        {children}
      </Box>
    </Flex>
  );
};
