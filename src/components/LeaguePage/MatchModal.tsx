import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Select,
  Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import type { Player } from '@prisma/client';
import React, { useState } from 'react';
import type { MatchFormValues } from '~/types/match.types';

type MatchModalProps = {
  opened: boolean;
  close: () => void;
  title: string;
  players: Player[];
  loading: boolean;
  handleSubmit: (values: MatchFormValues) => void;
};

export const MatchModal: React.FC<MatchModalProps> = ({
  opened,
  close,
  title,
  players,
  loading,
  handleSubmit,
}) => {
  const [homeSearchValue, onHomeSearchChange] = useState<string>('');
  const [awaySearchValue, onAwaySearchChange] = useState<string>('');
  const form = useForm<MatchFormValues>({
    initialValues: {
      homePlayerId: '',
      awayPlayerId: '',
      awayScore: 0,
      homeScore: 0,
      overtime: false,
    },

    validate: {
      homePlayerId: value => !value && 'Home player is required',
      awayPlayerId: value => !value && 'Away player is required',
      homeScore: value =>
        +value < 0 && 'Home score needs to be a positive number or zero',
      awayScore: value =>
        +value < 0 && 'Away score needs to be a positive number or zero',
    },
  });

  const { homePlayerId, awayPlayerId } = form.values;

  const playersSelectData = players.map(player => ({
    value: player.id,
    label: `${player.firstName} ${player.lastName}`,
    disabled:
      player.id === homePlayerId || player.id === awayPlayerId ? true : false,
  }));

  return (
    <Modal opened={opened} onClose={close} title={title} radius={6} centered>
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Flex direction="column" gap={10}>
          <Select
            label="Home player"
            placeholder="Pick one"
            description="Player which will be representing the home team"
            onSearchChange={onHomeSearchChange}
            searchValue={homeSearchValue}
            nothingFound="No options"
            data={playersSelectData}
            {...form.getInputProps('homePlayerId')}
            searchable
            clearable
            withAsterisk
          />
          <Select
            label="Away player"
            placeholder="Pick one"
            description="Player which will be representing the away team"
            onSearchChange={onAwaySearchChange}
            searchValue={awaySearchValue}
            nothingFound="No options"
            data={playersSelectData}
            {...form.getInputProps('awayPlayerId')}
            searchable
            clearable
            withAsterisk
          />
          <NumberInput
            placeholder="Home score"
            label="Home score"
            description="Home player's goals scored"
            withAsterisk
            min={0}
            {...form.getInputProps('homeScore')}
          />
          <NumberInput
            placeholder="Away score"
            label="Away score"
            description="Away player's goals scored"
            withAsterisk
            min={0}
            {...form.getInputProps('awayScore')}
          />
          <Switch
            mt="md"
            label="Overtime"
            color="violet.5"
            description="Whether or not the match was decided in overtime"
            {...form.getInputProps('overtime', { type: 'checkbox' })}
          />

          <Button
            type="submit"
            variant="light"
            color="violet.5"
            disabled={loading}
            sx={{ alignSelf: 'flex-end', marginTop: 15 }}
          >
            Add match
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
