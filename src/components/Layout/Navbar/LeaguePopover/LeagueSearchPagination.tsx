import { Flex, Text } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import React from 'react';
import { LeaguePaginationButton } from './LeaguePaginationButton';

type LeagueSearchPaginationProps = {
  page: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

export const LeagueSearchPagination: React.FC<LeagueSearchPaginationProps> = ({
  page,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <Flex justify="flex-end" p={1} mt={5}>
      <LeaguePaginationButton
        disabled={page === 1 || totalPages === 0}
        onClick={handlePreviousPage}
        icon={<IconArrowLeft size="1rem" />}
      />
      <Text fz="xs" fw={700} color="indigo.5">
        {page}/{totalPages}
      </Text>
      <LeaguePaginationButton
        disabled={page === totalPages || totalPages === 0}
        onClick={handleNextPage}
        icon={<IconArrowRight size="1rem" />}
      />
    </Flex>
  );
};
