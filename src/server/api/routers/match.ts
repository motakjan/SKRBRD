import { TRPCError } from '@trpc/server';

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc';
import { calculateNewMMR, calculateStreak } from '~/utils/elo';
import { createMatchSchema } from '../schemas/matchSchemas';

export const matchRouter = createTRPCRouter({
  create: privateProcedure
    .input(createMatchSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        leagueId,
        homePlayerId,
        awayPlayerId,
        homeScore,
        awayScore,
        overtime,
      } = input;

      const league = await ctx.prisma.league.findUnique({
        where: { id: leagueId },
      });

      if (!league) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'League not found',
        });
      }

      const homePlayer = await ctx.prisma.player.findUnique({
        where: { id: homePlayerId },
      });

      const awayPlayer = await ctx.prisma.player.findUnique({
        where: { id: awayPlayerId },
      });

      if (!homePlayer || !awayPlayer || homePlayer.id === awayPlayer.id) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'One of the players not found',
        });
      }

      const [homeNewRating, awayNewRating] = calculateNewMMR(
        homePlayer.mmr,
        awayPlayer.mmr,
        homeScore,
        awayScore
      );

      const [homeStreak, awayStreak] = calculateStreak(
        homePlayer.streak,
        awayPlayer.streak,
        homeScore,
        awayScore
      );

      console.log({
        homeOldRating: homePlayer.mmr,
        homeNewRating,
        awayNewRating,
        awayOldRating: awayPlayer.mmr,
      });

      if (!homeNewRating || !awayNewRating) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'One of the players score is not defined',
        });
      }

      const result = await ctx.prisma.$transaction([
        ctx.prisma.match.create({
          data: {
            leagueId,
            homePlayerId,
            awayPlayerId,
            homeScore,
            awayScore,
            overtime,
          },
        }),
        ctx.prisma.player.update({
          where: { id: homePlayerId },
          data: {
            mmr: Math.round(homeNewRating),
            streak: homeStreak,
          },
        }),
        ctx.prisma.player.update({
          where: { id: awayPlayerId },
          data: {
            mmr: Math.round(awayNewRating),
            streak: awayStreak,
          },
        }),
      ]);

      return result[0];
    }),
});
