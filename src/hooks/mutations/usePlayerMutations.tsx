/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '~/utils/api';
import { useToast } from '../useToast';

export const usePlayerMutations = (onSettled: () => void) => {
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

  const createPlayer = api.player.create.useMutation({
    onSuccess: (_, __, context) => {
      if (!context) return;

      updateLoadingToast(
        'Player created',
        'New player has been successfully created',
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

  const updatePlayer = api.player.update.useMutation({
    onSuccess: (_, __, context) => {
      if (!context) return;

      updateLoadingToast(
        'Player updated',
        'Player has been successfully updated',
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

  const deletePlayer = api.player.delete.useMutation({
    onSuccess: (_, __, context) => {
      if (!context) return;

      updateLoadingToast(
        'Player deleted',
        'Player has been successfully deleted',
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

  return { createPlayer, updatePlayer, deletePlayer };
};
