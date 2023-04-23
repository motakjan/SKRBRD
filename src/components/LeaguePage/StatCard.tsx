import { Paper, Text, Title } from '@mantine/core';
import React from 'react';
import type { LeagueStats } from '~/utils/leaguePlayerStats';

type StatCardProps = {
  stat: LeagueStats;
};

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <Paper
      key={stat.name}
      sx={theme => ({
        background:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        width: '10rem',
        padding: '1rem',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      <Text fz="sm">{stat.name}</Text>
      <Title order={1} color="white">
        {stat.stat}
      </Title>
      <Text fz="sm">
        {stat.player?.firstName} {stat.player?.lastName}
      </Text>
    </Paper>
  );
};