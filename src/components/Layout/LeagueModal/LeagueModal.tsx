import { Button, Flex, Modal, Switch, TextInput } from '@mantine/core';
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
    initialValues: {
      name: '',
      isPrivate: false,
    },

    validate: {
      name: value => value.length < 1 && 'League name is required',
    },
  });

  return (
    <Modal opened={opened} onClose={close} title={title} radius={6} centered>
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Flex direction="column" gap={10}>
          <TextInput
            placeholder="League name"
            label="League name"
            description="Visible league name"
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Switch
            mt="md"
            label="Private league"
            description="League will be accessible only by allowed users"
            color="yellow.5"
            {...form.getInputProps('isPrivate', { type: 'checkbox' })}
          />

          <Button
            type="submit"
            variant="light"
            color="yellow.5"
            sx={{ alignSelf: 'flex-end', marginTop: 15 }}
          >
            Create league
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
