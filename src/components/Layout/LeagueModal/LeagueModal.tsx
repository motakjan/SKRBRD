import { Button, Checkbox, Flex, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { type LeagueFormValues } from './LeagueModal.types';

type PlayerModalProps = {
  opened: boolean;
  close: () => void;
  title: string;
  handleSubmit: (values: LeagueFormValues) => void;
};

export const LeagueModal: React.FC<PlayerModalProps> = ({
  opened,
  close,
  title,
  handleSubmit,
}) => {
  const form = useForm<LeagueFormValues>({
    validate: {
      leagueName: value => value.length < 1 && 'League name is required',
    },
  });

  return (
    <Modal opened={opened} onClose={close} title={title} centered>
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Flex direction="column" gap={10}>
          <TextInput
            placeholder="League name"
            label="League name"
            description="Visible league name"
            withAsterisk
            {...form.getInputProps('leagueName')}
          />
          <Checkbox
            mt="md"
            label="Private league"
            {...form.getInputProps('isPrivate', { type: 'checkbox' })}
          />

          <Button
            type="submit"
            variant="light"
            color="indigo.5"
            sx={{ alignSelf: 'flex-end', marginTop: 15 }}
          >
            Create league
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
