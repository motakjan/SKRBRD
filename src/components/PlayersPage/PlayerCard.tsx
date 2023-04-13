import { ActionIcon, Card, Flex, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

type PlayerCardProps = {
  firstName: string;
  lastName: string;
  onDeleteClick: (name: string) => void;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  firstName,
  lastName,
  onDeleteClick,
}) => {
  return (
    <Card
      radius="md"
      padding="sm"
      sx={theme => ({
        width: '100%',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[1],
      })}
    >
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text fz="sm">{firstName}</Text>
          <Text fz="md" fw={700} tt="uppercase">
            {lastName}
          </Text>
        </Flex>
        <Flex>
          <ActionIcon variant="subtle">
            <IconPencil size="1rem" />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red.8"
            onClick={() => onDeleteClick(`${firstName} ${lastName}`)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
};
