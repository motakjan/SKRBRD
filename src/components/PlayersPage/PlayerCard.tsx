import { ActionIcon, Badge, Card, Flex, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { type PlayerWithMatches } from '~/types/score.types';

type PlayerCardProps = {
  player: PlayerWithMatches;
  loading: boolean;
  onDeleteClick: (name: string, id: string) => void;
  onEditClick: (id: string) => void;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  loading,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <Card
      radius="md"
      shadow="xs"
      padding="sm"
      sx={theme => ({
        width: '100%',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        borderLeft: '5px solid',
        borderColor:
          theme.colorScheme === 'dark'
            ? theme.colors.violet[7]
            : theme.colors.violet[3],
      })}
    >
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text fz="sm">{player.firstName}</Text>
          <Flex gap={10} align="center">
            <Text
              fz="md"
              fw={700}
              tt="uppercase"
              sx={theme => ({
                color: theme.colorScheme === 'dark' ? 'white' : 'black',
              })}
            >
              {player.lastName}
            </Text>
            <Badge c="violet.6">{player.mmr}</Badge>
          </Flex>
        </Flex>
        <Flex direction="column">
          <ActionIcon
            variant={loading ? 'transparent' : 'subtle'}
            disabled={loading}
            onClick={() => onEditClick(player.id)}
          >
            <IconPencil size="1rem" />
          </ActionIcon>
          <ActionIcon
            variant={loading ? 'transparent' : 'subtle'}
            color="red.8"
            disabled={loading}
            onClick={() =>
              onDeleteClick(`${player.firstName} ${player.lastName}`, player.id)
            }
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
};
