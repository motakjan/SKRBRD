export const calculateNewMMR = (
  homeMMR: number,
  awayMMR: number,
  homeScore: number,
  awayScore: number
) => {
  const homeElo = calculateElo(homeMMR, awayMMR);
  const awayElo = calculateElo(awayMMR, homeMMR);

  const result = homeScore > awayScore ? 1 : homeScore === awayScore ? 0.5 : 0;

  const homeDelta = 32 * (result - homeElo);
  const homeNewRating = homeMMR + clamp(homeDelta, -100, 100);

  const awayDelta = 32 * (1 - result - awayElo);
  const awayNewRating = awayMMR + clamp(awayDelta, -100, 100);

  return [homeNewRating, awayNewRating];
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const calculateElo = (playerRating: number, opponentRating: number) => {
  const difference = opponentRating - playerRating;
  const exponent = difference / 400;
  const base = 10;
  const powerOf10 = Math.pow(base, exponent);
  const denominator = 1 + powerOf10;
  const elo = 1 / denominator;
  return elo;
};

export const calculateStreak = (
  homeStreak: number,
  awayStreak: number,
  homeScore: number,
  awayScore: number
) => {
  let newHomeStreak = 0;
  let newAwayStreak = 0;

  if (homeScore > awayScore) {
    newHomeStreak = homeStreak >= 0 ? homeStreak + 1 : 0;
    newAwayStreak = awayStreak > 0 ? 0 : awayStreak - 1;
  } else if (homeScore < awayScore) {
    newHomeStreak = homeStreak > 0 ? 0 : homeStreak - 1;
    newAwayStreak = awayStreak >= 0 ? awayStreak + 1 : 0;
  } else {
    newHomeStreak = 0;
    newAwayStreak = 0;
  }

  return [newHomeStreak, newAwayStreak];
};
