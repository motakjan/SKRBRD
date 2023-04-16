import { ActionIcon, Popover, Text, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSelect } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { api } from '~/utils/api';
import { LeagueSearchResults } from './LeagueSearchResults';

export const LeaguePopover = () => {
  const [value, setValue] = useDebouncedState('', 500);
  const [page, setPage] = useState<number>(1);
  const take = 5;

  const {
    data: leaguesFound,
    refetch,
    isLoading,
  } = api.league.getLeaguesByQuery.useQuery(
    {
      query: value,
      take,
      skip: take * (page - 1),
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (!value) return;
    void refetch();
  }, [value, refetch, page]);

  useEffect(() => {
    setPage(1);
  }, [value]);

  const handlePreviousPage = () => {
    setPage((prevPage: number) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage: number) => prevPage + 1);
  };

  const totalPagesFound = leaguesFound && Math.ceil(leaguesFound?.count / take);

  return (
    <Popover width={250} trapFocus position="right" shadow="md" offset={20}>
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
          gap: '8px',
        })}
      >
        <TextInput
          label="Search"
          placeholder="League name"
          defaultValue={value}
          onChange={event => setValue(event.currentTarget.value)}
          size="xs"
          description="Search for a league"
        />
        <Text fz="xs" fw={700}>
          Results
        </Text>
        <LeagueSearchResults
          leaguesFound={leaguesFound?.leagues || []}
          isLoading={isLoading}
          page={page}
          totalPages={totalPagesFound || 0}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
        <Text fz="xs" fw={700}>
          Favorite
        </Text>
        <Text fz="xs">No item in favorites</Text>
      </Popover.Dropdown>
    </Popover>
  );
};
