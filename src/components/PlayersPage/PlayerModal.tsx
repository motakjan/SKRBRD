import { Button, Flex, Modal, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import type { PlayerFormValues } from './PlayerModal.types';

type PlayerModalProps = {
  opened: boolean;
  close: () => void;
  title: string;
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
  handleSubmit,
}) => {
  const form = useForm<PlayerFormValues>({
    initialValues: editedPlayer,

    validate: {
      firstName: value => value.length < 1 && 'First name is required',
      lastName: value => value.length < 1 && 'Last name is required',
      mmr: value =>
        value < 0 || (value > 8000 && 'MMR needs to be between 0 and 8000'),
    },
  });

  return (
    <Modal opened={opened} onClose={close} title={title} radius={6} centered>
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Flex direction="column" gap={10}>
          <TextInput
            placeholder="First name"
            label="First name"
            description="Players first name"
            withAsterisk
            {...form.getInputProps('firstName')}
          />
          <TextInput
            placeholder="Last name"
            label="Last name"
            description="Players last name"
            withAsterisk
            {...form.getInputProps('lastName')}
          />
          <NumberInput
            placeholder="MMR"
            label="MMR"
            description="Players MMR (Skill coeficient)"
            withAsterisk
            {...form.getInputProps('mmr')}
          />
          <Button
            type="submit"
            variant="light"
            color="indigo.5"
            sx={{ alignSelf: 'flex-end', marginTop: 15 }}
          >
            {editedPlayer ? 'Edit player' : 'Create player'}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
