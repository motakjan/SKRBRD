import { api } from '~/utils/api';
import { useToast } from '../useToast';

export const useLeagueMutations = (onSettled: () => void) => {
  const { showLoadingToast, updateLoadingToast } = useToast();

  const createLeague = api.league.create.useMutation({
    onMutate() {
      const toastId = showLoadingToast(
        'Creating new league...',
        'Your new league is being created at this moment.'
      );
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (!context) return;

      updateLoadingToast(
        'League created',
        'Your league has been successfully created',
        context.toastId
      );
    },
    onError: (_, __, context) => {
      if (!context) return;

      updateLoadingToast(
        'Error',
        'There has been an error creating your league. Please try again later.',
        context.toastId,
        false
      );
    },
    onSettled: () => {
      onSettled();
    },
  });

  return { createLeague };
};
