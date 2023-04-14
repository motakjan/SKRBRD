import { Center, Navbar, Stack } from '@mantine/core';

import { UserButton, useClerk, useUser } from '@clerk/nextjs';
import {
  IconCalendarDue,
  IconHome2,
  IconLogin,
  IconSwitchHorizontal,
  IconTimeline,
  IconTrophy,
  IconUsers,
} from '@tabler/icons-react';
import Image from 'next/image';
import type { NavLinkType } from '../Layout.types';
import { NavbarLink } from './NavbarLink';

const slug = 'asdhuasdasd4as5d45as4d5as4d5a';

const navLinks: NavLinkType[] = [
  { icon: IconHome2, label: 'Home', href: `/` },
  { icon: IconTimeline, label: 'League', href: `/league/${slug}` },
  { icon: IconUsers, label: 'Players', href: `/players/${slug}` },
  { icon: IconCalendarDue, label: 'Match history', href: `/history/${slug}` },
  { icon: IconTrophy, label: 'Tournaments', href: `/tournaments/${slug}` },
];

export function NavbarMinimal() {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const links = navLinks.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === 2} />
  ));

  return (
    <Navbar
      width={{ base: 60 }}
      p="sm"
      sx={theme => ({
        minHeight: '100vh',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.white,
      })}
      zIndex={133}
      height="initial"
    >
      <Center mt={24}>
        <Image
          src="/images/logo.svg"
          width={36}
          height={36}
          alt="site-logo"
          loading="eager"
        />
      </Center>

      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconSwitchHorizontal}
            label="Change account"
            href="/"
          />
          {isSignedIn ? (
            <Center>
              <UserButton />
            </Center>
          ) : (
            <NavbarLink icon={IconLogin} label="Log in" onClick={openSignIn} />
          )}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
