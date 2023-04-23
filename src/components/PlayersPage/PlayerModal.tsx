import { Button, Flex, Modal, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import type { PlayerFormValues } from '../../types/player.types';

type PlayerModalProps = {
  opened: boolean;
  close: () => void;
  title: string;
  loading: boolean;
  editedPlayer?: {
    id: string;
    firstName: string;
    lastName: string;
    mmr: number;
  };
  handleSubmit: (values: PlayerFormValues) => void;
};

export const PlayerModal: React.FC<PlayerModalProps> = ({
  opened,
  close,
  title,
  editedPlayer,
  loading,
  handleSubmit,
}) => {
  const form = useForm<PlayerFormValues>({
    initialValues: editedPlayer,

    validate: {
      firstName: value => !value && 'First name is required',
      lastName: value => !value && 'Last name is required',
      mmr: value =>
        (value < 0 || value > 8000 || !value) &&
        'MMR needs to be between 0 and 8000',
    },
  });

  return (
    <Modal opened={opened} onClose={close} title={title} radius={6} centered>
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Flex direction="column" gap={10}>
          <TextInput
            placeholder="First name"
            label="First name"
            description="Player's first name"
            withAsterisk
            {...form.getInputProps('firstName')}
          />
          <TextInput
            placeholder="Last name"
            label="Last name"
            description="Player's last name"
            withAsterisk
            {...form.getInputProps('lastName')}
          />
          <NumberInput
            placeholder="MMR"
            label="MMR"
            description="Player's MMR (Skill coefficient)"
            withAsterisk
            {...form.getInputProps('mmr')}
          />
          <Button
            type="submit"
            variant="light"
            color="yellow.5"
            disabled={loading}
            sx={{ alignSelf: 'flex-end', marginTop: 15 }}
          >
            {editedPlayer ? 'Edit player' : 'Create player'}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
