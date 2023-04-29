import { Button, Flex, Grid, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { MatchCard } from '~/components/LeaguePage/MatchCard';
import { MatchModal } from '~/components/LeaguePage/MatchModal';
import { StandingsTable } from '~/components/LeaguePage/StandingsTable';
import { StatCard } from '~/components/LeaguePage/StatCard';
import { useMatchMutations } from '~/hooks/mutations/useMatchMutations';
import type { MatchFormValues } from '~/types/match.types';
import { api } from '~/utils/api';
import { generateSSGHelper } from '~/utils/ssgHelper';

type PlayersPageProps = {
  leagueId: string;
};

const LeaguePage: NextPage<PlayersPageProps> = ({ leagueId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { createMatch } = useMatchMutations(close);
  const { data: { league, stats } = {} } = api.league.findLeague.useQuery({
    leagueId,
  });

  if (!league || !stats) return <div>Error while fetching data...</div>;

  const handleCreateSubmit = (matchValues: MatchFormValues) => {
    createMatch.mutate({ leagueId, ...matchValues });
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex gap={10} align="center">
          <Title
            order={1}
            sx={theme => ({
              color: theme.colorScheme === 'dark' ? 'white' : 'black',
            })}
          >
            League {league.name}
          </Title>
        </Flex>
        <Text fz="sm">
          Main information page with all the information about the league
        </Text>

        <Grid pt="2rem" gutter="xl">
          <Grid.Col md={12} xl={6}>
            <Flex direction="column" gap="0.8rem">
              <Title
                order={4}
                sx={theme => ({
                  color: theme.colorScheme === 'dark' ? 'white' : 'black',
                })}
              >
                Standings
              </Title>
              <StandingsTable players={league.players} />
              <Button
                color="violet.5 "
                variant="subtle"
                sx={{ alignSelf: 'flex-end', marginTop: 15, fontWeight: 700 }}
                leftIcon={<IconPlus size="1rem" />}
                onClick={open}
              >
                Add match
              </Button>
            </Flex>
          </Grid.Col>

          <Grid.Col md={6} xl={3}>
            <Title
              order={4}
              pb="0.6rem"
              sx={theme => ({
                color: theme.colorScheme === 'dark' ? 'white' : 'black',
              })}
            >
              Statistics
            </Title>
            <Flex gap={16} wrap="wrap">
              {stats.length > 0
                ? stats.map(stat => (
                    <StatCard key={`stat_card_${stat.name}`} stat={stat} />
                  ))
                : 'No stats yet. At least one player needs to have one or more matches played.'}
            </Flex>
          </Grid.Col>
          <Grid.Col md={6} xl={3}>
            <Flex direction="column" gap="sm">
              <Title
                order={4}
                sx={theme => ({
                  color: theme.colorScheme === 'dark' ? 'white' : 'black',
                })}
              >
                Match history
              </Title>
              {league?.matches.slice(0, 5).map(match => (
                <MatchCard key={`match_card_${match.id}`} matchInfo={match} />
              ))}

              <Link
                href={`/history/${leagueId}`}
                style={{ textDecoration: 'none' }}
              >
                <Text c="indigo.5" fw={500} fz="sm" td="underline">
                  For more matches click this link
                </Text>
              </Link>
            </Flex>
          </Grid.Col>
        </Grid>
        {opened && (
          <MatchModal
            opened={opened}
            loading={createMatch.isLoading}
            close={close}
            players={league.players}
            handleSubmit={handleCreateSubmit}
            title={'Add new match'}
          />
        )}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const ssg = generateSSGHelper();

  const leagueId = context.params?.leagueId;

  if (typeof leagueId !== 'string') throw new Error('No leagueId');

  await ssg.league.findLeague.prefetch({ leagueId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      leagueId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export default LeaguePage;
