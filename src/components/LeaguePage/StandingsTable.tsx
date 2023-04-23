import { Table, Text } from '@mantine/core';
import React from 'react';
import { type PlayerWithMatches } from '~/types/score.types';
import { getPlayerScore } from '~/utils/scoreCalculations';

type StandingsTableProps = {
  players: PlayerWithMatches[];
};

export const StandingsTable: React.FC<StandingsTableProps> = ({ players }) => {
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
      </tr>
    );
  });

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>W/OTW/OTL/L</th>
          <th>Score</th>
          <th>MMR</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
