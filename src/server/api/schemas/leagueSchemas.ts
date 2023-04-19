import { z } from 'zod';

export const findLeagueSchema = z.object({
  leagueId: z.string(),
});

export const createLeagueSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string(),
});

export const getLeaguesByQuerySchema = z.object({
  query: z.string(),
  take: z.number(),
  skip: z.number(),
});
