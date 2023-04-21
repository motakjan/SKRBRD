import { Paper, Text, Title } from '@mantine/core';
import React from 'react';

type Stats = {
  name: string;
  playerName: string;
  score: string;
};

type StatCardProps = {
  stat: Stats;
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
      })}
    >
      <Text fz="sm">{stat.name}</Text>
      <Title order={1} color="white">
        {stat.score}
      </Title>
      <Text fz="sm">{stat.playerName}</Text>
    </Paper>
  );
};
