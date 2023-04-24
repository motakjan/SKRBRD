import { Box, Center, Flex, Loader, Text } from '@mantine/core';
import { type League } from '@prisma/client';
import React, { useMemo } from 'react';
import { LeagueSearchItem } from './LeagueSearchItem';
import { LeagueSearchPagination } from './LeagueSearchPagination';

type LeagueSearchResultsProps = {
  leaguesFound: League[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

export const LeagueSearchResults: React.FC<LeagueSearchResultsProps> = ({
  leaguesFound = [],
  isLoading,
  page,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  const leagueItems = useMemo(
    () =>
      leaguesFound.map(league => (
        <LeagueSearchItem key={`league_${league.id}`} league={league} />
      )),
    [leaguesFound]
  );

  return (
    <Flex direction="column">
      {isLoading ? (
        <Center h={100}>
          <Loader size="sm" color="violet.6" />
        </Center>
      ) : (
        <Flex direction="column">
          {leagueItems.length > 0 ? (
            <>
              <Box sx={{ height: '7rem' }}>{leagueItems}</Box>

              <LeagueSearchPagination
                page={page}
                totalPages={totalPages}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
              />
            </>
          ) : (
            <Text fz="xs">No results found for this query</Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};
