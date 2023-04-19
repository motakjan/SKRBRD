import { z } from 'zod';

export const createPlayerSchema = z.object({
  leagueId: z.string(),
  mmr: z.number().min(0).max(8000),
  firstName: z.string(),
  lastName: z.string(),
});

export const updatePlayerSchema = z.object({
  id: z.string(),
  mmr: z.number().min(0).max(8000),
  firstName: z.string(),
  lastName: z.string(),
});

export const deletePlayerSchema = z.object({ id: z.string() });
