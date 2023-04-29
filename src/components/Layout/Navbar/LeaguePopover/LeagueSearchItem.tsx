import { Text } from '@mantine/core';
import { type League } from '@prisma/client';
import { IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

type LeagueItemProps = {
  league: League;
};

export const LeagueSearchItem: React.FC<LeagueItemProps> = ({ league }) => {
  return (
    <Link
      key={`league_${league.id}`}
      href={`/league/${league.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Text
        fz="xs"
        sx={theme => ({
          width: '100%',
          cursor: 'pointer',
          padding: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: league.isPrivate ? theme.colors.dark[3] : theme.colors.dark[1],
          borderRadius: '4px',
          '&:hover': {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
          },
        })}
      >
        {league.name}
        {league.isPrivate && <IconLock size="1rem" />}
      </Text>
    </Link>
  );
};
