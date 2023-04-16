import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import {
  createLeagueSchema,
  getLeaguesByQuerySchema,
} from '../schemas/leagueSchemas';

export const leagueRouter = createTRPCRouter({
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
