import { Modal, TextInput, NumberInput, Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

type PlayerModalProps = {
  opened: boolean;
  close: () => void;
  title: string;
};

type PlayerFormValues = {
  firstName: string;
  lastName: string;
  mmr: number;
};

export const PlayerModal: React.FC<PlayerModalProps> = ({
  opened,
  close,
  title,
}) => {
  const form = useForm<PlayerFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      mmr: 1000,
    },

    validate: {
      firstName: (value) => value.length < 1 && "First name is required",
      lastName: (value) => value.length < 1 && "Last name is required",
      mmr: (value) =>
        value < 0 || (value > 8000 && "MMR needs to be between 0 and 8000"),
    },
  });

  return (
    <Modal opened={opened} onClose={close} title={title} centered>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Flex direction="column" gap={10}>
          <TextInput
            placeholder="First name"
            label="First name"
            description="Players first name"
            withAsterisk
            {...form.getInputProps("firstName")}
          />
          <TextInput
            placeholder="Last name"
            label="Last name"
            description="Players last name"
            withAsterisk
            {...form.getInputProps("lastName")}
          />
          <NumberInput
            defaultValue={1000}
            placeholder="MMR"
            label="MMR"
            description="Players MMR (Skill coeficient)"
            withAsterisk
            {...form.getInputProps("mmr")}
          />
          <Button
            type="submit"
            variant="light"
            color="orange.5"
            sx={{ alignSelf: "flex-end", marginTop: 15 }}
          >
            Create
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
