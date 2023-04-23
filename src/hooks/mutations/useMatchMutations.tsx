/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '~/utils/api';
import { useToast } from '../useToast';

export const useMatchMutations = (onSettled: () => void) => {
  const { showLoadingToast, updateLoadingToast } = useToast();

  const ctx = api.useContext();

  const commonOptions = {
    onMutate() {
      const toastId = showLoadingToast(
        'Processing request',
        'Your request is being processed. Please wait for it to complete.'
      );
      return { toastId };
    },
    onSettled: () => {
      onSettled();
    },
  };

  const createMatch = api.match.create.useMutation({
    onSuccess: (_, __, context) => {
      if (!context) return;

      updateLoadingToast(
        'Match created',
        'New match has been successfully created',
        context.toastId
      );

      void ctx.league.findLeague.invalidate();
    },
    onError: (_, __, context) => {
      if (!context) return;

      updateLoadingToast(
        'Error',
        'There has been an error doing your request. Please try again later.',
        context.toastId,
        false
      );
    },
    ...commonOptions,
  });

  return { createMatch };
};
