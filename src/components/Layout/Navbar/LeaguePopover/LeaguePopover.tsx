import { ActionIcon, Popover, Text, TextInput } from '@mantine/core';
import { IconSelect } from '@tabler/icons-react';
import React from 'react';

export const LeaguePopover = () => {
  return (
    <Popover width={300} trapFocus position="right" shadow="md" offset={20}>
      <Popover.Target>
        <ActionIcon
          color="indigo.4"
          variant="light"
          sx={theme => ({
            width: 30,
            marginBottom: 15,
            height: 30,
            borderRadius: theme.radius.md,
          })}
        >
          <IconSelect size="1.2rem" stroke={1.5} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown
        sx={theme => ({
          background:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        })}
      >
        <TextInput
          label="Search"
          placeholder="League name"
          size="xs"
          description="Search for a league"
        />
        <Text fz="xs" fw={700}>
          Results
        </Text>
        <Text fz="xs">No results found</Text>
        <Text fz="xs" fw={700}>
          Watchlist
        </Text>
        <Text fz="xs">No item in watchlist</Text>
      </Popover.Dropdown>
    </Popover>
  );
};
