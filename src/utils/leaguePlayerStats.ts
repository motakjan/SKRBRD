import { type League, type Match, type Player } from '@prisma/client';
import { type PlayerWithMatches } from '~/types/score.types';
import { getPlayerScore } from './scoreCalculations';

type CompleteLeague = League & {
  players: PlayerWithMatches[];
  matches: (Match & {
    homePlayer: Player;
    awayPlayer: Player;
  })[];
};

export type LeagueStats = {
  player: PlayerWithMatches | null;
  stat: string;
  name: string;
};

type LeagueStatsObj = {
  bestWinratePlayer: PlayerWithMatches | null;
  bestWinrate: number;
  bestAvgGoalsPlayer: PlayerWithMatches | null;
  bestAvgGoals: number;
  bestAvgGoalsAgainstPlayer: PlayerWithMatches | null;
  bestAvgGoalsAgainst: number;
  bestScorePlayer: PlayerWithMatches | null;
  bestScore: number;
  bestWinstreakPlayer: PlayerWithMatches | null;
  bestWinstreak: number;
};

export const getLeagueStats = (league: CompleteLeague) => {
  const stats: LeagueStatsObj = {
    bestWinratePlayer: null,
    bestWinrate: 0,
    bestAvgGoalsPlayer: null,
    bestAvgGoals: 0,
    bestAvgGoalsAgainstPlayer: null,
    bestAvgGoalsAgainst: Infinity,
    bestScorePlayer: null,
    bestScore: -Infinity,
    bestWinstreakPlayer: null,
    bestWinstreak: 0,
  };

  for (const player of league.players) {
    const {
      winrate,
      avgGoalsScored,
      avgGoalsScoredAgainst,
      goalsScored,
      goalsScoredAgainst,
    } = getPlayerScore(player);

    const score = goalsScored - goalsScoredAgainst;
    const matchesPlayed =
      player.matchesAsAwayPlayer.length + player.matchesAsHomePlayer.length;

    if (matchesPlayed < 1) {
      continue;
    }

    if (stats.bestWinstreakPlayer === null) {
      stats.bestWinstreakPlayer = player;
      stats.bestWinstreak = player.streak;
    } else if (player.streak > stats.bestWinstreak) {
      stats.bestWinstreakPlayer = player;
      stats.bestWinstreak = player.streak;
    }

    if (winrate > stats.bestWinrate) {
      stats.bestWinrate = winrate;
      stats.bestWinratePlayer = player;
    }

    if (avgGoalsScored > stats.bestAvgGoals) {
      stats.bestAvgGoals = avgGoalsScored;
      stats.bestAvgGoalsPlayer = player;
    }

    if (avgGoalsScoredAgainst < stats.bestAvgGoalsAgainst) {
      stats.bestAvgGoalsAgainst = avgGoalsScoredAgainst;
      stats.bestAvgGoalsAgainstPlayer = player;
    }

    if (score > stats.bestScore) {
      stats.bestScore = score;
      stats.bestScorePlayer = player;
    }
  }

  if (
    !stats.bestWinratePlayer ||
    !stats.bestScorePlayer ||
    !stats.bestAvgGoalsAgainstPlayer ||
    !stats.bestAvgGoalsPlayer
  ) {
    return [];
  }

  return [
    {
      player: stats.bestWinratePlayer,
      stat: stats.bestWinrate.toFixed(2) + '%',
      name: 'Winrate',
    },
    {
      player: stats.bestAvgGoalsPlayer,
      stat: stats.bestAvgGoals.toFixed(2),
      name: 'Best average G',
    },
    {
      player: stats.bestAvgGoalsAgainstPlayer,
      stat: stats.bestAvgGoalsAgainst.toFixed(2),
      name: 'Best average GA',
    },
    {
      player: stats.bestScorePlayer,
      stat: stats.bestScore.toString(),
      name: 'Best score',
    },
    {
      player: stats.bestWinstreakPlayer,
      stat: stats.bestWinstreak.toString(),
      name: 'Winstreak',
    },
  ];
};
