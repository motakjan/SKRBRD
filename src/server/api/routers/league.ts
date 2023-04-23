import { TRPCError } from '@trpc/server';
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { getLeagueStats, type LeagueStats } from '~/utils/leaguePlayerStats';
import {
  createLeagueSchema,
  findLeagueSchema,
  getLeaguesByQuerySchema,
} from '../schemas/leagueSchemas';

export const leagueRouter = createTRPCRouter({
  findLeague: publicProcedure
    .input(findLeagueSchema)
    .query(async ({ ctx, input: { leagueId } }) => {
      const league = await ctx.prisma.league.findUnique({
        where: { id: leagueId },
        include: {
          players: {
            orderBy: { mmr: 'desc' },
            where: { deleted: false },
            include: {
              matchesAsHomePlayer: true,
              matchesAsAwayPlayer: true,
            },
          },
          matches: {
            orderBy: { createdAt: 'desc' },
            include: {
              homePlayer: true,
              awayPlayer: true,
            },
            where: {
              OR: [
                { homePlayer: { deleted: false } },
                { awayPlayer: { deleted: false } },
              ],
            },
          },
        },
      });

      if (!league) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'League not found',
        });
      }

      const stats: LeagueStats[] = getLeagueStats(league);

      return { league, stats };
    }),
  create: privateProcedure
    .input(createLeagueSchema)
    .mutation(({ ctx, input: { isPrivate, name } }) => {
      const { userId } = ctx;

      const league = ctx.prisma.league.create({
        data: {
          ownerClerkId: userId,
          isPrivate,
          name,
          allowedUsers: userId,
        },
      });

      return league;
    }),
  getLeaguesByQuery: publicProcedure
    .input(getLeaguesByQuerySchema)
    .query(async ({ ctx, input: { query, take, skip } }) => {
      const result = await ctx.prisma.$transaction([
        ctx.prisma.league.findMany({
          where: {
            name: { contains: query },
          },
          orderBy: [
            {
              isPrivate: 'asc',
            },
          ],
          take,
          skip,
        }),
        ctx.prisma.league.count({
          where: {
            name: { contains: query },
          },
        }),
      ]);

      const [leagues, count] = result;

      return { leagues, count };
    }),
});
