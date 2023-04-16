import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { v4 as uuid } from 'uuid';

const commonProps = {
  withCloseButton: true,
  autoClose: 5000,
  loading: false,
};

export function useToast() {
  const showErrorToast = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'red',
      icon: <IconX size="1rem" />,
      styles: theme => ({
        root: { backgroundColor: theme.colors.dark[9] },
      }),
      ...commonProps,
    });
  };

  const showSuccessToast = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'teal',
      icon: <IconCheck size="1rem" />,
      styles: theme => ({
        root: { backgroundColor: theme.colors.dark[9] },
      }),
      ...commonProps,
    });
  };

  const showLoadingToast = (title: string, message: string) => {
    const id = uuid();

    notifications.show({
      id,
      title,
      message,
      styles: theme => ({
        root: { backgroundColor: theme.colors.dark[9] },
      }),
      autoClose: false,
      withCloseButton: false,
      loading: true,
    });

    return id;
  };

  const updateLoadingToast = (
    title: string,
    message: string,
    id: string,
    success = true
  ) => {
    notifications.update({
      id,
      title,
      message,
      color: success ? 'teal' : 'red',
      styles: theme => ({
        root: { backgroundColor: theme.colors.dark[9] },
      }),
      icon: success ? <IconCheck size="1rem" /> : <IconX size="1rem" />,
      autoClose: 3000,
    });
  };

  return {
    showErrorToast,
    showSuccessToast,
    showLoadingToast,
    updateLoadingToast,
  };
}
