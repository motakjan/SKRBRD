/* eslint-disable @typescript-eslint/unbound-method */
import {
  Center,
  Divider,
  Navbar,
  Stack,
  useMantineColorScheme,
} from '@mantine/core';

import { UserButton, useClerk, useUser } from '@clerk/nextjs';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendarDue,
  IconHome2,
  IconLogin,
  IconPlaylistAdd,
  IconTerminal2,
  IconTimeline,
  IconTrophy,
  IconUsers,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IconButton } from '~/components/UI/IconButton';
import { useLeagueMutations } from '~/hooks/mutations/useLeagueMutations';
import type { NavLinkType } from '../Layout.types';
import { LeagueModal } from '../LeagueModal/LeagueModal';
import { type LeagueFormValues } from '../LeagueModal/LeagueModal.types';
import { LeaguePopover } from './LeaguePopover/LeaguePopover';
import { NavbarLink } from './NavbarLink';

const basicLinks: NavLinkType[] = [
  { icon: IconHome2, label: 'Home', href: `/`, active: false },
];

type NavbarMinimalProps = {
  hasLeague: boolean;
};

export const NavbarMinimal: React.FC<NavbarMinimalProps> = ({ hasLeague }) => {
  const { toggleColorScheme } = useMantineColorScheme();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const { createLeague } = useLeagueMutations(close);
  const router = useRouter();
  const leagueId = router.query.leagueId as string;

  const baseLinks = basicLinks.map(link => (
    <NavbarLink {...link} key={link.label} />
  ));

  useEffect(() => {
    close();
  }, [router.pathname, close]);

  const tournamentLinks: NavLinkType[] = [
    {
      icon: IconTimeline,
      label: 'League',
      href: `/league/${leagueId}`,
    },
    {
      icon: IconUsers,
      label: 'Players',
      href: `/players/${leagueId}`,
    },
    {
      icon: IconCalendarDue,
      label: 'Match history',
      href: `/history/${leagueId}`,
    },
    {
      icon: IconTrophy,
      label: 'Tournaments',
      href: `/tournaments/${leagueId}`,
    },
  ];

  const isActive = (href: string) => {
    const regex = new RegExp(`^${href}(\\/|$)`, 'i');
    return router.asPath.match(regex) ? true : false;
  };

  const tourneyLinks =
    hasLeague &&
    tournamentLinks.map(link => (
      <NavbarLink {...link} key={link.label} active={isActive(link.href)} />
    ));

  const handleCreateLeague = (leagueData: LeagueFormValues) => {
    createLeague.mutate(leagueData);
  };

  return (
    <Navbar
      width={{ base: 60 }}
      p="sm"
      sx={theme => ({
        minHeight: '100vh',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[0],
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
        <Stack justify="center" align="center" spacing={0}>
          {baseLinks}
          <IconButton
            icon={<IconPlaylistAdd size="1.2rem" stroke={1.5} />}
            onClick={open}
          />
          <LeaguePopover />
          <Divider my="sm" sx={{ width: '100%' }} />
          {tourneyLinks}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconTerminal2}
            label="Open console"
            href="/"
            onClick={() => toggleColorScheme()}
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
      <LeagueModal
        opened={opened}
        close={close}
        handleSubmit={handleCreateLeague}
        title="Create league"
      />
    </Navbar>
  );
};
