import { Divider, Flex, Paper, Text } from '@mantine/core';
import type { Match, Player } from '@prisma/client';

type MatchCardProps = {
  matchInfo: Match & {
    homePlayer: Player;
    awayPlayer: Player;
  };
};

export const MatchCard: React.FC<MatchCardProps> = ({ matchInfo }) => {
  const awayWin = matchInfo.awayScore > matchInfo.homeScore;
  return (
    <Paper
      radius="md"
      p="sm"
      sx={theme => ({
        background:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      })}
    >
      <Flex align="center" gap="md">
        <Flex direction="column" gap={5} w="100%">
          <Flex
            align="center"
            justify="space-between"
            sx={theme => ({
              color: awayWin ? theme.colors.gray[6] : undefined,
              fontWeight: awayWin ? undefined : 700,
            })}
          >
            <Flex direction="column">
              <Text size="xs">Home</Text>
              <Text size="md">{`${matchInfo.homePlayer.firstName} ${matchInfo.homePlayer.lastName}`}</Text>
            </Flex>
            <Text sx={{ fontSize: 32 }}>{matchInfo.homeScore}</Text>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            sx={theme => ({
              color: awayWin ? undefined : theme.colors.gray[6],
              fontWeight: awayWin ? 600 : undefined,
            })}
          >
            <Flex direction="column">
              <Text size="xs">Away</Text>
              <Text size="md">{`${matchInfo.awayPlayer.firstName} ${matchInfo.awayPlayer.lastName}`}</Text>
            </Flex>
            <Text sx={{ fontSize: 32 }}>{matchInfo.awayScore}</Text>
          </Flex>
        </Flex>
        <Divider color="gray.8" size="md" orientation="vertical" />
        <Flex direction="column" gap={5} align="center" w="8rem">
          <Text size="xs" fw={700}>
            Date played
          </Text>
          <Text size="xs">
            {matchInfo.createdAt.toLocaleDateString('cs-CZ')}
          </Text>
          <Text size="xs" fw={700}>
            Match type
          </Text>
          <Text size="xs">Normal {matchInfo.overtime ? 'OT' : 'FT'}</Text>
        </Flex>
      </Flex>
    </Paper>
  );
};
