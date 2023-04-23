import { Badge, Table, Text } from '@mantine/core';
import React from 'react';
import { type PlayerWithMatches } from '~/types/score.types';
import { getPlayerScore } from '~/utils/scoreCalculations';

type StandingsTableProps = {
  players: PlayerWithMatches[];
};

export const StandingsTable: React.FC<StandingsTableProps> = ({ players }) => {
  const getBadgeColor = (score: number) => {
    switch (Math.sign(score)) {
      case 1:
        return 'teal.5';
      case -1:
        return 'red.5';
      default:
        return 'yellow.5';
    }
  };

  const rows = players.map((player, index) => {
    const {
      goalsScored,
      goalsScoredAgainst,
      regularWins,
      otWins,
      regularLosses,
      otLosses,
    } = getPlayerScore(player);
    return (
      <tr key={`table_row_for_${player.id}`}>
        <td>{index + 1}</td>
        <td>
          {player.firstName} {player.lastName}
        </td>
        <td>
          {regularWins}-{otWins}-{otLosses}-{regularLosses}
        </td>
        <td>
          {goalsScored}-{goalsScoredAgainst}
        </td>
        <td>
          <Text fw={700}>{player.mmr}</Text>
        </td>
        <td style={{ textAlign: 'center' }}>
          <Badge color={getBadgeColor(player.streak)}>{player.streak}</Badge>
        </td>
      </tr>
    );
  });

  return (
    <Table horizontalSpacing="xl" striped>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>W/OTW/OTL/L</th>
          <th>Score</th>
          <th>MMR</th>
          <th style={{ textAlign: 'center' }}>Streak</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
