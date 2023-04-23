import { ActionIcon, Card, Flex, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

type PlayerCardProps = {
  firstName: string;
  lastName: string;
  id: string;
  loading: boolean;
  onDeleteClick: (name: string, id: string) => void;
  onEditClick: (id: string) => void;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  firstName,
  lastName,
  id,
  loading,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <Card
      radius="md"
      padding="sm"
      sx={theme => ({
        width: '100%',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      })}
    >
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text fz="sm">{firstName}</Text>
          <Text fz="md" fw={700} tt="uppercase">
            {lastName}
          </Text>
        </Flex>
        <Flex direction="column">
          <ActionIcon
            variant={loading ? 'transparent' : 'subtle'}
            disabled={loading}
            onClick={() => onEditClick(id)}
          >
            <IconPencil size="1rem" />
          </ActionIcon>
          <ActionIcon
            variant={loading ? 'transparent' : 'subtle'}
            color="red.8"
            disabled={loading}
            onClick={() => onDeleteClick(`${firstName} ${lastName}`, id)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
};
